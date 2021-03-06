from rest_framework import serializers
from credit.models import (
    CreditFundModel,
    CreditFundSourceModel,
    CreditFundSettingsModel,
    CreditFundHistoryModel,
    CreditFundSourceHistoryModel
)
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
import uuid
from utils import utils


class CreditFundModelSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name='credit_app:fund_view_update',
        lookup_field='uuid'
    )
    source_name = serializers.SerializerMethodField()
    extra_description = serializers.CharField(read_only=False, write_only=True, allow_blank=True)

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
            'uuid',
            'is_deleted',
            'is_refundable',
            'extra_description'
        )
        read_only_fields = ('uuid', 'added', 'updated', 'source_name', 'is_refundable')

    def request_data(self):
        return self.context['request']

    def logged_in_user(self):
        return self.request_data().user

    def base_user_model(self):
        base_user = BaseUserModel.objects.filter(base_user=self.logged_in_user())
        sub_user = SubUserModel.objects.filter(root_user=self.logged_in_user())

        if base_user.exists():
            return self.logged_in_user().base_user
        if sub_user.exists():
            return self.logged_in_user().root_sub_user.base_user

    @staticmethod
    def validate_amount(value):
        if value <= 0:
            raise serializers.ValidationError(detail="Amount cannot be ZERO or LOWER than ZERO")
        return value

    def create(self, validated_data):
        validated_data.pop("extra_description")
        validated_data.pop("is_deleted")
        obj = CreditFundModel.objects.create(
            base_user=self.base_user_model(),
            uuid=uuid.uuid4(),
            is_deleted=False,
            **validated_data
        )

        return obj
    
    def update(self, instance, validated_data):

        if instance.is_deleted is True and validated_data.get('is_deleted') is False:
            # Todo: add history with is_restored = True
            CreditFundHistoryModel.objects.create(
                action_by=self.logged_in_user(),
                base_user=self.base_user_model(),
                credit_fund=instance,
                is_deleted=False,
                is_updated=False,
                is_restored=True,
                old_source=instance.source,
                new_source=validated_data.get('source'),
                old_description=instance.description,
                new_description=validated_data.get('description'),
                old_fund_added=instance.fund_added,
                new_fund_added=validated_data.get('fund_added'),
                old_amount=instance.amount,
                new_amount=validated_data.get('amount'),
                description=validated_data.get('extra_description'),
                old_uuid=instance.uuid,
            )
            instance.is_deleted = False
            instance.save()
            return instance

        if instance.is_deleted is False and validated_data.get('is_deleted') is True:  # OK
            # Todo: add history with is_deleted = True
            raw_value = instance.amount
            print(raw_value)

            expend_obj_non_ref = self.base_user_model().all_expenditure_records.all().filter(
                                                                                             is_for_refund=False,
                                                                                             is_deleted=False)
            expend_obj_ref = self.base_user_model().all_expenditure_records.all().filter(
                                                                                         is_for_refund=True,
                                                                                         is_deleted=False)
            credit_fund_obj = self.base_user_model().credit_funds.filter(is_deleted=False)

            all_credit_fund_amounts = [obj.amount for obj in credit_fund_obj]
            all_record_amounts_ref = [obj.amount for obj in expend_obj_ref]
            all_record_amounts_non_ref = [obj.amount for obj in expend_obj_non_ref]

            total_pre_credit_fund_amount = utils.sum_int_of_array(all_credit_fund_amounts)
            total_pre_record_amount_non_ref = utils.sum_int_of_array(all_record_amounts_non_ref)
            total_pre_record_amount_ref = utils.sum_int_of_array(all_record_amounts_ref)

            print(total_pre_credit_fund_amount, total_pre_record_amount_non_ref, total_pre_record_amount_ref)

            real_asset = total_pre_credit_fund_amount - total_pre_record_amount_ref - raw_value

            print(real_asset)

            if real_asset >= total_pre_record_amount_non_ref:
                CreditFundHistoryModel.objects.create(
                    action_by=self.logged_in_user(),
                    base_user=self.base_user_model(),
                    credit_fund=instance,
                    is_deleted=True,
                    is_updated=False,
                    is_restored=False,
                    old_source=instance.source,
                    new_source=validated_data.get('source'),
                    old_description=instance.description,
                    new_description=validated_data.get('description'),
                    old_fund_added=instance.fund_added,
                    new_fund_added=validated_data.get('fund_added'),
                    old_amount=instance.amount,
                    new_amount=validated_data.get('amount'),
                    description=validated_data.get('extra_description'),
                    old_uuid=instance.uuid,
                )
                instance.is_deleted = True
                instance.save()

                if instance:
                    return instance
                raise serializers.ValidationError("Not found!")
            raise serializers.ValidationError("Credits will be lower than your debits!")

        raw_value = instance.amount
        new_value = validated_data.get('amount', raw_value)
        expend_obj_non_ref = self.base_user_model().all_expenditure_records.all().filter(
                                                                                         is_for_refund=False,
                                                                                         is_deleted=False)
        expend_obj_ref = self.base_user_model().all_expenditure_records.all().filter(
                                                                                     is_for_refund=True,
                                                                                     is_deleted=False)
        credit_fund_obj = self.base_user_model().credit_funds.all()

        all_credit_fund_amounts = [obj.amount for obj in credit_fund_obj]
        all_record_amounts_ref = [obj.amount for obj in expend_obj_ref]
        all_record_amounts_non_ref = [obj.amount for obj in expend_obj_non_ref]

        total_pre_credit_fund_amount = utils.sum_int_of_array(all_credit_fund_amounts)
        total_pre_record_amount_non_ref = utils.sum_int_of_array(all_record_amounts_non_ref)
        total_pre_record_amount_ref = utils.sum_int_of_array(all_record_amounts_ref)

        real_asset = total_pre_credit_fund_amount - total_pre_record_amount_ref - raw_value + new_value

        if real_asset >= total_pre_record_amount_non_ref:
            # Todo: add history with is_updated = True
            CreditFundHistoryModel.objects.create(
                action_by=self.logged_in_user(),
                base_user=self.base_user_model(),
                credit_fund=instance,
                is_deleted=False,
                is_updated=True,
                is_restored=False,
                old_source=instance.source,
                new_source=validated_data.get('source'),
                old_description=instance.description,
                new_description=validated_data.get('description'),
                old_fund_added=instance.fund_added,
                new_fund_added=validated_data.get('fund_added'),
                old_amount=instance.amount,
                new_amount=validated_data.get('amount'),
                description=validated_data.get('extra_description'),
                old_uuid=instance.uuid,
            )
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
    extra_description = serializers.CharField(read_only=False, write_only=True, allow_blank=True)

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
            'is_deleted',
            'extra_description'
        )
        read_only_fields = ('uuid', 'added', 'updated', 'id')

    def request_data(self):
        return self.context['request']

    def logged_in_user(self):
        return self.request_data().user

    def base_user_model(self):
        base_user = BaseUserModel.objects.filter(base_user=self.logged_in_user())
        sub_user = SubUserModel.objects.filter(root_user=self.logged_in_user())

        if base_user.exists():
            return self.logged_in_user().base_user
        if sub_user.exists():
            return self.logged_in_user().root_sub_user.base_user

    def create(self, validated_data):
        validated_data.pop('extra_description')
        validated_data.pop('is_deleted')
        obj = CreditFundSourceModel.objects.create(
            base_user=self.logged_in_user().base_user,
            uuid=uuid.uuid4(),
            **validated_data
        )

        return obj

    def update(self, instance, validated_data):

        if instance.is_deleted is True and validated_data.get('is_deleted') is False:
            # Todo: add history with is_restored = True
            CreditFundSourceHistoryModel.objects.create(
                action_by=self.logged_in_user(),
                base_user=self.base_user_model(),
                credit_fund_source=instance,
                is_deleted=False,
                is_updated=False,
                is_restored=True,
                old_source_name=instance.source_name,
                new_source_name=validated_data.get('source_name'),
                description=validated_data.get('extra_description'),
                old_uuid=instance.uuid,
            )
            instance.is_deleted = False
            instance.save()
            return instance

        if instance.is_deleted is False and validated_data.get('is_deleted') is True:
            # Todo: add history with is_deleted = True
            if self.base_user_model().credit_funds.filter(source=instance, is_deleted=False).exists():
                raise serializers.ValidationError("You have one or more credit records which belong to this credit head.")
            CreditFundSourceHistoryModel.objects.create(
                action_by=self.logged_in_user(),
                base_user=self.base_user_model(),
                credit_fund_source=instance,
                is_deleted=True,
                is_updated=False,
                is_restored=False,
                old_source_name=instance.source_name,
                new_source_name=validated_data.get('source_name'),
                description=validated_data.get('extra_description'),
                old_uuid=instance.uuid,
            )
            instance.is_deleted = True
            instance.save()
            return instance

        # Todo: add history with is_updated = True
        CreditFundSourceHistoryModel.objects.create(
            action_by=self.logged_in_user(),
            base_user=self.base_user_model(),
            credit_fund_source=instance,
            is_deleted=False,
            is_updated=True,
            is_restored=False,
            old_source_name=instance.source_name,
            new_source_name=validated_data.get('source_name'),
            description=validated_data.get('extra_description'),
            old_uuid=instance.uuid,
        )

        instance.source_name = validated_data.get('source_name', instance.source_name)
        instance.description = validated_data.get('description', instance.description)

        instance.save()

        return instance


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


