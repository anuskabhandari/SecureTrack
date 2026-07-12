import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
export default function Topbar({

    sidebarOpen,
    setSidebarOpen

})  {

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
            <button
              className="menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            <div>

                <h2>
                    Welcome back, {username}
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




               <div className="user">

    <div className="avatar">
        <FaUserCircle size={26} />
    </div>

    <div className="user-info">
        <strong>{username}</strong>
        <small>{role}</small>
    </div>

</div>
            </div>

        </div>

    );

}