from rest_framework.permissions import BasePermission
from base_user.models import BaseUserModel
from sub_user.models import SubUserModel


class OnlyBaseUser(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return BaseUserModel.objects.filter(base_user=request.user).exists()
        return False


class OnlySubUser(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return SubUserModel.objects.filter(root_user=request.user).exists()
        return False


class BaseUserOrSubUser(BasePermission):
    
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return BaseUserModel.objects.filter(base_user=request.user).exists() or SubUserModel.objects.filter(root_user=request.user).exists()
        return False


class SubUserCanListAndView(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if BaseUserModel.objects.filter(base_user=request.user).exists():
                return True
            if SubUserModel.objects.filter(root_user=request.user).exists():
                sub_user = SubUserModel.objects.get(root_user=request.user)
                return sub_user.canList and sub_user.canView
        return False


class SubUserCanAdd(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if BaseUserModel.objects.filter(base_user=request.user).exists():
                return True
            if SubUserModel.objects.filter(root_user=request.user).exists():
                sub_user = SubUserModel.objects.get(root_user=request.user)
                return sub_user.canAdd
        return False


class SubUserCanUpdate(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if BaseUserModel.objects.filter(base_user=request.user).exists():
                return True
            if SubUserModel.objects.filter(root_user=request.user).exists():
                sub_user = SubUserModel.objects.get(root_user=request.user)
                return sub_user.canUpdate
        return False


class SubUserCanDelete(BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            if BaseUserModel.objects.filter(base_user=request.user).exists():
                return True
            if SubUserModel.objects.filter(root_user=request.user).exists():
                sub_user = SubUserModel.objects.get(root_user=request.user)
                return sub_user.canDelete
        return False
