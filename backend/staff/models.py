from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import secrets
from django.core.exceptions import ValidationError


class PermissionVerify(models.Model):
    admin = models.OneToOneField(
        User, on_delete=models.CASCADE, limit_choices_to={"is_staff": False}
    )
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        if self.pk:
            return timezone.now() > self.created_at + timedelta(minutes=5)

    def clean(self):
        if self.admin and not self.admin.is_staff:
            raise ValidationError("The user must be a staff/admin user.")

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.code = secrets.randbelow(900000) + 100000
        self.full_clean()

        super().save(*args, **kwargs)
