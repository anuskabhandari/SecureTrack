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

                {role === "Admin" && (
                  <li>
                    <Link to="/admin-dashboard">🏠 Dashboard</Link>
                  </li>
                )}

                {role === "Developer" && (
                    <li>
                        <Link to="/developer-dashboard">🏠 Dashboard</Link>
                    </li>
                )}

                {role === "User" && (
                  <li>
                     <Link to="/user-dashboard">🏠 Dashboard</Link>
                  </li>
                )}

                {role === "Admin" && (
                   <li>
                    <Link to="/vulnerabilities">
                        🛡 Vulnerabilities
                    </Link>
                   </li>
                )}

                {role === "Developer" && (
                   <li>
                       <Link to="/developer/vulnerabilities">
                           🛠 My Assigned Vulnerabilities
                       </Link>
                   </li>
                )}
                {role === "Developer" && (
                   <li>
                      <Link to="/developer/incidents">
                         🚨 My Incidents
                      </Link>
                   </li>
                )}

                {role === "User" && (
                  <li>
                      <Link to="/user/vulnerabilities">
                         📄 My Reported Vulnerabilities
                      </Link>
                 </li>
                )}


                {role === "User" && (
                  <li>
                     <Link to="/user/incidents">
                        🚨 My Incidents
                     </Link>
                  </li>
                )}

                {role === "Admin" && (
    <li>
        <Link to="/incidents">
            🚨 Incidents
        </Link>
    </li>
)}

                {role === "Admin" && (
                    <>
                        <li><Link to="/users">👥 Users</Link></li>
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
                        <li>
                            <Link to="#">➕ Report Issue</Link></li>
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