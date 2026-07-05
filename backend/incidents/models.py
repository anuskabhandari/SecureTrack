from django.db import models

# Create your models here.
from django.db import models
from accounts.models import User
from vulnerabilities.models import Vulnerability


class Incident(models.Model):

    PRIORITY_CHOICES = [
        ("Critical", "Critical"),
        ("High", "High"),
        ("Medium", "Medium"),
        ("Low", "Low"),
    ]

    STATUS_CHOICES = [
        ("Open", "Open"),
        ("Investigating", "Investigating"),
        ("Mitigated", "Mitigated"),
        ("Resolved", "Resolved"),
        ("Closed", "Closed"),
    ]

    title = models.CharField(max_length=255)

    description = models.TextField()

    vulnerability = models.ForeignKey(
        Vulnerability,
        on_delete=models.CASCADE,
        related_name="incidents"
    )

    reported_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reported_incidents"
    )

    assigned_to = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_incidents"
    )

    priority = models.CharField(
        max_length=20,
        choices=PRIORITY_CHOICES,
        default="Medium"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Open"
    )

    resolution_notes = models.TextField(
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title