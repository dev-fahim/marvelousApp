from django.urls import path, include
from expenditure.api import views

app_name = 'expenditure_app'

urlpatterns = [
    path('heading/', include([
        path('list-add/', views.ExpenditureHeadingListCreateAPIView.as_view(), name='heading_list_add'),
        path('view-update-delete/<uuid:uuid>/',
             views.ExpenditureHeadingRetrieveUpdateDestroyAPIView.as_view(), name='heading_view_update_delete')
    ])),
    path('record/', include([
        path('list-add/', views.ExpenditureRecordListCreateAPIView.as_view(), name='record_list_add'),
        path('view-update-delete/<uuid:uuid>',
             views.ExpenditureRecordRetrieveUpdateDestroyAPIView.as_view(), name='record_view_update_delete'),
        path('checkout-today/', views.ExpenditureCheckoutToday.as_view(), name='checkout_today'),
        path('mail-csv/', views.ExpenditureRecordEmailCSV.as_view()),
        path('pdf/', views.ExpenditureRenderPDF.as_view())
    ])),
]
