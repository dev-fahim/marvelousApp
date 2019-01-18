from rest_framework import generics, status, filters
from credit.api import serializers
from project.permissions import OnlyBaseUser, BaseUserOrSubUser
from credit.models import CreditFundModel
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from rest_framework.response import Response
from credit.api.filters import CreditFundFilter
from django_filters.rest_framework import DjangoFilterBackend
from utils import utils
import os
import datetime


class CreditFundSourceListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.CreditFundSourceModelSerializer
    permission_classes = [OnlyBaseUser, ]
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = ('description', 'uuid', 'source_name')
    ordering_fields = ('added', 'source_name', 'amount')
    ordering = ('-id',)

    def get_queryset(self):
        return self.request.user.base_user.credit_fund_sources.all()


class CreditFundsAccordingToSourcesListAPIView(CreditFundSourceListCreateAPIView):
    serializer_class = serializers.CreditFundsAccordingToSourcesSerializer

    def post(self, request, *args, **kwargs):
        return Response(data={'detail': 'Not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED, exception=True)


class CreditFundSourceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.CreditFundSourceModelSerializer
    permission_classes = [OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.base_user.credit_fund_sources.all()


class CreditFundListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.CreditFundModelSerializer
    permission_classes = [OnlyBaseUser, ]
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    search_fields = ('description', 'uuid')
    ordering_fields = ('added', 'source__source_name', 'amount')
    ordering = ('-id', )
    filterset_class = CreditFundFilter

    def get_queryset(self):
        return self.request.user.base_user.credit_funds.all()


class CreditFundRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = serializers.CreditFundModelSerializer
    permission_classes = [OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.base_user.credit_funds.all()


class CreditFundListAPIView(CreditFundListCreateAPIView):
    permission_classes = [BaseUserOrSubUser, ]

    def get_queryset(self):
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            return self.request.user.base_user.credit_funds.all()
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            sub_user = self.request.user.root_sub_user
            base_user = sub_user.base_users
            return CreditFundModel.objects.filter(base_user=base_user)
        return None

    def post(self, request, *args, **kwargs):
        return Response(data={'detail': 'Not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED, exception=True)


class CreditFundGenCSVEmail(CreditFundListAPIView):
    today = datetime.datetime.today().strftime("%d %B, %Y")

    def get(self, request, *args, **kwargs):
        file_name = f'credit_fund_list_{self.today}.csv'
        headings = ['Source Name', 'Record Added Time', 'Fund Added Time', 'Amount']
        attributes = ['source', 'added', 'fund_added', 'amount']
        response = utils.django_download_generated_csv_from_model_object(
            file_name=file_name,
            query_set=self.filter_queryset(queryset=self.get_queryset()),
            headings=headings,
            attributes=attributes
        )
        subject = f'Accounts Application: {self.today} Report of Credit Fund'
        body = f'This is an automated email from your application.'
        from_email = os.environ.get('EMAIL')
        to = []

        if BaseUserModel.objects.filter(base_user=request.user).exists():
            to = [self.request.user.email, ]
        elif SubUserModel.objects.filter(root_user=request.user).exists():
            sub_user_model = SubUserModel.objects.filter(root_user=request.user)
            base_user_model = sub_user_model.base_user
            to = [base_user_model.base_user.email, ]

        utils.django_send_email_with_attachments(
            subject=subject,
            body=body,
            from_email=from_email,
            to=to,
            file_name=file_name,
            content=response.getvalue(),
            mimetype='text/csv'
        )

        return response
