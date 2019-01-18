from rest_framework import generics
from expenditure.models import ExpenditureRecordModel
from expenditure.api.serializers import ExpenditureHeadingModelSerializer, ExpenditureRecordModelSerializer
from project.permissions import OnlyBaseUser, BaseUserOrSubUser
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from expenditure.api.filters import ExpenditureRecordFilter
from django.shortcuts import HttpResponse
from django.contrib.auth.decorators import login_required
import datetime
from utils import utils
today = datetime.datetime.today().strftime('%Y-%m-%d')


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
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.all_expenditure_records.all()
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = ExpenditureRecordModel.objects.filter(base_user=self.request.user.root_sub_user.base_user)
        return queryset


@login_required
def expenditure_checkout_today(request):
    items = []
    if request.method == 'GET':
        if BaseUserModel.objects.filter(base_user=request.user).exists():
            items = request.user.base_user.all_expenditure_records.filter(
                added__date=today,
                is_verified=True
            )
        elif SubUserModel.objects.filter(root_user=request.user).exists():
            sub_user = SubUserModel.objects.get(root_user=request.user)
            base_user = sub_user.base_user
            items = ExpenditureRecordModel.objects.filter(
                base_user=base_user,
                added__date=today,
                is_verified=True
            )
        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="expenditure_records_of_{today}.csv"'

        headings = ['Head', 'Added by', 'Expended by', 'Amount', 'Expend time', 'Record added']
        attributes = ['expend_heading', 'added_by', 'expend_by', 'amount', 'expend_time', 'added']

        utils.django_generate_csv_from_model_object(response, items, headings, attributes)

        subject = f'Accounts Application: All expenditure records in {today}'
        body = f'''
        This is an automated e-mail from your application.
        Your daily expenditure records in {datetime.datetime.today().strftime("%d %B, %Y")}
        '''
        from_email = 'fahim6668@gmail.com'
        to = ['fahim6668@gmail.com', ]
        file_name = f'expenditure_records_of_{today}.csv'
        content = response.getvalue()
        mimetype = 'text/csv'

        utils.django_send_email_with_attachments(subject, body, from_email, to, file_name, content, mimetype)

        return response


class ExpenditureRecordEmailCSV(generics.GenericAPIView):
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
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user.all_expenditure_records.all()
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = ExpenditureRecordModel.objects.filter(base_user=self.request.user.root_sub_user.base_user)
        return queryset

    def get(self, request, *args, **kwargs):
        items = self.filter_queryset(queryset=self.get_queryset())

        response = HttpResponse(content_type='text/csv')
        response['Content-Disposition'] = f'attachment; filename="{today}_expenditure_record.csv"'

        headings = ['Head', 'Added by', 'Expended by', 'Amount', 'Expend time', 'Record added']
        attributes = ['expend_heading', 'added_by', 'expend_by', 'amount', 'expend_time', 'added']

        utils.django_generate_csv_from_model_object(response, items, headings, attributes)

        subject = 'Accounts Application: All expenditure records.'
        body = 'This is an automated e-mail from your application. Your files are given below.'
        from_email = 'fahim6668@gmail.com'
        to = ['fahim6668@gmail.com', ]
        file_name = f'{today}_expenditure_record.csv'
        content = response.getvalue()
        mimetype = 'text/csv'

        utils.django_send_email_with_attachments(subject, body, from_email, to, file_name, content, mimetype)

        return response
