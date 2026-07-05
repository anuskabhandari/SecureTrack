from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Incident
from .serializers import IncidentSerializer


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def incident_list(request):

    if request.method == "GET":

        incidents = Incident.objects.all().order_by("-created_at")

        serializer = IncidentSerializer(
            incidents,
            many=True
        )

        return Response(serializer.data)

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
            status=404
        )

    if request.method == "GET":

        serializer = IncidentSerializer(incident)

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
            status=400
        )

    incident.delete()

    return Response(
        {"message": "Incident deleted successfully"}
    )