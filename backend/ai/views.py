from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import ask_groq


@api_view(["GET"])
def test_ai(request):

    result = ask_groq(

        "Reply with exactly: Groq AI Connected Successfully."

    )

    return Response(result)