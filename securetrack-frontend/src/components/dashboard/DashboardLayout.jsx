import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({

    role,
    children

}) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="dashboard">

            <Sidebar
                role={role}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            {sidebarOpen && (

    <div
        className="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
    />

)}

            <div className="main-content">

                <Topbar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />

                <div className="content">

                    {children}

                </div>

            </div>

        </div>

    );

}