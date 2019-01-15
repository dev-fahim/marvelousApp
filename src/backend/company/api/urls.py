from django.urls import path, include
from company.api.views import (
    CompanyInfoListCreateAPIView,
    CompanyInfoRetrieveUpdateDeleteAPIView
    )

app_name = 'company_app'

urlpatterns = [
    path('add/', CompanyInfoListCreateAPIView.as_view(), name='company_add'),
    path('change/<uuid:uuid>/', CompanyInfoRetrieveUpdateDeleteAPIView.as_view(), name='company_change')
]