import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ role }) {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/login");

    };

    return (

        <div className="sidebar">

            <div className="logo">

                <h3>🛡 SecureTrack</h3>

            </div>

            <ul>

                <li><Link to="#">🏠 Dashboard</Link></li>

                <li><Link to="/vulnerabilities">🛡 Vulnerabilities</Link></li>

                <li><Link to="#">🚨 Incidents</Link></li>

                {role === "Admin" && (
                    <>
                        <li><Link to="#">👥 Users</Link></li>
                        <li><Link to="#">📊 Analytics</Link></li>
                        <li><Link to="#">📄 Reports</Link></li>
                        <li><Link to="#">⚙ Settings</Link></li>
                    </>
                )}

                {role === "Developer" && (
                    <>
                        <li><Link to="#">📋 My Tasks</Link></li>
                        <li><Link to="#">✅ Assigned Issues</Link></li>
                    </>
                )}

                {role === "User" && (
                    <>
                        <li><Link to="#">➕ Report Issue</Link></li>
                        <li><Link to="#">📑 My Reports</Link></li>
                    </>
                )}

            </ul>

            <button
                className="logout-btn"
                onClick={logout}
            >
                🚪 Logout
            </button>

        </div>

    );

}