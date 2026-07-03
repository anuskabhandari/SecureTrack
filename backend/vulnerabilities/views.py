
# Create your views here.
from rest_framework import generics
from .models import Vulnerability
from .serializers import VulnerabilitySerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsAdminOrAssignedDeveloper

class VulnerabilityListCreateView(generics.ListCreateAPIView):

    permission_classes = [IsAuthenticated]
    serializer_class = VulnerabilitySerializer

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

    queryset = Vulnerability.objects.all()
    serializer_class = VulnerabilitySerializer