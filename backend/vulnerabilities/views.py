
# Create your views here.
from rest_framework import generics
from .models import Vulnerability
from .serializers import VulnerabilitySerializer
from rest_framework.permissions import IsAuthenticated


class VulnerabilityListCreateView(generics.ListCreateAPIView):

    permission_classes = [IsAuthenticated]

    queryset = Vulnerability.objects.all()
    serializer_class = VulnerabilitySerializer


class VulnerabilityDetailView(generics.RetrieveUpdateDestroyAPIView):

    permission_classes = [IsAuthenticated]

    queryset = Vulnerability.objects.all()
    serializer_class = VulnerabilitySerializer