from django.urls import path

from .views import test_ai, analyze_vulnerability


urlpatterns = [

    path(

        "test/",

        test_ai,

        name="test_ai",

    ),
    path(
        "analyze-vulnerability/",
        analyze_vulnerability,
    ),

]