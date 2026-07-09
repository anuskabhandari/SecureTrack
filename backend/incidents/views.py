from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Incident
from .serializers import IncidentSerializer


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def incident_list(request):

    # Admin can see all incidents
    if request.user.role == "Admin":

        incidents = Incident.objects.all().order_by("-created_at")

    elif request.user.role == "Developer":

        incidents = Incident.objects.filter(
            assigned_to=request.user
        ).order_by("-created_at")

    else:

        incidents = Incident.objects.filter(
            vulnerability__reported_by=request.user
        ).order_by("-created_at")

    if request.method == "GET":

        serializer = IncidentSerializer(
            incidents,
            many=True
        )

        return Response(serializer.data)

    # Only Admin can create incidents
    if request.user.role != "Admin":

        return Response(
            {"message": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    serializer = IncidentSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            reported_by=request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def incident_detail(request, pk):

    try:

        incident = Incident.objects.get(pk=pk)

    except Incident.DoesNotExist:

        return Response(
            {"message": "Incident not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    # Admin has full access
    if not request.user.is_superuser:

        # Developer can only access assigned incidents
        if request.user.role == "Developer":

            if incident.assigned_to != request.user:

                return Response(
                    {"message": "Permission denied"},
                    status=status.HTTP_403_FORBIDDEN
                )

        # User can only access their own incidents
        else:

            if incident.vulnerability.reported_by != request.user:

                return Response(
                    {"message": "Permission denied"},
                    status=status.HTTP_403_FORBIDDEN
                )

    if request.method == "GET":

        if request.user.role == "Admin":

            incidents = Incident.objects.all()

        elif request.user.role == "Developer":

            incidents = Incident.objects.filter(
                assigned_to=request.user
            )

        else:

            incidents = Incident.objects.filter(
                vulnerability__reported_by=request.user
            )

        serializer = IncidentSerializer(
            incidents.order_by("-created_at"),
            many=True
        )

        return Response(serializer.data)

    if request.method == "PUT":

        serializer = IncidentSerializer(
            incident,
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    # Only Admin can delete
    if not request.user.is_superuser:

        return Response(
            {"message": "Permission denied"},
            status=status.HTTP_403_FORBIDDEN
        )

    incident.delete()

    return Response({
        "message": "Incident deleted successfully."
    })