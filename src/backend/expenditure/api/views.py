from rest_framework import generics, status, filters
from expenditure.models import ExpenditureRecordModel
from expenditure.api.serializers import ExpenditureHeadingModelSerializer, ExpenditureRecordModelSerializer
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
    filter_backends = (filters.SearchFilter,)
    search_fields = ('heading_name', 'uuid', 'added', 'updated')

    def get_queryset(self):
        return self.request.user.base_user.expenditure_headings.all()


class ExpenditureHeadingRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenditureHeadingModelSerializer
    permission_classes = [permissions.OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.base_user.expenditure_headings.all()


class ExpenditureRecordListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [permissions.BaseUserOrSubUser, permissions.SubUserCanListAndView, permissions.SubUserCanAdd]
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
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.all_expenditure_records.all()
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = ExpenditureRecordModel.objects.filter(base_user=self.request.user.root_sub_user.base_user)
        return queryset


class ExpenditureRecordRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [permissions.OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.expenditure_records.all()


class ExpenditureCheckoutToday(ExpenditureRecordListCreateAPIView):
    headings = ['Head', 'Added by', 'Expended by', 'Amount', 'Expend time', 'Record added']
    attributes = ['expend_heading', 'added_by', 'expend_by', 'amount', 'expend_time', 'added']
    mimetype = 'text/csv'
    from_email = os.environ.get('EMAIL')

    def get(self, request, *args, **kwargs):
        items = self.filter_queryset(queryset=self.get_queryset().filter(added__date=today))
        file_name = f'expenditure_records_of_{today}.csv'
        response = utils.django_download_generated_csv_from_model_object(file_name, items, self.headings, self.attributes)
        subject = f'Accounts Application: All expenditure records in {today}'
        body = f'''
        This is an automated e-mail from your application.
        Your daily expenditure records in {datetime.datetime.today().strftime("%d %B, %Y")}
        '''
        to = [request.user.email, ]
        content = response.getvalue()
        utils.django_send_email_with_attachments(subject, body, self.from_email, to, file_name, content, self.mimetype)
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
        subject = 'Accounts Application: All expenditure records.'
        body = 'This is an automated e-mail from your application. Your files are given below.'
        base_user = items.first().base_user
        to = [base_user.base_user.email, ]

        content = response.getvalue()
        utils.django_send_email_with_attachments(subject, body, self.from_email, to, file_name, content, self.mimetype)

        return response


class ExpenditureRenderPDF(ExpenditureCheckoutToday):

    def get(self, request, *args, **kwargs):
        items = self.filter_queryset(queryset=self.get_queryset())
        print(items)
        base_user = items.first().base_user
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
        return HttpResponse(pdf, content_type='application/pdf')
