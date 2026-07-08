from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from accounts.models import User
from .serializers import ProfileSerializer
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from rest_framework.response import Response
from rest_framework import status


class ProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):

        return self.request.user

class ChangePasswordView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        confirm_password = request.data.get("confirm_password")

        if not check_password(current_password, request.user.password):

            return Response(
                {
                    "error": "Current password is incorrect."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if new_password != confirm_password:

            return Response(
                {
                    "error": "Passwords do not match."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        request.user.set_password(new_password)

        request.user.save()

        return Response({

            "message": "Password changed successfully."

        })