from rest_framework import generics
from sub_user.api.serializers import RootUserModelSerializer
from project.permissions import OnlyBaseUser


class SubUserCreateAPIView(generics.CreateAPIView):
    permission_classes = [OnlyBaseUser, ]
    serializer_class = RootUserModelSerializer

    def get_queryset(self):
        return self.request.user
