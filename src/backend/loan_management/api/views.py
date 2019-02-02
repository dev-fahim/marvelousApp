from rest_framework import generics
from project import permissions as main_permissions
from loan_management.api import serializers as loan_serializers
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel


class LoanCreditListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [main_permissions.FundIsNotLocked, main_permissions.BaseUserOrSubUser]
    serializer_class = loan_serializers.CreditForLoanSerializer

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
        return self.base_user_model().credit_funds.filter(is_refundable=True)


class LoanExpenditureListCreateAPIView(generics.ListCreateAPIView):
    permission_classes = [main_permissions.FundIsNotLocked, main_permissions.BaseUserOrSubUser]
    serializer_class = loan_serializers.ExpenditureForLoanSerializer

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
        return self.base_user_model().all_expenditure_records.filter(is_for_refund=True, is_deleted=False)

