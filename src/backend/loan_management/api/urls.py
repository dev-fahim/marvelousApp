from django.urls import path
from loan_management.api import views as loan_views

urlpatterns = [
    path('credit/list-add/', loan_views.LoanCreditListCreateAPIView.as_view()),
    path('expend/list-add/', loan_views.LoanExpenditureListCreateAPIView.as_view()),
]
