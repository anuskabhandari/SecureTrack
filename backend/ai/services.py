# groq api logic

from groq import Groq
from django.conf import settings


def ask_groq(prompt):

    if not settings.GROQ_API_KEY:
        return {
            "success": False,
            "error": "Groq API key is not configured."
        }

    client = Groq(
        api_key=settings.GROQ_API_KEY
    )

    try:

        completion = client.chat.completions.create(

            model="llama-3.3-70b-versatile",

            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],

            temperature=0.3,

            max_tokens=800,

        )

        return {
            "success": True,
            "response": completion.choices[0].message.content,
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e),
        }