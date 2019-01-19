from rest_framework import serializers
from expenditure.models import ExpenditureHeadingModel, ExpenditureRecordModel
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
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

