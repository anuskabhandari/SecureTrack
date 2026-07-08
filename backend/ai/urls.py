from django.urls import path

from .views import test_ai, analyze_vulnerability , chat_assistant


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
   path("chat/", chat_assistant),

]