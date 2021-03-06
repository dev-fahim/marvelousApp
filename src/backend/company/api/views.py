from rest_framework import generics
from company.api.serializers import CompanyInfoModelSerializer
from project.permissions import OnlyBaseUser, BaseUserOrSubUser
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from company.api.permissions import MustHaveACompany


class CompanyInfoCreateAPIView(generics.CreateAPIView):
    serializer_class = CompanyInfoModelSerializer
    permission_classes = [OnlyBaseUser, MustHaveACompany]

    def get_queryset(self):
        return self.request.user.base_user.company_user


class CompanyInfoAPIView(generics.RetrieveAPIView):
    serializer_class = CompanyInfoModelSerializer
    permission_classes = [BaseUserOrSubUser, MustHaveACompany]

    def get_object(self):
        if BaseUserModel.objects.filter(base_user=self.request.user).exists():
            return self.request.user.base_user.company_user
        elif SubUserModel.objects.filter(root_user=self.request.user).exists():
            return self.request.user.root_sub_user.base_user.company_user


class CompanyInfoEditAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = CompanyInfoModelSerializer
    permission_classes = [OnlyBaseUser, MustHaveACompany]

    def get_object(self):
        return self.request.user.base_user.company_user
