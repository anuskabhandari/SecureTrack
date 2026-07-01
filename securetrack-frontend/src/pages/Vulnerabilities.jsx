import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import VulnerabilityTable from "../components/vulnerability/VulnerabilityTable";
import { getVulnerabilities } from "../services/vulnerabilityService";

import "../styles/vulnerability.css";

export default function Vulnerabilities() {

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadVulnerabilities();

    }, []);

    const loadVulnerabilities = async () => {

        try {

            const response = await getVulnerabilities();

            setVulnerabilities(response.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <DashboardLayout role="Admin">

            <div className="vulnerability-header">

                <div>

                    <h2>Vulnerability Management</h2>

                    <p>
                        Manage and monitor security vulnerabilities
                    </p>

                </div>

                <Link
                    to="/add-vulnerability"
                    className="btn btn-primary"
                >
                    + Add Vulnerability
                </Link>

            </div>

            {

                loading ?

                    <div className="text-center mt-5">

                        <div
                            className="spinner-border text-primary"
                        />

                    </div>

                    :

                    <VulnerabilityTable
                        vulnerabilities={vulnerabilities}
                    />

            }

        </DashboardLayout>

    );

}