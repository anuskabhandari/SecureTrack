from django.urls import path
from .views import (
    VulnerabilityListCreateView,
    VulnerabilityDetailView,download_evidence,
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
    path("<int:pk>/download/", download_evidence),

]