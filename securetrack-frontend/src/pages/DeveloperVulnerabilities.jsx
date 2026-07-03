import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import VulnerabilityTable from "../components/vulnerability/VulnerabilityTable";
import UpdateStatusModal from "../components/vulnerability/UpdateStatusModal";

export default function DeveloperVulnerabilities() {

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedVulnerability, setSelectedVulnerability] = useState(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [severityFilter, setSeverityFilter] = useState("");


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
    const filteredVulnerabilities = vulnerabilities.filter((v) => {

    const matchesSearch =
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.category.toLowerCase().includes(search.toLowerCase()) ||
        v.affected_asset.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
        statusFilter === "" || v.status === statusFilter;

    const matchesSeverity =
        severityFilter === "" || v.severity === severityFilter;

    return (
        matchesSearch &&
        matchesStatus &&
        matchesSeverity
    );

});

    return (

        <DashboardLayout role="Developer">

            <h2>My Assigned Vulnerabilities</h2>

            <div className="card p-4">

                <div className="row mb-4">

    <div className="col-md-6">

        <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by title, category or asset..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

    </div>

    <div className="col-md-3">

        <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
        >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
        </select>

    </div>

    <div className="col-md-3">

        <select
            className="form-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
        >
            <option value="">All Severity</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
        </select>

    </div>

</div>

                {

                    loading ?

                        <div className="text-center">
                            Loading...
                        </div>

                        :

                        <VulnerabilityTable
                            vulnerabilities={filteredVulnerabilities}
                            onUpdateStatus={(v) => {

                                setSelectedVulnerability(v);
                                setShowStatusModal(true);

                            }}
                        />

                }

            </div>

            {

                showStatusModal &&

                <UpdateStatusModal

                    vulnerability={selectedVulnerability}

                    onClose={() => setShowStatusModal(false)}

                    onSuccess={() => {

                        setShowStatusModal(false);

                        loadVulnerabilities();

                    }}

                />

            }

        </DashboardLayout>

    );

}