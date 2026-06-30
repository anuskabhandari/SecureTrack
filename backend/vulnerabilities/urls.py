from django.urls import path
from .views import (
    VulnerabilityListCreateView,
    VulnerabilityDetailView,
)

urlpatterns = [

    path(
        "",
        VulnerabilityListCreateView.as_view(),
        name="vulnerability-list",
    ),

    path(
        "<int:pk>/",
        VulnerabilityDetailView.as_view(),
        name="vulnerability-detail",
    ),

]