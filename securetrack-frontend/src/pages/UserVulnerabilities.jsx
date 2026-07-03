import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/vulnerability.css";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import VulnerabilityTable from "../components/vulnerability/VulnerabilityTable";
import VulnerabilityForm from "../components/vulnerability/VulnerabilityForm";
export default function UserVulnerabilities() {

    const [vulnerabilities, setVulnerabilities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
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

        <DashboardLayout role="User">

            <div className="page-header">

                <div>

                   <h2>My Reported Vulnerabilities</h2>

                    <p>
                      Track the progress of your reported security issues.
                    </p>

            </div>

            <button
               className="btn btn-primary px-4"
               onClick={() => setShowModal(true)}
            >
                + Report Vulnerability
            </button>

          </div>
          <div className="stats-grid">

               <div className="stat-card">

                  <h3>{vulnerabilities.length}</h3>

                   <p>Total Reports</p>

               </div>

          <div className="stat-card">

              <h3>
                {
                   vulnerabilities.filter(
                      v => v.status === "Open"
                   ).length
                }
               </h3>

               <p>Open</p>

          </div>

          <div className="stat-card">

            <h3>
              {
                vulnerabilities.filter(
                    v => v.status === "In Progress"
                ).length
              }
            </h3>

            <p>In Progress</p>

          </div>

          <div className="stat-card">

             <h3>
              {
                 vulnerabilities.filter(
                    v => v.status === "Resolved"
                ).length
              }
              </h3>

              <p>Resolved</p>

          </div>

       </div>
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
       {
    showModal && (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">

                            Report Vulnerability

                        </h5>

                        <button
                            className="btn-close"
                            onClick={() => setShowModal(false)}
                        />

                    </div>

                    <div className="modal-body">

                        <VulnerabilityForm

                            role="User"

                            onSuccess={() => {

                                setShowModal(false);

                                loadVulnerabilities();

                            }}

                        />

                    </div>

                </div>

            </div>

        </div>

    )
}
        </DashboardLayout>

    );

}