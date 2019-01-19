from rest_framework import serializers
from expenditure.models import ExpenditureHeadingModel, ExpenditureRecordModel
from credit.models import CreditFundModel
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from utils import utils
import uuid


class ExpenditureHeadingModelSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='expenditure_app:heading_view_update_delete',
        lookup_field='uuid'
    )

    class Meta:
        model = ExpenditureHeadingModel
        exclude = ('base_user', )
        read_only_fields = ('uuid', 'added', 'updated')

    def request_data(self):
        return self.context['request']

    def logged_in_user(self):
        return self.request_data().user

    def create(self, validated_data):
        obj = ExpenditureHeadingModel.objects.create(
            base_user=self.logged_in_user().base_user,
            uuid=uuid.uuid4(),
            **validated_data
        )

        return obj


class ExpenditureRecordModelSerializer(serializers.ModelSerializer):
    edit_url = serializers.HyperlinkedIdentityField(
        view_name='expenditure_app:record_view_update_delete',
        lookup_field='uuid'
    )

    details_url = serializers.HyperlinkedIdentityField(
        view_name='expenditure_app:record_view',
        lookup_field='uuid'
    )

    class Meta:
        model = ExpenditureRecordModel
        exclude = ('base_user', )
        read_only_fields = ('uuid', 'added_by', 'added', 'updated')

    def request_data(self):
        return self.context['request']

    def logged_in_user(self):
        return self.request_data().user
    
    def validate_amount(self, value):
        base_user = BaseUserModel.objects.filter(base_user=self.logged_in_user()) 
        sub_user = SubUserModel.objects.filter(root_user=self.logged_in_user())
        expend_obj = []

        if base_user.exists() is True:
            expend_obj = ExpenditureRecordModel.objects.filter(base_user=self.logged_in_user().base_user)
            credit_fund_obj = CreditFundModel.objects.filter(base_user=self.logged_in_user().base_user)
        elif sub_user.exists() is True:
            base_user = sub_user.base_user
            expend_obj = ExpenditureRecordModel.objects.filter(base_user=base_user)
            credit_fund_obj = CreditFundModel.objects.filter(base_user=base_user)
        
        all_credit_fund_amounts = [obj.amount for obj in credit_fund_obj]
        all_record_amounts = [obj.amount for obj in expend_obj]

        total_pre_credit_fund_amount = utils.sum_int_of_array(all_credit_fund_amounts)
        total_pre_record_amount = utils.sum_int_of_array(all_record_amounts)

        record_value_after_entry = total_pre_record_amount + value
        credit_fund_value_after_entry = total_pre_credit_fund_amount - record_value_after_entry

        if credit_fund_value_after_entry >= 0:
            return value
        raise serializers.ValidationError(detail='Credit Fund will be exceede! So you cannot add any more records. After authority add more Credit Fund in Database you can entry more records.')

    def create(self, validated_data):
        if BaseUserModel.objects.filter(base_user=self.logged_in_user()).exists():
            obj = ExpenditureRecordModel.objects.create(
                added_by=self.logged_in_user(),
                base_user=self.logged_in_user().base_user,
                uuid=uuid.uuid4(),
                **validated_data
            )

            return obj
        elif SubUserModel.objects.filter(root_user=self.logged_in_user()).exists():
            obj = ExpenditureRecordModel.objects.create(
                added_by=self.logged_in_user(),
                base_user=self.logged_in_user().root_sub_user.base_user,
                uuid=uuid.uuid4(),
                **validated_data
            )

            return obj
        return None

