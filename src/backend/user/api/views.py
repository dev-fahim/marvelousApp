from rest_framework import generics
from project.permissions import BaseUserOrSubUser
from user.api.serialzers import UserExtraInfoModelSerializer


class GetUserExtraInfo(generics.RetrieveAPIView):

    permission_classes = [BaseUserOrSubUser, ]
    serializer_class = UserExtraInfoModelSerializer

    def get_object(self):
        return self.request.user.user_extra_info
