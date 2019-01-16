from rest_framework import generics
from credit.api import serializers
from project.permissions import OnlyBaseUser, BaseUserOrSubUser
from credit.models import CreditFundModel
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from rest_framework import filters
from credit.api.filters import CreditFundFilter
from django_filters.rest_framework import DjangoFilterBackend


class CreditFundSourceListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = serializers.CreditFundSourceModelSerializer
    permission_classes = [OnlyBaseUser, ]
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = ('description', 'uuid', 'source_name')
    ordering_fields = ('added', 'source_name', 'amount')
    ordering = ('-id',)

    def get_queryset(self):
        return self.request.user.base_user.credit_fund_sources.all()


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


class CreditFundsAccordingToSourcesListAPIView(generics.ListAPIView):
    serializer_class = serializers.CreditFundsAccordingToSourcesSerializer
    permission_classes = [OnlyBaseUser, ]
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = ('description', 'uuid', 'source_name')
    ordering_fields = ('added', 'source_name', 'amount')
    ordering = ('-id',)

    def get_queryset(self):
        return self.request.user.base_user.credit_fund_sources.all()


class CreditFundListAPIView(generics.ListAPIView):
    serializer_class = serializers.CreditFundModelSerializer
    permission_classes = [BaseUserOrSubUser, ]
    filter_backends = (filters.OrderingFilter, filters.SearchFilter, DjangoFilterBackend)
    search_fields = ('description', 'uuid')
    ordering_fields = ('added', 'source__source_name', 'amount')
    ordering = ('-id',)
    filterset_class = CreditFundFilter

    def get_queryset(self):
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            return self.request.user.base_user.credit_funds.all()
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            sub_user = self.request.user.root_sub_user
            base_user = sub_user.base_users
            return CreditFundModel.objects.filter(base_user=base_user)
        return None
