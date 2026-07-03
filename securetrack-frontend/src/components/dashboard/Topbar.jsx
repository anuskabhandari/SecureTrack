import { useEffect, useState } from "react";

export default function Topbar() {

    const username = localStorage.getItem("username") || "User";
    const role = localStorage.getItem("role") || "User";

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") === "true"
    );

    useEffect(() => {

        if (darkMode) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }

    }, [darkMode]);

    const toggleDarkMode = () => {

        const newMode = !darkMode;

        setDarkMode(newMode);

        localStorage.setItem("darkMode", newMode);

    };

    const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (

        <div className="topbar">

            <div>

                <h2>
                    Welcome back, {username} 👋
                </h2>

                <small>
                    {role} • {date}
                </small>

            </div>

            <div className="top-right">



                <button
                    className="theme-btn"
                    onClick={toggleDarkMode}
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>

                <button className="notification">

                    🔔

                </button>

                <div className="user">

                    <div className="avatar">

                        {username.charAt(0).toUpperCase()}

                    </div>

                    <div>

                        <strong>{username}</strong>

                        <br />

                        <small>{role}</small>

                    </div>

                </div>

            </div>

        </div>

    );

}