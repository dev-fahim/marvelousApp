from django.contrib import admin
from expenditure.models import ExpenditureRecordModel, ExpenditureHeadingModel
# Register your models here.

admin.site.register(ExpenditureHeadingModel)
admin.site.register(ExpenditureRecordModel)
