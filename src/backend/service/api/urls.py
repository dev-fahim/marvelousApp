from django.urls import path
from service.api.views import GetUserData


urlpatterns = [
    path('user/', GetUserData.as_view()),
]
