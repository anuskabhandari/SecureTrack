import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import IncidentTable from "../components/incidents/IncidentTable";
import ViewIncidentModal from "../components/incidents/ViewIncidentModal";
import UpdateIncidentModal from "../components/incidents/UpdateIncidentModal";

export default function DeveloperIncidents() {

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [selectedIncident, setSelectedIncident] = useState(null);

    const [showViewModal, setShowViewModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    useEffect(() => {

        fetchIncidents();

    }, []);

    const fetchIncidents = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(

                "http://127.0.0.1:8000/api/incidents/",

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setIncidents(response.data);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredIncidents = incidents.filter((incident) => {

        const searchMatch =

            incident.title.toLowerCase().includes(search.toLowerCase()) ||

            incident.vulnerability_title.toLowerCase().includes(search.toLowerCase());

        const priorityMatch =

            priorityFilter === "" ||

            incident.priority === priorityFilter;

        const statusMatch =

            statusFilter === "" ||

            incident.status === statusFilter;

        return searchMatch && priorityMatch && statusMatch;

    });

    return (

        <DashboardLayout role="Developer">

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>

                        My Incidents

                    </h2>

                </div>

                <div className="row mb-4">

                    <div className="col-md-4">

                        <input

                            className="form-control"

                             placeholder="🔍 Search incident or vulnerability..."

                            value={search}

                            onChange={(e)=>setSearch(e.target.value)}

                        />

                    </div>

                    <div className="col-md-4">

                        <select

                            className="form-select"

                            value={priorityFilter}

                            onChange={(e)=>setPriorityFilter(e.target.value)}

                        >

                            <option value="">All Priorities</option>

                            <option>Critical</option>

                            <option>High</option>

                            <option>Medium</option>

                            <option>Low</option>

                        </select>

                    </div>

                    <div className="col-md-4">

                        <select

                            className="form-select"

                            value={statusFilter}

                            onChange={(e)=>setStatusFilter(e.target.value)}

                        >

                            <option value="">All Status</option>

                            <option>Open</option>

                            <option>Investigating</option>

                            <option>Mitigated</option>

                            <option>Resolved</option>

                            <option>Closed</option>

                        </select>

                    </div>

                </div>

                {

                    loading ?

                    <div className="text-center">

                        Loading...

                    </div>

                    :

                    <IncidentTable
                        role="Developer"

                        incidents={filteredIncidents}

                        onView={(incident)=>{

                            setSelectedIncident(incident);

                            setShowViewModal(true);

                        }}

                        onEdit={(incident)=>{

                            setSelectedIncident(incident);

                            setShowUpdateModal(true);

                        }}

                    />

                }

            </div>

            {

                showViewModal &&

                <ViewIncidentModal

                    incident={selectedIncident}

                    onClose={()=>setShowViewModal(false)}

                />

            }

            {

                showUpdateModal &&

                <UpdateIncidentModal

                    incident={selectedIncident}

                    onClose={()=>setShowUpdateModal(false)}

                    onSuccess={fetchIncidents}

                />

            }

        </DashboardLayout>

    );

}