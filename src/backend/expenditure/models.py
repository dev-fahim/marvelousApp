from django.db import models
from base_user.models import BaseUserModel
from django.contrib.auth import get_user_model
User = get_user_model()
# Create your models here.


class ExpenditureHeadingModel(models.Model):
    base_user = models.ForeignKey(BaseUserModel, on_delete=models.DO_NOTHING, related_name='expenditure_headings')
    heading_name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    uuid = models.UUIDField(unique=True)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.heading_name


class ExpenditureRecordModel(models.Model):
    added_by = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='expenditure_records')
    base_user = models.ForeignKey(BaseUserModel, on_delete=models.DO_NOTHING, related_name='all_expenditure_records')
    expend_heading = models.ForeignKey(ExpenditureHeadingModel, on_delete=models.DO_NOTHING, related_name='all_records')

    expend_by = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    amount = models.IntegerField()
    is_verified = models.BooleanField(default=False)
    expend_time = models.DateTimeField()

    uuid = models.UUIDField(unique=True)

    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.added_by.username
