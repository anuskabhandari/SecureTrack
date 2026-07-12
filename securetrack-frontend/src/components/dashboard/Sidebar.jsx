import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({

    role,
    sidebarOpen,
    setSidebarOpen

}) {
    const navigate = useNavigate();

    const logout = () => {
         setSidebarOpen(false);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        navigate("/", { replace: true });

    };

    return (

        <div className={`sidebar ${sidebarOpen ? "active" : ""}`}>

            <div className="logo">

                <h3>🛡 SecureTrack</h3>

            </div>


            <ul>

                {role === "Admin" && (
                 <li>
    <Link
        to="/admin-dashboard"
        onClick={() => setSidebarOpen(false)}
    >
        🏠 Dashboard
    </Link>
</li>
                )}

                {role === "Developer" && (
                    <li>
                        <Link
    to="/developer-dashboard"
    onClick={() => setSidebarOpen(false)}
>🏠 Dashboard</Link>
                    </li>
                )}

                {role === "User" && (
                  <li>
                     <Link to="/user-dashboard"
                      onClick={() => setSidebarOpen(false)}>🏠 Dashboard</Link>
                  </li>
                )}

                {role === "Admin" && (
                   <li>
                    <Link to="/vulnerabilities"
                     onClick={() => setSidebarOpen(false)}>
                        🛡 Vulnerabilities
                    </Link>
                   </li>
                )}

                {role === "Developer" && (
                   <li>
                       <Link to="/developer/vulnerabilities"
                        onClick={() => setSidebarOpen(false)}>
                           🛠 My Assigned Vulnerabilities
                       </Link>
                   </li>
                )}
                {role === "Developer" && (
                   <li>
                      <Link to="/developer/incidents" onClick={() => setSidebarOpen(false)}>
                         🚨 My Incidents
                      </Link>
                   </li>
                )}

                {role === "User" && (
                  <li>
                      <Link to="/user/vulnerabilities" onClick={() => setSidebarOpen(false)}>
                         📄 My Reported Vulnerabilities
                      </Link>
                 </li>
                )}


                {role === "User" && (
                  <li>
                     <Link to="/user/incidents" onClick={() => setSidebarOpen(false)}>
                        🚨 My Incidents
                     </Link>
                  </li>
                )}

                {role === "Admin" && (
    <li>
        <Link to="/incidents" onClick={() => setSidebarOpen(false)}>
            🚨 Incidents
        </Link>
    </li>
)}
             <li>
    <Link to="/ai-assistant" onClick={() => setSidebarOpen(false)}>
        🤖 AI Assistant
    </Link>
</li>

                {role === "Admin" && (
                    <>
                        <li><Link to="/users"
                         onClick={() => setSidebarOpen(false)}>👥 Users</Link></li>

                    </>
                )}
               <li>
                  <Link
                    to="/settings"
                    onClick={() => setSidebarOpen(false)}
                  >
                     ⚙ Settings
                  </Link>
              </li>



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