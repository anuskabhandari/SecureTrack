from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import logout as django_logout

@api_view(['POST'])
def register(request):
    User.objects.create_user(
        username=request.data['username'],
        email=request.data['email'],
        password=request.data['password']
    )
    return Response({"message": "User registered"})

from django.contrib.auth import authenticate

@api_view(['POST'])
def login(request):
    user = authenticate(
        username=request.data['username'],
        password=request.data['password']
    )

    if user:
        return Response({"message": "Login success"})
    return Response({"message": "Invalid credentials"})


@api_view(['POST'])
def logout(request):
    django_logout(request)
    return Response({"message": "Logout successful"})