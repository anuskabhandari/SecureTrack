from django.shortcuts import render

# Create your views here.
import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .services import ask_groq


@api_view(["GET"])
def test_ai(request):

    result = ask_groq(

        "Reply with exactly: Groq AI Connected Successfully."

    )

    return Response(result)

@api_view(["POST"])
def analyze_vulnerability(request):

    title = request.data.get("title")
    description = request.data.get("description")

    if not title or not description:

        return Response(

            {
                "error": "Title and description are required."
            },

            status=status.HTTP_400_BAD_REQUEST

        )

    prompt = f"""
You are a cybersecurity expert.

Analyze the following vulnerability.

Title:
{title}

Description:
{description}

Return ONLY valid JSON in exactly this format.

{{
  "risk_level": "",
  "impact": "",
  "attack_scenario": "",
  "recommended_fixes": [
    "",
    "",
    ""
  ],
  "priority": ""
}}

Do not include markdown.
Do not include explanations.
Return JSON only.
"""

    result = ask_groq(prompt)

    if not result["success"]:

        return Response(

            result,

            status=status.HTTP_500_INTERNAL_SERVER_ERROR

        )

    try:

        response_text = result["response"].strip()

        response_text = response_text.replace("```json", "")
        response_text = response_text.replace("```", "")
        response_text = response_text.strip()

        ai_response = json.loads(response_text)

        return Response(ai_response)

    except Exception as e:

        return Response(
            {
                "error": str(e),
                "raw": result["response"]
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )