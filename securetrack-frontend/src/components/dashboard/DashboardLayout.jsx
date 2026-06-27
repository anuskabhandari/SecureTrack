import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({

    role,

    children

}) {

    return (

        <div className="dashboard">

            <Sidebar role={role} />

            <div className="main-content">

                <Topbar/>

                <div className="content">

                    {children}

                </div>

            </div>

        </div>

    );

}
