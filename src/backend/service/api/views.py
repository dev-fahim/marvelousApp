from rest_framework import generics
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel
from base_user.api.serializers import BaseUserSerializer
from sub_user.api.serializers import SubUserModelSerializers
from project.permissions import BaseUserOrSubUser


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
