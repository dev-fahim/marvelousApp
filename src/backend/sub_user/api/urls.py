from django.urls import path, include
from sub_user.api.views import SubUserCreateAPIView

app_name = 'sub_user_app'

urlpatterns = [
    path('add/', SubUserCreateAPIView.as_view(), name='create_sub_user')
]
