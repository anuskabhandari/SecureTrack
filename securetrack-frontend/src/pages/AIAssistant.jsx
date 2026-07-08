import { useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import SuggestedQuestions from "../components/ai/SuggestedQuestions";

export default function AIAssistant() {

    const role = localStorage.getItem("role");

    const [messages, setMessages] = useState([]);

    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSuggestedQuestion = (text) => {

        setQuestion(text);

        setTimeout(() => {

          sendMessage(text);

       }, 100);

    };

    const sendMessage = async (customQuestion) => {

        const messageToSend = customQuestion || question;

    if (!question.trim()) return;

    const userMessage = {
        role: "user",
        content: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentQuestion = question;

    setQuestion("");

    setLoading(true);

    try {

        const token = localStorage.getItem("access");

        const response = await axios.post(

            "http://127.0.0.1:8000/api/ai/chat/",

            {
                message: currentQuestion,
            },

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

        );

        setMessages((prev) => [

            ...prev,

            {
                role: "assistant",
                content: response.data.response,
            },

        ]);

    } catch {

        setMessages((prev) => [

            ...prev,

            {
                role: "assistant",
                content: "Unable to get AI response.",
            },

        ]);

    } finally {

        setLoading(false);

    }

    const newChat = () => {

    setMessages([]);

    setQuestion("");

};

const clearChat = () => {

    setMessages([]);

};

};

    return (

        <DashboardLayout role={role}>

            <div className="container-fluid">

                <div className="card shadow-sm p-4">

                    <h2 className="mb-2">

                        🤖 AI Security Assistant

                    </h2>

                    <p className="text-muted">

                        Ask cybersecurity questions or choose one of the suggestions below.

                    </p>

                    <SuggestedQuestions

                        role={role}

                        onSelect={handleSuggestedQuestion}

                    />

                    <div
                        className="border rounded p-3 mb-3"
                        style={{
                            height: "420px",
                            overflowY: "auto",
                            background: "#f8f9fa"
                        }}
                    >

                        {

                            messages.length === 0 ?

                            (

                                <div className="text-center text-muted mt-5">

                                    No conversation yet.

                                </div>

                            )

                            :

                            messages.map((message, index) => (

                                <div

                                    key={index}

                                    className={`mb-3 text-${
                                        message.role === "user"
                                            ? "end"
                                            : "start"
                                    }`}

                                >

                                   <div
    className={`p-3 rounded ${
        message.role === "user"
            ? "bg-primary text-white"
            : "bg-light border"
    }`}
    style={{
        whiteSpace: "pre-wrap",
        maxWidth: "80%",
        display: "inline-block",
        textAlign: "left",
    }}
>
    {message.content}
</div>

                                </div>

                            ))

                        }

                    </div>

                    <div className="input-group mt-3">

    <button
        className="btn btn-success"
        title="New Chat"
        onClick={() => {
            setMessages([]);
            setQuestion("");
        }}
    >
        ➕
    </button>

    <button
        className="btn btn-outline-danger"
        title="Clear Chat"
        onClick={() => setMessages([])}
        disabled={messages.length === 0}
    >
        🗑
    </button>

    <input
        className="form-control"
        placeholder="Ask a cybersecurity question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
                sendMessage();
            }
        }}
    />

    <button
        className="btn btn-primary"
        onClick={sendMessage}
        disabled={loading}
    >
        {loading ? "Thinking..." : "Send"}
    </button>

</div>
                </div>

            </div>

        </DashboardLayout>

    );

}