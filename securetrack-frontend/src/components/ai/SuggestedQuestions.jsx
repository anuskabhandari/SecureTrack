export default function SuggestedQuestions({ role, onSelect }) {

    let questions = [];

    if (role === "Admin") {

        questions = [

            "Summarize today's security posture.",
            "How should I prioritize vulnerabilities?",
            "Explain CVSS scoring.",
            "What vulnerabilities should be fixed first?",
            "Give security recommendations."

        ];

    }

    else if (role === "Developer") {

        questions = [

            "How do I fix SQL Injection?",
            "Explain Cross Site Scripting.",
            "How can I secure JWT authentication?",
            "Best practices for Django security.",
            "Explain CSRF protection."

        ];

    }

    else {

        questions = [

            "How do I report a vulnerability?",
            "What is phishing?",
            "How do I create a strong password?",
            "What is Multi-Factor Authentication?",
            "How do I stay safe online?"

        ];

    }

    return (

        <div className="mb-4">

            <h6 className="mb-3">

                Suggested Questions

            </h6>

            {

                questions.map((question, index) => (

                    <button

                        key={index}

                        className="btn btn-outline-primary btn-sm me-2 mb-2"

                        onClick={() => onSelect(question)}

                    >

                        {question}

                    </button>

                ))

            }

        </div>

    );

}