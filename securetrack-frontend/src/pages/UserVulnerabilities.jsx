import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import VulnerabilityTable from "../components/vulnerability/VulnerabilityTable";

export default function UserVulnerabilities() {

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadVulnerabilities();

    }, []);

    const loadVulnerabilities = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/api/vulnerabilities/",
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

    return (

        <DashboardLayout role="User">

            <h2>My Reported Vulnerabilities</h2>

            <div className="card p-4">

                {

                    loading ?

                        <div className="text-center">

                            Loading...

                        </div>

                        :

                        <VulnerabilityTable
                            vulnerabilities={vulnerabilities}
                        />

                }

            </div>

        </DashboardLayout>

    );

}