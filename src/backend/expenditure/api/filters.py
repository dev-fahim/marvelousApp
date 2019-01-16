from django_filters import rest_framework as filters
from expenditure.models import ExpenditureRecordModel


class ExpenditureRecordFilter(filters.FilterSet):
    max_amount = filters.NumberFilter(field_name='amount', lookup_expr='lte')
    min_amount = filters.NumberFilter(field_name='amount', lookup_expr='gte')

    class Meta:
        model = ExpenditureRecordModel
        fields = ('is_verified', 'amount', 'max_amount', 'min_amount')