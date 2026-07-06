from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    ADMIN = "Admin"
    DEVELOPER = "Developer"
    USER = "User"

    ROLE_CHOICES = [
        (ADMIN, "Admin"),
        (DEVELOPER, "Developer"),
        (USER, "User"),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default=USER,
    )
    full_name = models.CharField(
        max_length=150
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )

    def __str__(self):
        return self.username