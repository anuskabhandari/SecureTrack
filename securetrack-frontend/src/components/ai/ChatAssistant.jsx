import { useState } from "react";
import axios from "axios";

export default function ChatAssistant({ role }) {

    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const suggestions = {
        Admin: [
            "Show security best practices",
            "How to prioritize vulnerabilities?",
            "Explain OWASP Top 10"
        ],
        Developer: [
            "How do I fix SQL Injection?",
            "Explain XSS prevention",
            "How to secure Django APIs?"
        ],
        User: [
            "What is phishing?",
            "How do I create a strong password?",
            "How can I stay safe online?"
        ]
    };

    const askAI = async (question = message) => {

        if (!question.trim()) return;

        setLoading(true);

        try {

            const token = localStorage.getItem("access");

            const res = await axios.post(
                "http://127.0.0.1:8000/api/ai/chat/",
                {
                    message: question
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setResponse(res.data.response);

        } catch {

            setResponse("Unable to get AI response.");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="card shadow-sm mt-4">

            <div className="card-body">

                <h4>
                    🤖 SecureTrack AI Assistant
                </h4>

                <p className="text-muted">

                    Suggested Questions

                </p>

                <div className="mb-3">

                    {suggestions[role].map((q) => (

                        <button
                            key={q}
                            className="btn btn-outline-primary btn-sm me-2 mb-2"
                            onClick={() => {
                                setMessage(q);
                                askAI(q);
                            }}
                        >
                            {q}
                        </button>

                    ))}

                </div>

                <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Ask anything about cybersecurity..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button
                    className="btn btn-primary mt-3"
                    onClick={() => askAI()}
                    disabled={loading}
                >
                    {loading ? "Thinking..." : "Ask AI"}
                </button>

                {response && (

                    <div className="alert alert-light mt-4">

                        <strong>AI Response</strong>

                        <hr />

                        <div style={{whiteSpace:"pre-wrap"}}>

                            {response}

                        </div>

                    </div>

                )}

            </div>

        </div>

    );

}
``