from rest_framework import generics
from expenditure.models import ExpenditureRecordModel
from expenditure.api.serializers import ExpenditureHeadingModelSerializer, ExpenditureRecordModelSerializer
from project.permissions import OnlyBaseUser, BaseUserOrSubUser
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from expenditure.api.filters import ExpenditureRecordFilter
import csv
from django.shortcuts import HttpResponse
from django.contrib.auth.decorators import login_required
import datetime
from django.core.mail import EmailMessage
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
        items = None
        # email = self.request.query_params.get('email')
        # gen_csv = self.request.query_params.get('gen_csv')
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            items = self.request.user.base_user.all_expenditure_records.all()
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            items = ExpenditureRecordModel.objects.filter(base_user=self.request.user.root_sub_user.base_user)
        '''
        
        if gen_csv is not False:
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{today}_expenditure_record.csv"'
            writer = csv.writer(response, delimiter=',')
            writer.writerow(['Head', 'Added by', 'Expended by', 'Amount', 'Expend time', 'Record added'])

            for obj in items:
                writer.writerow([
                    obj.expend_heading,
                    obj.added_by,
                    obj.expend_by,
                    obj.amount,
                    obj.expend_time,
                    obj.added
                ])
            print('Responses', response)
            if email is not False:
                mail = EmailMessage(
                    subject=f'Checkout: All expenditure records in {today}',
                    body=f
                    This is an automated e-mail from your application.
                    Your daily expenditure records in {datetime.datetime.today().strftime("%d %B, %Y")}
                    
                    ,
                    from_email='fahim6668@gmail.com',
                    to=['fahim6668@gmail.com']
                )

                mail.attach(f'{today}_expenditure_record.csv', response.getvalue(), 'text/csv')
                mail.send(fail_silently=False)
        '''
        return items


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
        response['Content-Disposition'] = f'attachment; filename="{today}_expenditure_record.csv"'
        writer = csv.writer(response, delimiter=',')
        writer.writerow(['Head', 'Added by', 'Expended by', 'Amount', 'Expend time', 'Record added'])

        for obj in items:
            writer.writerow([
                obj.expend_heading,
                obj.added_by,
                obj.expend_by,
                obj.amount,
                obj.expend_time,
                obj.added
            ])
        print('Responses', response)

        email = EmailMessage(
            subject=f'Checkout: All expenditure records in {today}',
            body=f'''
            This is an automated e-mail from your application.
            Your daily expenditure records in {datetime.datetime.today().strftime("%d %B, %Y")}
            '''
            ,
            from_email='fahim6668@gmail.com',
            to=['marveloussweater2007@gmail.com', 'fahim6668@gmail.com']
        )

        email.attach(f'{today}_expenditure_record.csv', response.getvalue(), 'text/csv')
        email.send(fail_silently=False)
        return response
