from django.shortcuts import render
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.utils import timezone

from vulnerabilities.models import Vulnerability

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
    vulnerability_id = request.data.get("vulnerability_id")

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

        if vulnerability_id:

            try:

                vulnerability = Vulnerability.objects.get(id=vulnerability_id)

                vulnerability.ai_risk_level = ai_response.get("risk_level")
                vulnerability.ai_impact = ai_response.get("impact")
                vulnerability.ai_attack_scenario = ai_response.get("attack_scenario")
                vulnerability.ai_recommended_fixes = ai_response.get("recommended_fixes")
                vulnerability.ai_priority = ai_response.get("priority")
                vulnerability.ai_analyzed_at = timezone.now()

                vulnerability.save()

            except Vulnerability.DoesNotExist:
                pass

        return Response(ai_response)

    except Exception as e:

        return Response(
            {
                "error": str(e),
                "raw": result["response"]
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(["POST"])
def chat_assistant(request):

    message = request.data.get("message")

    if not message:

        return Response(
            {
                "error": "Message is required."
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    prompt = f"""
You are SecureTrack AI Security Assistant.

You help users with cybersecurity.

Rules:
- Answer only cybersecurity-related questions.
-Answer in a clean format.
- Keep answers concise.
- Never return everything in one paragraph.
- Use bullet points whenever appropriate.
- If the question is unrelated to cybersecurity, politely explain that you only assist with cybersecurity topics.

User Question:
{message}
"""

    result = ask_groq(prompt)

    if not result["success"]:

        return Response(
            result,
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return Response(
        {
            "response": result["response"]
        }
    )