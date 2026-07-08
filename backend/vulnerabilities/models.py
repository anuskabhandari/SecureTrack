from django.db import models
from django.conf import settings


class Vulnerability(models.Model):

    SEVERITY_CHOICES = (
        ("Critical", "Critical"),
        ("High", "High"),
        ("Medium", "Medium"),
        ("Low", "Low"),
    )

    STATUS_CHOICES = (
        ("Open", "Open"),
        ("In Progress", "In Progress"),
        ("Resolved", "Resolved"),
    )

    title = models.CharField(max_length=200)

    description = models.TextField()

    category = models.CharField(max_length=100)

    cve_id = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    affected_asset = models.CharField(max_length=200)

    severity = models.CharField(
        max_length=20,
        choices=SEVERITY_CHOICES
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Open"
    )

    reported_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reported_vulnerabilities"
    )

    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="assigned_vulnerabilities"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)
    evidence_file = models.FileField(
        upload_to="vulnerability_files/",
        blank=True,
        null=True
    )

    # ---------- AI Analysis ----------

    ai_risk_level = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )

    ai_impact = models.TextField(
        blank=True,
        null=True,
    )

    ai_attack_scenario = models.TextField(
        blank=True,
        null=True,
    )

    ai_recommended_fixes = models.JSONField(
        blank=True,
        null=True,
    )

    ai_priority = models.CharField(
        max_length=50,
        blank=True,
        null=True,
    )

    ai_analyzed_at = models.DateTimeField(
        blank=True,
        null=True,
    )

    def __str__(self):
        return self.title