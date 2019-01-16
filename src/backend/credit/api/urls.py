from django.urls import path, include
from credit.api import views

app_name = 'credit_app'

urlpatterns = [
    path('source/', include([
        path('list-add/', views.CreditFundSourceListCreateAPIView.as_view(), name='fund_source_list_add'),
        path('view-update-delete/<uuid:uuid>/',
             views.CreditFundSourceRetrieveUpdateDestroyAPIView.as_view(), name='fund_source_view_update_delete')
    ])),
    path('fund/', include([
        path('list-add/', views.CreditFundListCreateAPIView.as_view(), name='fund_list_add'),
        path('view-update-delete/<uuid:uuid>/',
             views.CreditFundRetrieveUpdateDestroyAPIView.as_view(), name='fund_view_update_delete')
    ])),
    path('fund-source-list-all/', views.CreditFundsAccordingToSourcesListAPIView.as_view(), name='fund_source_list_all'),
    path('fund-list-all/', views.CreditFundListAPIView.as_view(), name='fund_list_all')
]
