from rest_framework import serializers
from credit.models import CreditFundModel, CreditFundSourceModel, CreditFundSettingsModel
import uuid


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

    def create(self, validated_data):
        obj = CreditFundModel.objects.create(
            base_user=self.logged_in_user().base_user,
            uuid=uuid.uuid4(),
            **validated_data
        )

        return obj
    
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
            'source_name',
            'url',
            'description',
            'added',
            'updated',
            'uuid'
        )
        read_only_fields = ('uuid', 'added', 'updated')

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
            'source_name',
            'url',
            'description',
            'added',
            'updated',
            'uuid',
            'funds'
        )
        read_only_fields = ('uuid', 'added', 'updated')


class CreditFundSettingsModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreditFundSettingsModel
        fields = ('is_not_locked', )
