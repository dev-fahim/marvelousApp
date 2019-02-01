from rest_framework import serializers
from loan_management import models as loan_models
from credit.api import serializers as credit_serializers
from expenditure.api import serializers as expend_serializers
from utils import utils
import uuid
from expenditure import models as expend_models
from credit import models as credit_models


class CreditFundOnLoanModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = loan_models.CreditFundOnLoanModel
        fields = '__all__'
        read_only_fields = ('base_user', 'credit_fund')


class ExpenditureRecordOnLoanModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = loan_models.ExpenditureRecordOnLoanModel
        fields = '__all__'
        read_only_fields = ('base_user', 'expenditure_record_model')


class CreditForLoanSerializer(credit_serializers.CreditFundModelSerializer):
    loan = CreditFundOnLoanModelSerializer(many=False, read_only=False)

    class Meta:
        model = credit_models.CreditFundModel
        fields = (
            'source',
            'source_name',
            'url',
            'description',
            'added',
            'updated',
            'amount',
            'fund_added',
            'uuid',
            'is_deleted',
            'extra_description',
            'loan',
            'is_refundable'
        )
        read_only_fields = ('uuid', 'added', 'updated', 'source_name', 'is_refundable', 'loan')

    def create(self, validated_data):
        validated_data.pop("extra_description")
        validated_data.pop("is_deleted")
        obj = credit_models.CreditFundModel.objects.create(
            base_user=self.base_user_model(),
            uuid=uuid.uuid4(),
            is_deleted=False,
            is_refundable=True,
            **validated_data
        )
        loan_models.CreditFundOnLoanModel.objects.create(
            base_user=self.base_user_model(),
            credit_fund=obj
        )
        return obj


class ExpenditureForLoanSerializer(expend_serializers.ExpenditureRecordModelSafeSerializer):
    loan = ExpenditureRecordOnLoanModelSerializer(many=False, read_only=False)

    class Meta:
        model = expend_models.ExpenditureRecordModel
        exclude = ('base_user', )
        read_only_fields = ('uuid', 'added_by', 'added', 'updated', 'is_verified', 'is_for_refund', 'loan')

    def create(self, validated_data):
        validated_data.pop('extra_description')
        value = validated_data.get('amount')

        credit_fund_obj = self.base_user_model().credit_funds.filter(is_refundable=True)
        amounts = [obj.amount for obj in credit_fund_obj]
        total_credit = utils.sum_int_of_array(amounts)

        expend_model_obj = self.base_user_model().all_expenditure_records.filter(is_for_refund=True,
                                                                                 is_verified=True,
                                                                                 is_deleted=False)
        amounts = [obj.amount for obj in expend_model_obj]
        total_expend = utils.sum_int_of_array(amounts)

        case = total_credit - total_expend

        if case >= value:
            obj = expend_models.ExpenditureRecordModel.objects.create(
                added_by=self.logged_in_user(),
                base_user=self.base_user_model(),
                uuid=uuid.uuid4(),
                is_for_refund=True,
                **validated_data
            )
            loan_models.ExpenditureRecordOnLoanModel.objects.create(
                base_user=self.base_user_model(),
                expenditure_record_model=obj
            )
            return obj
        raise serializers.ValidationError(detail='''Credit Loan will be exceed! So you cannot add 
        any more records. After authority add more Credit Loan in Database you can entry more records.''')



