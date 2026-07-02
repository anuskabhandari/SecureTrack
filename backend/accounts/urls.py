from django.urls import path
from .views import register, login, logout, developer_list

urlpatterns = [
    path("api/register/", register),
    path("api/login/", login),
    path("api/logout/", logout),
   path("api/developers/",developer_list),
]