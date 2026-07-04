import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";
import DashboardChart from "../components/dashboard/DashboardChart";

import "../styles/dashboard.css";

export default function AdminDashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(

                "http://127.0.0.1:8000/api/dashboard/admin/",

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

            );

            setDashboard(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    if (!dashboard) {

        return (

            <DashboardLayout role="Admin">

                <div className="text-center mt-5">

                    <div className="spinner-border text-primary"></div>

                </div>

            </DashboardLayout>

        );

    }

    return (

        <DashboardLayout role="Admin">

            <div className="cards">

                <StatCard
                    title="Total Users"
                    value={dashboard.total_users}
                    color="#2563eb"
                />

                <StatCard
                    title="Vulnerabilities"
                    value={dashboard.total_vulnerabilities}
                    color="#ef4444"
                />

                <StatCard
                    title="Open"
                    value={dashboard.open}
                    color="#f59e0b"
                />

                <StatCard
                    title="Resolved"
                    value={dashboard.resolved}
                    color="#10b981"
                />

            </div>

            <DashboardChart dashboard={dashboard} />

            <div className="table-card">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h3>Recent Vulnerabilities</h3>

                    <button
                        className="btn btn-primary"
                        onClick={() => navigate("/vulnerabilities")}
                    >

                        Manage Vulnerabilities

                    </button>

                </div>

                <table className="table table-hover">

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Title</th>

                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            dashboard.recent.map((item) => (

                                <tr key={item.id}>

                                    <td>#{item.id}</td>

                                    <td>{item.title}</td>

                                    <td>{item.status}</td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </DashboardLayout>

    );

}