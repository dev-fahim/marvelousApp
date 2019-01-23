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


class ExpenditureRecordModelSafeSerializer(serializers.ModelSerializer):
    edit_url = serializers.HyperlinkedIdentityField(
        view_name='expenditure_app:record_view_update_delete',
        lookup_field='uuid'
    )

    details_url = serializers.HyperlinkedIdentityField(
        view_name='expenditure_app:record_view',
        lookup_field='uuid'
    )

    expend_heading_name = serializers.SerializerMethodField()
    added_by = serializers.SerializerMethodField()

    class Meta:
        model = ExpenditureRecordModel
        exclude = ('base_user', )
        read_only_fields = ('uuid', 'added_by', 'added', 'updated', 'is_verified')

    def request_data(self):
        return self.context['request']

    def logged_in_user(self):
        return self.request_data().user
    '''
    def validate_amount(self, value):
        base_user = BaseUserModel.objects.filter(base_user=self.logged_in_user()) 
        sub_user = SubUserModel.objects.filter(root_user=self.logged_in_user())
        expend_obj = []
        credit_fund_obj = []

        if base_user.exists() is True:
            expend_obj = self.logged_in_user().base_user.all_expenditure_records.all()
            credit_fund_obj = self.logged_in_user().base_user.credit_funds.all()
        elif sub_user.exists() is True:
            expend_obj = self.logged_in_user().root_sub_user.base_user.all_expenditure_records.all()
            credit_fund_obj = self.logged_in_user().root_sub_user.base_user.credit_funds.all()

        all_credit_fund_amounts = [obj.amount for obj in credit_fund_obj]
        all_record_amounts = [obj.amount for obj in expend_obj]

        total_pre_credit_fund_amount = utils.sum_int_of_array(all_credit_fund_amounts)
        total_pre_record_amount = utils.sum_int_of_array(all_record_amounts)

        record_value_after_entry = total_pre_record_amount + value
        credit_fund_value_after_entry = total_pre_credit_fund_amount - record_value_after_entry

        if credit_fund_value_after_entry >= 0:
            return value
        raise serializers.ValidationError(detail='Credit Fund will be exceede! So you cannot add any more records. After authority add more Credit Fund in Database you can entry more records.')
    '''
    def create(self, validated_data):
        value = validated_data.get('amount')
        base_user = BaseUserModel.objects.filter(base_user=self.logged_in_user()) 
        sub_user = SubUserModel.objects.filter(root_user=self.logged_in_user())
        expend_obj = []
        credit_fund_obj = []

        if base_user.exists() is True:
            expend_obj = self.logged_in_user().base_user.all_expenditure_records.all()
            credit_fund_obj = self.logged_in_user().base_user.credit_funds.all()
        elif sub_user.exists() is True:
            expend_obj = self.logged_in_user().root_sub_user.base_user.all_expenditure_records.all()
            credit_fund_obj = self.logged_in_user().root_sub_user.base_user.credit_funds.all()

        all_credit_fund_amounts = [obj.amount for obj in credit_fund_obj]
        all_record_amounts = [obj.amount for obj in expend_obj]

        total_pre_credit_fund_amount = utils.sum_int_of_array(all_credit_fund_amounts)
        total_pre_record_amount = utils.sum_int_of_array(all_record_amounts)

        record_value_after_entry = total_pre_record_amount + value
        credit_fund_value_after_entry = total_pre_credit_fund_amount - record_value_after_entry
        print(credit_fund_value_after_entry)

        if credit_fund_value_after_entry >= 0:
            if base_user.exists():
                obj = ExpenditureRecordModel.objects.create(
                    added_by=self.logged_in_user(),
                    base_user=self.logged_in_user().base_user,
                    uuid=uuid.uuid4(),
                    **validated_data
                )

                return obj
            elif sub_user.exists():
                obj = ExpenditureRecordModel.objects.create(
                    added_by=self.logged_in_user(),
                    base_user=self.logged_in_user().root_sub_user.base_user,
                    uuid=uuid.uuid4(),
                    **validated_data
                )

                return obj
            return None
        raise serializers.ValidationError(detail='Credit Fund will be exceede! So you cannot add any more records. After authority add more Credit Fund in Database you can entry more records.')

    
    def update(self, instance, validated_data):
        raw_amount = instance.amount
        new_amount = validated_data.get('amount', instance.amount)
        base_user = BaseUserModel.objects.filter(base_user=self.logged_in_user()) 
        sub_user = SubUserModel.objects.filter(root_user=self.logged_in_user())
        expend_obj = []
        credit_fund_obj = []

        if base_user.exists() is True:
            expend_obj = self.logged_in_user().base_user.all_expenditure_records.all()
            credit_fund_obj = self.logged_in_user().base_user.credit_funds.all()
        elif sub_user.exists() is True:
            expend_obj = self.logged_in_user().root_sub_user.base_user.all_expenditure_records.all()
            credit_fund_obj = self.logged_in_user().root_sub_user.base_user.credit_funds.all()

        all_credit_fund_amounts = [obj.amount for obj in credit_fund_obj]
        all_record_amounts = [obj.amount for obj in expend_obj]

        total_pre_credit_fund_amount = utils.sum_int_of_array(all_credit_fund_amounts)
        total_pre_record_amount = utils.sum_int_of_array(all_record_amounts)

        record_value_after_entry = total_pre_record_amount + new_amount - raw_amount
        credit_fund_value_after_entry = total_pre_credit_fund_amount - record_value_after_entry
        print(credit_fund_value_after_entry)

        if credit_fund_value_after_entry >= 0:
            instance.expend_heading = validated_data.get('expend_heading', instance.expend_heading)
            instance.expend_by = validated_data.get('expend_by', instance.expend_by)
            instance.description = validated_data.get('description', instance.description)
            instance.amount = validated_data.get('amount', instance.amount)
            instance.expend_date = validated_data.get('expend_date', instance.expend_date)

            instance.save()

            return instance
        raise serializers.ValidationError(detail='Credit Fund will be exceede! So you cannot add any more records. After authority add more Credit Fund in Database you can entry more records.')

    
    @staticmethod
    def get_expend_heading_name(obj):
        return obj.expend_heading.__str__()
    
    @staticmethod
    def get_added_by(obj):
        return obj.added_by.__str__()


class ExpenditureRecordModelSerializer(ExpenditureRecordModelSafeSerializer):
    class Meta:
        model = ExpenditureRecordModel
        exclude = ('base_user', )
        read_only_fields = ('uuid', 'added_by', 'added', 'updated')
