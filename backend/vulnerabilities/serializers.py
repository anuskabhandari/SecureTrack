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

    def validate(self, attrs):

        # Only validate during update
        if self.instance:

            current_status = self.instance.status
            new_status = attrs.get("status", current_status)

            allowed_transitions = {
                "Open": ["In Progress"],
                "In Progress": ["Resolved"],
                "Resolved": [],
            }

            if (
                new_status != current_status
                and new_status not in allowed_transitions[current_status]
            ):
                raise serializers.ValidationError(
                    {
                        "status": (
                            f"Cannot change status from "
                            f"'{current_status}' to '{new_status}'."
                        )
                    }
                )

        return attrs