from rest_framework import generics
from expenditure.api.serializers import ExpenditureHeadingModelSerializer, ExpenditureRecordModelSerializer
from project.permissions import OnlyBaseUser, BaseUserOrSubUser


class ExpenditureHeadingListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = ExpenditureHeadingModelSerializer
    permission_classes = [OnlyBaseUser, ]

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

    def get_queryset(self):
        return self.request.user.expenditure_records.all()


class ExpenditureRecordRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ExpenditureRecordModelSerializer
    permission_classes = [OnlyBaseUser, ]
    lookup_field = 'uuid'

    def get_queryset(self):
        return self.request.user.expenditure_records.all()


class ExpenditureRecordListAPIView(generics.ListAPIView):
    serializer_class = ExpenditureHeadingModelSerializer
    permission_classes = [BaseUserOrSubUser, ]

    def get_queryset(self):
        return
