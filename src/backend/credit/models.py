from django.db import models
from base_user.models import BaseUserModel

# Create your models here.


class CreditFundSourceModel(models.Model):
    base_user = models.ForeignKey(BaseUserModel, on_delete=models.CASCADE, related_name='credit_fund_sources')
    source_name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    uuid = models.UUIDField(unique=True)

    def __str__(self):
        return self.source_name


class CreditFundModel(models.Model):
    base_user = models.ForeignKey(BaseUserModel, on_delete=models.CASCADE, related_name='credit_funds')
    source = models.ForeignKey(CreditFundSourceModel, on_delete=models.CASCADE, related_name='funds')
    description = models.TextField(blank=True, null=True)
    added = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    amount = models.PositiveIntegerField()
    uuid = models.UUIDField(unique=True)
    fund_added = models.DateField()

    deleted = models.BooleanField(default=False)

    def __str__(self):
        return self.source.source_name


class CreditFundSettingsModel(models.Model):
    base_user = models.OneToOneField(BaseUserModel, on_delete=models.CASCADE, related_name='fund_settings')
    is_not_locked = models.BooleanField(default=False)

    def __str__(self):
        return self.base_user.base_user.username
