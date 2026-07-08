
# Create your views here.
from rest_framework import generics
from .models import Vulnerability
from .serializers import VulnerabilitySerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrAssignedDeveloper
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import FileResponse, Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
    JSONParser,
)
class VulnerabilityListCreateView(generics.ListCreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = VulnerabilitySerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):

        user = self.request.user

        if user.is_superuser or user.role == "Admin":
            return Vulnerability.objects.all()

        elif user.role == "Developer":
            return Vulnerability.objects.filter(
                assigned_to=user
            )

        return Vulnerability.objects.filter(
            reported_by=user
        )

    def perform_create(self, serializer):

        user = self.request.user

        if user.role == "User":

            serializer.save(
                reported_by=user,
                assigned_to=None,
                status="Open"
            )

        else:

            serializer.save(
                reported_by=user
            )

class VulnerabilityDetailView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminOrAssignedDeveloper,
    ]

    parser_classes = [MultiPartParser, FormParser, JSONParser]
    queryset = Vulnerability.objects.all()
    serializer_class = VulnerabilitySerializer


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def download_evidence(request, pk):

    try:

        vulnerability = Vulnerability.objects.get(pk=pk)

        if not vulnerability.evidence_file:
            raise Http404("No evidence file found.")

        return FileResponse(
            vulnerability.evidence_file.open("rb"),
            as_attachment=True,
            filename=vulnerability.evidence_file.name.split("/")[-1],
        )

    except Vulnerability.DoesNotExist:
        raise Http404("Vulnerability not found.")