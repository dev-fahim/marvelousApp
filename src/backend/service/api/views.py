from rest_framework import generics
from rest_framework.response import Response
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from base_user.api.serializers import BaseUserSerializer
from sub_user.api.serializers import SubUserModelSerializers
from project.permissions import BaseUserOrSubUser
from utils import utils


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