import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import "../styles/dashboard.css";

export default function UserDashboard() {

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
              `${import.meta.env.VITE_API_URL}/api/vulnerabilities/`,
      {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
              }
              );

            setVulnerabilities(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const totalReports = vulnerabilities.length;

    const openCount = vulnerabilities.filter(
        v => v.status === "Open"
    ).length;

    const progressCount = vulnerabilities.filter(
        v => v.status === "In Progress"
    ).length;

    const resolvedCount = vulnerabilities.filter(
        v => v.status === "Resolved"
    ).length;

    const criticalCount = vulnerabilities.filter(
        v => v.severity === "Critical"
    ).length;

    const health =
        totalReports === 0
            ? 100
            : Math.round((resolvedCount / totalReports) * 100);

    return (

        <DashboardLayout role="User">

            <div className="container-fluid">

                {/* Header */}

                <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            User Dashboard
                        </h2>

                        <p className="text-muted mb-0">
                            Welcome back! Monitor and manage your reported vulnerabilities.
                        </p>

                    </div>

                    <div className="mt-3 mt-md-0">

                        <Link
                            to="/user/vulnerabilities"
                            className="btn btn-primary px-4"
                        >
                            🛡 Report Vulnerability
                        </Link>

                    </div>

                </div>

                {/* Statistics */}

                <div className="row g-4 mb-4">

                    <div className="col-md-3">

                        <div className="card shadow-sm border-0 text-center">

                            <div className="card-body">

                                <h2 className="fw-bold text-primary">
                                    {totalReports}
                                </h2>

                                <p className="text-muted mb-0">
                                    Total Reports
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow-sm border-0 text-center">

                            <div className="card-body">

                                <h2 className="fw-bold text-warning">
                                    {openCount}
                                </h2>

                                <p className="text-muted mb-0">
                                    Open
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow-sm border-0 text-center">

                            <div className="card-body">

                                <h2 className="fw-bold text-info">
                                    {progressCount}
                                </h2>

                                <p className="text-muted mb-0">
                                    In Progress
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow-sm border-0 text-center">

                            <div className="card-body">

                                <h2 className="fw-bold text-success">
                                    {resolvedCount}
                                </h2>

                                <p className="text-muted mb-0">
                                    Resolved
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Security Health */}

                <div className="card shadow-sm border-0 mb-4">

                    <div className="card-body">

                        <h4 className="fw-bold mb-3">

                            Security Health

                        </h4>

                        <div className="d-flex justify-content-between">

                            <span>Overall Resolution Progress</span>

                            <strong>{health}%</strong>

                        </div>

                        <div
                            className="progress mt-2 mb-4"
                            style={{ height: "10px" }}
                        >

                            <div
                                className="progress-bar bg-success"
                                style={{
                                    width: `${health}%`
                                }}
                            />

                        </div>

                        <div className="row text-center">

                            <div className="col-md-4">

                                <h3 className="text-danger fw-bold">

                                    {criticalCount}

                                </h3>

                                <p className="text-muted mb-0">

                                    Critical Issues

                                </p>

                            </div>

                            <div className="col-md-4">

                                <h3 className="text-warning fw-bold">

                                    {openCount}

                                </h3>

                                <p className="text-muted mb-0">

                                    Awaiting Review

                                </p>

                            </div>

                            <div className="col-md-4">

                                <h3 className="text-success fw-bold">

                                    {resolvedCount}

                                </h3>

                                <p className="text-muted mb-0">

                                    Successfully Resolved

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Call To Action */}

                <div className="card shadow-sm border-0">

                    <div className="card-body text-center py-5">

                        <div
                            style={{
                                fontSize: "55px"
                            }}
                        >
                            🛡
                        </div>

                        <h3 className="fw-bold mt-3">

                            Found a Security Vulnerability?

                        </h3>

                        <p
                            className="text-muted mx-auto mt-3"
                            style={{
                                maxWidth: "650px"
                            }}
                        >
                            If you discover a security issue, report it immediately.
                            Our security team will review your submission, assign it
                            to the appropriate developer, and keep you updated on its
                            resolution status.
                        </p>

                        <Link
                            to="/user/vulnerabilities"
                            className="btn btn-primary btn-lg px-5 mt-3"
                        >
                            🛡 Report New Vulnerability
                        </Link>

                    </div>

                </div>

            </div>

        </DashboardLayout>

    );

}