from django.shortcuts import render

# Create your views here.
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from vulnerabilities.models import Vulnerability

User = get_user_model()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):

    total_users = User.objects.count()

    developers = User.objects.filter(role="Developer").count()

    users = User.objects.filter(role="User").count()

    admins = User.objects.filter(role="Admin").count()

    total_vulnerabilities = Vulnerability.objects.count()

    open_count = Vulnerability.objects.filter(
        status="Open"
    ).count()

    in_progress = Vulnerability.objects.filter(
        status="In Progress"
    ).count()

    resolved = Vulnerability.objects.filter(
        status="Resolved"
    ).count()

    critical = Vulnerability.objects.filter(
        severity="Critical"
    ).count()

    high = Vulnerability.objects.filter(
        severity="High"
    ).count()

    medium = Vulnerability.objects.filter(
        severity="Medium"
    ).count()

    low = Vulnerability.objects.filter(
        severity="Low"
    ).count()

    recent = Vulnerability.objects.order_by(
        "-created_at"
    )[:5]

    recent_data = []

    for vulnerability in recent:

        recent_data.append({

            "id": vulnerability.id,

            "title": vulnerability.title,

            "status": vulnerability.status,

        })

    return Response({

        "total_users": total_users,

        "developers": developers,

        "users": users,

        "admins": admins,

        "total_vulnerabilities": total_vulnerabilities,

        "open": open_count,

        "in_progress": in_progress,

        "resolved": resolved,

        "critical": critical,

        "high": high,

        "medium": medium,

        "low": low,

        "recent": recent_data,

    })