class CreditFundHistoryModelSerializer(serializers.ModelSerializer):

    action_by = serializers.SerializerMethodField()
    credit_fund = serializers.SerializerMethodField()
    old_source = serializers.SerializerMethodField()
    new_source = serializers.SerializerMethodField()
    is_refundable = serializers.SerializerMethodField()

    class Meta:
        model = CreditFundHistoryModel
        fields = '__all__'

    def update(self, instance, validated_data):
        return serializers.ValidationError("Cannot be updated by human!")

    def create(self, validated_data):
        return serializers.ValidationError("Cannot be created by human!")

    @staticmethod
    def get_action_by(obj):
        return obj.__str__()

    @staticmethod
    def get_credit_fund(obj):
        return obj.get_credit_fund()

    @staticmethod
    def get_old_source(obj):
        return obj.get_old_source()

    @staticmethod
    def get_new_source(obj):
        return obj.get_new_source()

    @staticmethod
    def get_is_refundable(obj):
        return obj.get_is_refundable()


class CreditFundSourceHistoryModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreditFundSourceHistoryModel
        fields = '__all__'

    def update(self, instance, validated_data):
        return serializers.ValidationError("Cannot be updated by human!")

    def create(self, validated_data):
        return serializers.ValidationError("Cannot be created by human!")

