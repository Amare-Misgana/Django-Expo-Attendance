from django.db import models
from django.contrib.auth.models import User
from datetime import datetime, timedelta


class VerifyEmail(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        if self.pk:
            return datetime.now() - self.created_at > timedelta(minutes=1)
