from rest_framework import generics, status, filters
from expenditure.api.serializers import (
    ExpenditureHeadingModelSerializer,
    ExpenditureRecordModelSerializer,
    ExpenditureRecordModelSafeSerializer,
    ExpenditureRecordHistoryModelSerializer,
    ExpenditureHeadingsHistoryModelSerializer
)
from project import permissions
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from company.models import CompanyInfoModel
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from expenditure.api.filters import ExpenditureRecordFilter
from django.shortcuts import HttpResponse
import datetime
from utils import utils
import uuid
import os
today = datetime.datetime.today().strftime('%Y-%m-%d')


class ExpenditureHeadingListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ExpenditureHeadingModelSerializer
    permission_classes = [permissions.OnlyBaseUser, ]
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('heading_name', 'uuid', 'added', 'updated')
    ordering = ('-added')

    def get_queryset(self):
        return self.request.user.base_user.expenditure_headings.filter(is_deleted=False)


class ExpenditureHeadingListAPIView(generics.ListAPIView):
    serializer_class = ExpenditureHeadingModelSerializer
    permission_classes = [permissions.BaseUserOrSubUser, ]
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('heading_name', 'uuid', 'added', 'updated')
    ordering = ('-added', )

    def get_queryset(self):
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.expenditure_headings.filter(is_deleted=False)
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = self.request.user.root_sub_user.base_user.expenditure_headings.filter(is_deleted=False)
        return queryset


class ExpenditureHeadingRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ExpenditureHeadingModelSerializer
    permission_classes = [permissions.OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.base_user.expenditure_headings.filter(is_deleted=False)


class ExpenditureHeadingHistory(generics.ListAPIView):
    serializer_class = ExpenditureHeadingsHistoryModelSerializer
    permission_classes = [permissions.OnlyBaseUser, ]

    def get_queryset(self):
        return self.request.user.base_user.expenditure_headings_history.all()


class ExpenditureRecordHistory(generics.ListAPIView):
    serializer_class = ExpenditureRecordHistoryModelSerializer
    permission_classes = [permissions.OnlyBaseUser, ]
    filter_backends = (filters.OrderingFilter, filters.SearchFilter)
    search_fields = (
        'action_by__username',
        'description',
        'old_uuid',
        'related_records__expend_heading__heading_name',
        'old_description',
        'new_description',
        'old_amount',
        'new_amount'
    )
    ordering_fields = ()
    ordering = ('-id',)

    def get_queryset(self):
        return self.request.user.base_user.all_expenditure_records_history.all()


class ExpenditureRecordCreateAPIView(generics.CreateAPIView):
    serializer_class = ExpenditureRecordModelSafeSerializer
    permission_classes = [
        permissions.FundIsNotLocked,
        permissions.BaseUserOrSubUser,
        permissions.SubUserCanAdd
    ]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter)
    filterset_class = ExpenditureRecordFilter
    search_fields = (
        'expend_heading__heading_name',
        'description',
        'uuid',
        'added',
        'updated',
        'expend_by',
        'expend_date'
    )
    ordering_fields = ('added', 'expend_date', 'amount', 'expend_heading__heading_name')
    ordering = ('-id',)

    def get_queryset(self):
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.all_expenditure_records.filter(is_deleted=False, is_for_refund=False)
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = self.request.user.root_sub_user.base_user.all_expenditure_records.filter(is_deleted=False, is_for_refund=False)
        return queryset
    
    def get_base_user(self):
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            return self.request.user.base_user
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            return self.request.user.root_sub_user.base_user


class ExpenditureRecordListAPIView(generics.ListAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [
        permissions.BaseUserOrSubUser,
        permissions.SubUserCanList
    ]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter)
    filterset_class = ExpenditureRecordFilter
    search_fields = (
        'expend_heading__heading_name',
        'description',
        'uuid',
        'added',
        'updated',
        'expend_by',
        'expend_date'
    )
    ordering_fields = ('added', 'expend_date', 'amount', 'expend_heading__heading_name')
    ordering = ('-id',)

    def get_queryset(self):
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.all_expenditure_records.filter(
                added__year=datetime.datetime.today().year, is_deleted=False)
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = self.request.user.root_sub_user.base_user.all_expenditure_records.filter(
                added__year=datetime.datetime.today().year, is_deleted=False)
        return queryset


class ALLExpenditureRecordListAPIView(generics.ListAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [
        permissions.BaseUserOrSubUser,
        permissions.SubUserCanList
    ]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter)
    filterset_class = ExpenditureRecordFilter
    search_fields = (
        'expend_heading__heading_name',
        'description',
        'uuid',
        'added',
        'updated',
        'expend_by',
        'expend_date'
    )
    ordering_fields = ('added', 'expend_date', 'amount', 'expend_heading__heading_name')
    ordering = ('-id',)

    def get_queryset(self):
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.all_expenditure_records.filter(is_deleted=False)
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = self.request.user.root_sub_user.base_user.all_expenditure_records.filter(is_deleted=False)
        return queryset


