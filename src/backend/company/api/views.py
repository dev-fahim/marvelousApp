from rest_framework import generics
from company.api.serializers import CompanyInfoModelSerializer
from project.permissions import OnlyBaseUser


class CompanyInfoListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CompanyInfoModelSerializer
    permission_classes = [OnlyBaseUser, ]

    def get_queryset(self):
        return self.request.user.base_user.company_users.all()


class CompanyInfoRetrieveUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyInfoModelSerializer
    permission_classes = [OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.base_user.company_users.all()
