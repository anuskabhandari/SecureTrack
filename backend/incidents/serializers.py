from rest_framework import serializers
from .models import Incident

class IncidentSerializer(serializers.ModelSerializer):

    vulnerability_title = serializers.CharField(
        source="vulnerability.title",
        read_only=True
    )

    reported_by_username = serializers.CharField(
        source="reported_by.username",
        read_only=True
    )

    assigned_to_username = serializers.CharField(
        source="assigned_to.username",
        read_only=True
    )

    class Meta:
        model = Incident
        fields = [
            "id",
            "title",
            "description",
            "vulnerability",
            "vulnerability_title",
            "reported_by",
            "reported_by_username",
            "assigned_to",
            "assigned_to_username",
            "priority",
            "status",
            "resolution_notes",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "reported_by",
            "reported_by_username",
            "vulnerability_title",
            "assigned_to_username",
            "created_at",
            "updated_at",
        ]