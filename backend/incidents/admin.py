from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Incident


@admin.register(Incident)
class IncidentAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "priority",
        "status",
        "assigned_to",
        "created_at",
    )

    list_filter = (
        "priority",
        "status",
    )

    search_fields = (
        "title",
        "description",
    )