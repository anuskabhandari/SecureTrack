# groq api logic
from groq import Groq

from django.conf import settings


client = Groq(

    api_key=settings.GROQ_API_KEY

)


def ask_groq(prompt):

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