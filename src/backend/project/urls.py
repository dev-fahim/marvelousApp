"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework_jwt.views import verify_jwt_token, refresh_jwt_token

urlpatterns = [
    path('admin/', admin.site.urls),
]

# ALL APS REALATED URLs
urlpatterns += [
    path('api/', include([
        path('user/', include('base_user.api.urls', namespace='base_user_app')),
        path('sub_user/', include('sub_user.api.urls', namespace='sub_user_app')),
        path('company/', include('company.api.urls', namespace='company_app')),
    ])),
]
# END HERE

# ALl REST_FRAMEWORK URLs
urlpatterns += [
    re_path(r'^rest-auth/', include('rest_auth.urls')),
    re_path(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    re_path(r'^api-token-verify/', verify_jwt_token),
    re_path(r'^api-token-refresh/', refresh_jwt_token),
]
# END HERE
