from django.urls import path

from .views import admin_dashboard , landing_dashboard

urlpatterns = [

    path(
        "admin/",
        admin_dashboard
    ),
path(
    "public/dashboard/",
    landing_dashboard,
),

]