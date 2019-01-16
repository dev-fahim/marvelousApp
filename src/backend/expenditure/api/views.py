from rest_framework import generics
from expenditure.models import ExpenditureRecordModel
from expenditure.api.serializers import ExpenditureHeadingModelSerializer, ExpenditureRecordModelSerializer
from project.permissions import OnlyBaseUser, BaseUserOrSubUser
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from expenditure.api.filters import ExpenditureRecordFilter


class ExpenditureHeadingListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ExpenditureHeadingModelSerializer
    permission_classes = [OnlyBaseUser, ]
    filter_backends = (filters.SearchFilter,)
    search_fields = ('heading_name', 'uuid', 'added', 'updated')

    def get_queryset(self):
        return self.request.user.base_user.expenditure_headings.all()


class ExpenditureHeadingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenditureHeadingModelSerializer
    permission_classes = [OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.base_user.expenditure_headings.all()


class ExpenditureRecordListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [BaseUserOrSubUser, ]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter)
    filterset_class = ExpenditureRecordFilter
    search_fields = (
        'expend_heading__heading_name',
        'uuid',
        'added',
        'updated',
        'expend_by',
        'expend_time'
    )
    ordering_fields = ('added', 'expend_time', 'amount', 'expend_heading__heading_name')
    ordering = ('-id', )

    def get_queryset(self):
        return self.request.user.expenditure_records.all()


class ExpenditureRecordRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.expenditure_records.all()


class ExpenditureRecordListAPIView(generics.ListAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [BaseUserOrSubUser, ]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter)
    filterset_class = ExpenditureRecordFilter
    search_fields = (
        'expend_heading__heading_name',
        'uuid',
        'added',
        'updated',
        'expend_by',
        'expend_time'
    )
    ordering_fields = ('added', 'expend_time', 'amount', 'expend_heading__heading_name')
    ordering = ('-id',)

    def get_queryset(self):
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            print('base_user')
            return self.request.user.base_user.all_expenditure_records.all()
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            print('sub_user')
            return ExpenditureRecordModel.objects.filter(base_user=self.request.user.root_sub_user.base_user)
        print('super_user')
        return self.request.user.expenditure_records.all()
