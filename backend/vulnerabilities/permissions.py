from rest_framework.permissions import BasePermission


class IsAdminOrAssignedDeveloper(BasePermission):
    """
    Admin:
        - Can retrieve, update and delete every vulnerability.

    Developer:
        - Can retrieve and update only vulnerabilities assigned to them.

    User:
        - Can retrieve only vulnerabilities they reported.
        - Cannot update or delete.
    """

    def has_object_permission(self, request, view, obj):

        user = request.user

        # Admin
        if user.is_superuser or user.role == "Admin":
            return True

        # Safe methods (GET)
        if request.method in ["GET", "HEAD", "OPTIONS"]:

            if user.role == "Developer":
                return obj.assigned_to == user

            return obj.reported_by == user

        # Update
        if request.method in ["PUT", "PATCH"]:

            if user.role == "Developer":
                return obj.assigned_to == user

            return False

        # Delete
        if request.method == "DELETE":

            return False

        return False