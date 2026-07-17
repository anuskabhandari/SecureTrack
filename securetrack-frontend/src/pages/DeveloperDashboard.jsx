import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import "../styles/dashboard.css";

export default function DeveloperDashboard() {

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

    const totalAssigned = vulnerabilities.length;

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

    const highCount = vulnerabilities.filter(
        v => v.severity === "High"
    ).length;

    const mediumCount = vulnerabilities.filter(
        v => v.severity === "Medium"
    ).length;

    const lowCount = vulnerabilities.filter(
        v => v.severity === "Low"
    ).length;

    const completion =
        totalAssigned === 0
            ? 0
            : Math.round((resolvedCount / totalAssigned) * 100);

    return (

        <DashboardLayout role="Developer">

            <div className="container-fluid">

                {/* Welcome */}

                <div className="card shadow-sm mb-4">

                    <div className="card-body">

                        <h2>
                            👨‍💻 Welcome Back, {localStorage.getItem("username")}
                        </h2>

                        <p className="text-muted mb-0">
                            Monitor your assigned vulnerabilities and keep remediation on track.
                        </p>

                    </div>

                </div>

                {/* Loading */}

                {

                    loading ?

                        <div className="text-center p-5">

                            Loading Dashboard...

                        </div>

                        :

                        <>

                            {/* Statistics */}

                            <div className="row g-4 mb-4">

                                <div className="col-md-3">

                                    <div className="card shadow-sm text-center">

                                        <div className="card-body">

                                            <h2>{totalAssigned}</h2>

                                            <p className="text-muted mb-0">
                                                Assigned
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="card shadow-sm border-warning text-center">

                                        <div className="card-body">

                                            <h2>{openCount}</h2>

                                            <p className="text-muted mb-0">
                                                Open
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="card shadow-sm border-primary text-center">

                                        <div className="card-body">

                                            <h2>{progressCount}</h2>

                                            <p className="text-muted mb-0">
                                                In Progress
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-md-3">

                                    <div className="card shadow-sm border-success text-center">

                                        <div className="card-body">

                                            <h2>{resolvedCount}</h2>

                                            <p className="text-muted mb-0">
                                                Resolved
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Progress + Severity */}

                            <div className="row g-4 mb-4">

                                <div className="col-lg-6">

                                    <div className="card shadow-sm h-100">

                                        <div className="card-body">

                                            <h4 className="mb-4">
                                                📈 Progress Overview
                                            </h4>

                                            <div className="progress mb-3" style={{ height: "28px" }}>

                                                <div
                                                    className="progress-bar bg-success"
                                                    style={{
                                                        width: `${completion}%`
                                                    }}
                                                >

                                                    {completion}%

                                                </div>

                                            </div>

                                            <div className="row text-center mt-4">

                                                <div className="col">

                                                    <h5>{openCount}</h5>

                                                    <small className="text-muted">
                                                        Open
                                                    </small>

                                                </div>

                                                <div className="col">

                                                    <h5>{progressCount}</h5>

                                                    <small className="text-muted">
                                                        In Progress
                                                    </small>

                                                </div>

                                                <div className="col">

                                                    <h5>{resolvedCount}</h5>

                                                    <small className="text-muted">
                                                        Resolved
                                                    </small>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="col-lg-6">

                                    <div className="card shadow-sm h-100">

                                        <div className="card-body">

                                            <h4 className="mb-4">
                                                🔥 Severity Overview
                                            </h4>

                                            <div className="d-flex justify-content-between mb-3">

                                                <span>Critical</span>

                                                <span className="badge bg-danger">
                                                    {criticalCount}
                                                </span>

                                            </div>

                                            <div className="d-flex justify-content-between mb-3">

                                                <span>High</span>

                                                <span className="badge bg-warning text-dark">
                                                    {highCount}
                                                </span>

                                            </div>

                                            <div className="d-flex justify-content-between mb-3">

                                                <span>Medium</span>

                                                <span className="badge bg-primary">
                                                    {mediumCount}
                                                </span>

                                            </div>

                                            <div className="d-flex justify-content-between">

                                                <span>Low</span>

                                                <span className="badge bg-success">
                                                    {lowCount}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Quick Actions */}

                            <div className="card shadow-sm">

                                <div className="card-body">

                                    <h4 className="mb-4">

                                        ⚡ Quick Actions

                                    </h4>

                                    <div className="row">

                                        <div className="col-md-6">

                                            <Link
                                                to="/developer/vulnerabilities"
                                                className="btn btn-primary w-100"
                                            >

                                                🛡 My Assigned Vulnerabilities

                                            </Link>

                                        </div>

                                        <div className="col-md-6">

                                            <Link
                                                to="/developer/vulnerabilities"
                                                className="btn btn-success w-100"
                                            >

                                                ✅ Update Vulnerability Status

                                            </Link>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </>

                }

            </div>

        </DashboardLayout>

    );

}