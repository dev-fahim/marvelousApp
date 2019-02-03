from expenditure.api.serializers import ExpenditureRecordHistoryModelSerializer
from credit.api.serializers import CreditFundHistoryModelSerializer
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from rest_framework import generics
from project import permissions


class ExpenditureRecordArchiveAPIView(generics.ListAPIView):
    serializer_class = ExpenditureRecordHistoryModelSerializer
    permission_classes = [permissions.BaseUserOrSubUser, permissions.SubUserCanList]

    def request_data(self):
        return self.request

    def logged_in_user(self):
        return self.request_data().user

    def base_user_model(self):
        base_user = BaseUserModel.objects.filter(base_user=self.logged_in_user())
        sub_user = SubUserModel.objects.filter(root_user=self.logged_in_user())

        if base_user.exists():
            return self.logged_in_user().base_user
        if sub_user.exists():
            return self.logged_in_user().root_sub_user.base_user

    def get_queryset(self):
        return self.base_user_model().all_expenditure_records_history.filter(is_deleted=True)


class CreditFundArchiveAPIView(generics.ListAPIView):
    serializer_class = CreditFundHistoryModelSerializer
    permission_classes = [permissions.BaseUserOrSubUser, permissions.SubUserCanList]

    def request_data(self):
        return self.request

    def logged_in_user(self):
        return self.request_data().user

    def base_user_model(self):
        base_user = BaseUserModel.objects.filter(base_user=self.logged_in_user())
        sub_user = SubUserModel.objects.filter(root_user=self.logged_in_user())

        if base_user.exists():
            return self.logged_in_user().base_user
        if sub_user.exists():
            return self.logged_in_user().root_sub_user.base_user

    def get_queryset(self):
        return self.base_user_model().all_credit_fund_histories.filter(is_deleted=True)
