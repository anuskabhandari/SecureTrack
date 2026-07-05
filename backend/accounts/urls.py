from django.urls import path
from .views import register, login, logout, developer_list
from . import views
urlpatterns = [
    path("api/register/", register),
    path("api/login/", login),
    path("api/logout/", logout),
   path("api/developers/",developer_list),
   path("users/", views.user_list),
   path("users/<int:pk>/", views.delete_user),
]