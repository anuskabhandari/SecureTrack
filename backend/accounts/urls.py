from django.urls import path
from .views import register, login, logout

urlpatterns = [
    path("api/register/", register),
    path("api/login/", login),
    path("api/logout/", logout),
]