class ExpenditureRecordRetrieveAPIView(generics.RetrieveAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [
        permissions.BaseUserOrSubUser,
        permissions.SubUserCanRetrieve
    ]
    lookup_field = 'uuid'

    def get_queryset(self):
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.all_expenditure_records.filter(is_deleted=False, is_for_refund=False)
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = self.request.user.root_sub_user.base_user.all_expenditure_records.filter(is_deleted=False, is_for_refund=False)
        return queryset


class ExpenditureRecordRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [
        permissions.FundIsNotLocked,
        permissions.BaseUserOrSubUser,
        permissions.SubUserFullAccess
    ]
    lookup_field = 'uuid'

    def get_queryset(self):
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.all_expenditure_records.filter(is_deleted=False, is_for_refund=False)
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = self.request.user.root_sub_user.base_user.all_expenditure_records.filter(is_deleted=False, is_for_refund=False)
        return queryset


class ExpenditureCheckoutToday(ExpenditureRecordCreateAPIView):
    permission_classes = [
        permissions.BaseUserOrSubUser
    ]
    headings = ['Head', 'Added by', 'Expended by', 'Amount (in Taka)', 'Expend time', 'Record added']
    attributes = ['expend_heading', 'added_by', 'expend_by', 'amount', 'expend_date', 'added']
    mimetype = 'text/csv'
    from_email = os.environ['EMAIL']

    def get(self, request, *args, **kwargs):
        items = self.filter_queryset(queryset=self.get_queryset().filter(added__date=today))
        file_name = f'expenditure_records_of_{today}.csv'
        response = utils.django_download_generated_csv_from_model_object(file_name, items, self.headings, self.attributes)
        subject = f'Accounts Application: Today - {today} - Checkout'
        body = f'''
        This is an automated e-mail from your application.
        Your daily expenditure records in {datetime.datetime.today().strftime("%d %B, %Y")}
        '''
        base_user = self.get_base_user()

        emails = base_user.all_emails.filter(is_active=True)
        to = [base_user.base_user.email, ]

        for email in emails:
            to.append(email.email_address)

        content = response.getvalue()
        utils.django_send_email_with_attachments(subject, body, self.from_email, to, file_name, content, self.mimetype)
        # Generate PDF
        '''
        company = CompanyInfoModel.objects.get(base_user=base_user)
        row_values = [[obj.__getattribute__(name) for name in self.attributes] for obj in items]
        amounts = [obj.amount for obj in items]
        sum = utils.sum_int_of_array(amounts)
        context = {
            'headings': self.headings,
            'company': company,
            'row_values': row_values,
            'pdf_name': f'Expenditure {today}',
            'date': datetime.datetime.now(),
            'sum': sum,
            'page_unique_id': uuid.uuid4()
        }
        pdf = utils.django_render_to_pdf('expenditure_pdf_template.html', context)
        '''
        return response

    def post(self, request, *args, **kwargs):
        return Response(data={'detail': 'Not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED, exception=True)


class ExpenditureRecordEmailCSV(ExpenditureCheckoutToday):

    def get(self, request, *args, **kwargs):
        items = self.filter_queryset(queryset=self.get_queryset())
        file_name = f'{today}_expenditure_record.csv'
        response = utils.django_download_generated_csv_from_model_object(
            file_name=file_name, query_set=items,
            headings=self.headings, attributes=self.attributes
        )
        subject = f'Accounts Application: All expenditure records (Generated {today}).'
        body = 'This is an automated e-mail from your application. Your files are given below.'
        base_user = self.get_base_user()

        emails = base_user.all_emails.filter(is_active=True)
        to = [base_user.base_user.email, ]

        for email in emails:
            to.append(email.email_address)

        content = response.getvalue()
        utils.django_send_email_with_attachments(subject, body, self.from_email, to, file_name, content, self.mimetype)

        return response


class ExpenditureRenderPDF(ExpenditureCheckoutToday):

    def get(self, request, *args, **kwargs):
        items = self.filter_queryset(queryset=self.get_queryset())
        print(items)

        base_user = self.get_base_user()

        company = CompanyInfoModel.objects.get(base_user=base_user)
        # row_values = [[obj.__getattribute__(name) for name in self.attributes] for obj in items]
        amounts = [obj.amount for obj in items]
        sum = utils.sum_int_of_array(amounts)
        context = {
            'headings': self.headings,
            'company': company,
            'pdf_name': f'Expenditure {today}',
            'date': datetime.datetime.now(),
            'sum': sum,
            'page_unique_id': uuid.uuid4(),
            'items': items
        }
        pdf = utils.django_render_to_pdf('expenditure_pdf_template.html', context)
        return HttpResponse(pdf, content_type='application/pdf')
