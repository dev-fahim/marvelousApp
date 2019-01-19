from rest_framework import generics
from company.api.serializers import CompanyInfoModelSerializer
from company.models import CompanyInfoModel
from project.permissions import OnlyBaseUser


class CompanyInfoListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CompanyInfoModelSerializer
    permission_classes = [OnlyBaseUser, ]

    def get_queryset(self):
        return CompanyInfoModel.objects.filter(base_user=self.request.user.base_user)


class CompanyInfoRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyInfoModelSerializer
    permission_classes = [OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_object(self):
        return CompanyInfoModel.objects.get(base_user=self.request.user.base_user)
