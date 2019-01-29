from rest_framework import serializers
from rest_framework.response import Response
from credit.models import CreditFundModel, CreditFundSourceModel, CreditFundSettingsModel
import uuid
from utils import utils


class CreditFundModelSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='credit_app:fund_view_update_delete',
        lookup_field='uuid'
    )
    source_name = serializers.SerializerMethodField()

    class Meta:
        model = CreditFundModel
        fields = (
            'source',
            'source_name',
            'url',
            'description',
            'added',
            'updated',
            'amount',
            'fund_added',
            'uuid'
        )
        read_only_fields = ('uuid', 'added', 'updated', 'source_name')

    def request_data(self):
        return self.context['request']

    def logged_in_user(self):
        return self.request_data().user
    
    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError(detail="Amount cannot be ZERO or LOWER than ZERO")
        return value

    def create(self, validated_data):
        obj = CreditFundModel.objects.create(
            base_user=self.logged_in_user().base_user,
            uuid=uuid.uuid4(),
            **validated_data
        )

        return obj
    
    def update(self, instance, validated_data):
        raw_value = instance.amount
        new_value = validated_data.get('amount', raw_value)
        print(new_value)
        print(raw_value)
        print(type(new_value))

        expenditure_model = self.logged_in_user().base_user.all_expenditure_records.filter(is_verified=True)
        expenditure_all_amounts = [obj.amount for obj in expenditure_model]
        expenditure_total_amount = utils.sum_int_of_array(expenditure_all_amounts)

        credit_fund_model = self.logged_in_user().base_user.credit_funds.all()
        credit_fund_all_amounts = [obj.amount for obj in credit_fund_model]
        credit_fund_total_amount = utils.sum_int_of_array(credit_fund_all_amounts)

        credit_fund_remaining_amount = (credit_fund_total_amount - raw_value + new_value) - expenditure_total_amount

        if credit_fund_remaining_amount >= 0:

            instance.source = validated_data.get('source', instance.source)
            instance.description = validated_data.get('description', instance.description)
            instance.amount = validated_data.get('amount', instance.amount)
            instance.fund_added = validated_data.get('fund_added', instance.fund_added)

            instance.save()
            
            return instance

        raise serializers.ValidationError(detail="Total credit will be lower than total debit!")
    
    @staticmethod
    def get_source_name(obj):
        return obj.__str__()


class CreditFundSourceModelSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='credit_app:fund_source_view_update_delete',
        lookup_field='uuid'
    )

    class Meta:
        model = CreditFundSourceModel
        fields = (
            'id',
            'source_name',
            'url',
            'description',
            'added',
            'updated',
            'uuid'
        )
        read_only_fields = ('uuid', 'added', 'updated', 'id')

    def request_data(self):
        return self.context['request']

    def logged_in_user(self):
        return self.request_data().user

    def create(self, validated_data):
        obj = CreditFundSourceModel.objects.create(
            base_user=self.logged_in_user().base_user,
            uuid=uuid.uuid4(),
            **validated_data
        )

        return obj


class CreditFundsAccordingToSourcesSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='credit_app:fund_source_view_update_delete',
        lookup_field='uuid'
    )
    funds = CreditFundModelSerializer(many=True, read_only=True)

    class Meta:
        model = CreditFundSourceModel
        fields = (
            'id',
            'source_name',
            'url',
            'description',
            'added',
            'updated',
            'uuid',
            'funds'
        )
        read_only_fields = ('uuid', 'added', 'updated', 'id')


class CreditFundSettingsModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreditFundSettingsModel
        fields = ('is_not_locked', )
