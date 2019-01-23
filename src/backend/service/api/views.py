from rest_framework import generics
from rest_framework.response import Response
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from base_user.api.serializers import BaseUserSerializer
from sub_user.api.serializers import SubUserModelSerializers
from project.permissions import BaseUserOrSubUser
from utils import utils
import datetime


class GetUserData(generics.RetrieveAPIView):
    permission_classes = [BaseUserOrSubUser, ]

    def get_object(self):
        queryset = None
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            queryset = self.request.user.base_user
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            queryset = self.request.user.root_sub_user
        return queryset
    
    def get_serializer_class(self):
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            return BaseUserSerializer
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            return SubUserModelSerializers


class GetTotalFundAmount(generics.GenericAPIView):
    permission_classes = [BaseUserOrSubUser, ]

    def get_queryset(self):
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            return self.request.user.base_user.credit_funds.all()
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            return self.request.user.root_sub_user.base_user.credit_funds.all()

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        all_amounts = []

        for instance in queryset:
            all_amounts.append(instance.amount)
        
        total = utils.sum_int_of_array(all_amounts)

        return Response({'total_fund_amount': total})


class GrabWhatYouWantedAPIView(generics.GenericAPIView):
    permission_classes = [BaseUserOrSubUser, ]

    def get_base_user(self):
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            return self.request.user.base_user
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            return self.request.user.root_sub_user.base_user
    
    def is_base_user(self):
        return BaseUserModel.objects.filter(base_user=self.request.user).exists()

    def is_sub_user(self):
        return SubUserModel.objects.filter(root_user=self.request.user).exists()

    def get_credit_funds(self):
        return self.get_base_user().credit_funds.all()
    
    def get_expend_records(self):
        return self.get_base_user().all_expenditure_records.all()
    
    def get_user_permissions(self):
        if self.is_base_user():
            return {
                'canAdd': True,
                'canEdit': True,
                'canList': True,
                'canRetrieve': True,
                'canFundSourceListCreate': True,
                'canFundSourceEdit': True,
                'is_active': True,
                'user_type': 'admin'
            }
        elif self.is_sub_user():
            return {
                'canAdd': self.request.user.root_user.canAdd,
                'canEdit': self.request.user.root_user.canEdit,
                'canList': self.request.user.root_user.canList,
                'canRetrieve': self.request.user.root_user.canRetrieve,
                'canFundSourceListCreate': False,
                'canFundSourceEdit': False,
                'is_active': self.request.user.root_user.is_active,
                'user_type': self.request.user.root_user.user_type
            }
    
    def get_account_status(self):
        info = self.request.user.user_extra_info
        return {
            'is_approved': info.is_approved,
            'is_locked': info.is_not_locked,
            'is_active': info.is_active
        }
    # %Y-%m-%d
    def get_todays_open_credit_fund(self):
        last_expend_records = self.get_expend_records().filter(
            expend_date__lt=datetime.date.today(),
            is_verified=True
            )
        last_credit_funds = self.get_credit_funds().filter(
            fund_added__lt=datetime.date.today()
            )
        last_credit_funds_amounts = [obj.amount for obj in last_credit_funds]
        last_expend_records_amounts = [obj.amount for obj in last_expend_records]
        last_credit_fund_total_amount = utils.sum_int_of_array(last_credit_funds_amounts)
        last_expend_record_total_amount = utils.sum_int_of_array(last_expend_records_amounts)
        todays_open_credit_fund = last_credit_fund_total_amount - last_expend_record_total_amount
        print({
            'from-start-to-yesterday-expend': last_expend_record_total_amount,
            'from-start-to-yesterday-credit': last_credit_fund_total_amount,
            'today-open': last_credit_fund_total_amount - last_expend_record_total_amount
        })

        return todays_open_credit_fund
    
    def get_remaining_credit_fund_amount(self):
        last_expend_records = self.get_expend_records().filter(is_verified=True)
        last_credit_funds = self.get_credit_funds()
        last_credit_funds_amounts = [obj.amount for obj in last_credit_funds]
        last_expend_records_amounts = [obj.amount for obj in last_expend_records]
        last_credit_fund_total_amount = utils.sum_int_of_array(last_credit_funds_amounts)
        last_expend_record_total_amount = utils.sum_int_of_array(last_expend_records_amounts)
        remaining_credit_fund_amount = last_credit_fund_total_amount - last_expend_record_total_amount

        return remaining_credit_fund_amount
    
    def get_this_month_total_expend_amount(self):
        this_month_expend_records = self.get_expend_records().filter(
            added__month=datetime.datetime.now().month, 
            added__year=datetime.datetime.now().year,
            is_verified=True
            )
        this_month_expend_records_amounts = [obj.amount for obj in this_month_expend_records]
        this_month_total_expend_amount = utils.sum_int_of_array(this_month_expend_records_amounts)

        return this_month_total_expend_amount
    
    def get_total_unauthorized_expend_amount(self):
        unauthorized_expend_records = self.get_expend_records().filter(is_verified=False)
        unauthorized_expend_records_amounts = [obj.amount for obj in unauthorized_expend_records]
        total_unauthorized_expend_amount = utils.sum_int_of_array(unauthorized_expend_records_amounts)

        return total_unauthorized_expend_amount
    
    def get_fund_status(self):
        return self.get_base_user().fund_settings.is_not_locked
    
    def get_total_credit_fund_amount(self):
        queryset = self.get_credit_funds()
        all_amounts = [obj.amount for obj in queryset]
        total = utils.sum_int_of_array(all_amounts)

        return total
    
    def get(self, request, *args, **kwargs):
        context = {
            'is_base_user': self.is_base_user(),
            'is_sub_user': self.is_sub_user(),
            'user_permissions': self.get_user_permissions(),
            'account_status': self.get_account_status(),
            'todays_open_credit_fund': self.get_todays_open_credit_fund(),
            'remaining_credit_fund_amount': self.get_remaining_credit_fund_amount(),
            'this_month_total_expend_amount': self.get_this_month_total_expend_amount(),
            'total_unauthorized_expend_amount': self.get_total_unauthorized_expend_amount(),
            'total_credit_fund_amount': self.get_total_credit_fund_amount(),
            'fund_status': self.get_fund_status()
        }
        return Response(context)

