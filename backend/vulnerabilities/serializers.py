from rest_framework import serializers
from .models import Vulnerability


class VulnerabilitySerializer(serializers.ModelSerializer):

    class Meta:
        model = Vulnerability
        fields = "__all__"

        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )