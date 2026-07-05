from .models import User
from django.contrib.auth import authenticate

from django.contrib.auth import logout as django_logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view
from rest_framework.response import Response

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer, DeveloperSerializer, UserSerializer
@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        User.objects.create_user(
            username=serializer.validated_data['username'],
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password'],
            role=serializer.validated_data['role']
        )

        return Response({
            "message": "User registered successfully"
        })

    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):

    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )

    if user:
        refresh = RefreshToken.for_user(user)

        role = "Admin" if user.is_superuser else user.role

        return Response({

            "access": str(refresh.access_token),

            "refresh": str(refresh),

            "role": role,

            "username": user.username,

            "message": "Login successful"

        })

    return Response({
        "message": "Invalid credentials"
    }, status=400)


@api_view(['POST'])
def logout(request):

    django_logout(request)

    return Response({
        "message": "Logout successful"
    })

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def developer_list(request):

    developers = User.objects.filter(role="Developer")

    serializer = DeveloperSerializer(
        developers,
        many=True
    )

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_list(request):

    if request.user.role != "Admin" and not request.user.is_superuser:
        return Response(
            {"message": "Permission denied"},
            status=403
        )

    users = User.objects.exclude(role="Admin").filter(is_superuser=False).order_by("username")

    serializer = UserSerializer(users, many=True)

    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request, pk):

    if request.user.role != "Admin" and not request.user.is_superuser:
        return Response(
            {"message": "Permission denied"},
            status=403
        )

    try:

        user = User.objects.get(pk=pk)

    except User.DoesNotExist:

        return Response(
            {"message": "User not found"},
            status=404
        )

    if user == request.user:

        return Response(
            {"message": "You cannot delete your own account."},
            status=400
        )

    user.delete()

    return Response({
        "message": "User deleted successfully"
    })