from rest_framework import generics
from base_user.api.serializers import UserModelSerializer
from base_user.api.permissions import BaseUserCreatePermission


class BaseUserCreateAPIView(generics.CreateAPIView):
    permission_classes = [BaseUserCreatePermission, ]
    serializer_class = UserModelSerializer

    def get_queryset(self):
        return self.request.user
