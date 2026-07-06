import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import IncidentTable from "../components/incidents/IncidentTable";
import IncidentForm from "../components/incidents/IncidentForm";
import ViewIncidentModal from "../components/incidents/ViewIncidentModal";
export default function AdminIncidents() {

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);

    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedIncident, setSelectedIncident] = useState(null);
    const [search, setSearch] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);

const [incidentToDelete, setIncidentToDelete] = useState(null);

    const [statusFilter, setStatusFilter] = useState("");
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

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };
    const filteredIncidents = incidents.filter((incident) => {

    const matchesSearch =

        incident.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        incident.vulnerability_title
            .toLowerCase()
            .includes(search.toLowerCase());

    const matchesPriority =

        priorityFilter === "" ||

        incident.priority === priorityFilter;

    const matchesStatus =

        statusFilter === "" ||

        incident.status === statusFilter;

    return (

        matchesSearch &&

        matchesPriority &&

        matchesStatus

    );

});
   const deleteIncident = async () => {

    try {

        const token = localStorage.getItem("access");

        await axios.delete(

            `http://127.0.0.1:8000/api/incidents/${incidentToDelete.id}/`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

        );

        toast.success("Incident deleted successfully.");

        setShowDeleteModal(false);

        setIncidentToDelete(null);

        fetchIncidents();

    } catch {

        toast.error("Failed to delete incident.");

    }

};

    return (

        <DashboardLayout role="Admin">

            <div className="container-fluid">

             <div className="d-flex justify-content-between align-items-center mb-4">

    <h2>
        Incident Management
    </h2>

    <button
        className="btn btn-primary"
        onClick={() => setShowCreateModal(true)}
    >
        + Create Incident
    </button>

</div>

<div className="row mb-4">

    <div className="col-md-4">

        <input
            type="text"
            className="form-control"
            placeholder="🔍 Search incident or vulnerability..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

    </div>

    <div className="col-md-4">

        <select
            className="form-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
        >

            <option value="">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>

        </select>

    </div>

    <div className="col-md-4">

        <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
        >

            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="Investigating">Investigating</option>
            <option value="Mitigated">Mitigated</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>

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
    incidents={filteredIncidents}

    onView={(incident) => {

        setSelectedIncident(incident);

        setShowViewModal(true);

    }}

    onEdit={(incident) => {

        setSelectedIncident(incident);

        setShowEditModal(true);

    }}

    onDelete={(incident) => {
        setIncidentToDelete(incident);
        setShowDeleteModal(true);


    }}
/>

                }

            </div>
        {
    showCreateModal && (

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
                            Create Incident
                        </h5>

                        <button
                            className="btn-close"
                            onClick={() => setShowCreateModal(false)}
                        />

                    </div>

                    <div className="modal-body">

                        <IncidentForm

                            onSuccess={() => {

                                setShowCreateModal(false);

                                fetchIncidents();

                            }}

                        />

                    </div>

                </div>

            </div>

        </div>

    )
}
{

showViewModal && (

<ViewIncidentModal

    incident={selectedIncident}

    onClose={() => {

        setShowViewModal(false);

    }}

/>

)

}

{
    showEditModal && (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,.5)"
            }}
        >

            <div className="modal-dialog modal-lg">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>Edit Incident</h5>

                        <button
                            className="btn-close"
                            onClick={() => setShowEditModal(false)}
                        />

                    </div>

                    <div className="modal-body">

                        <IncidentForm

                            incident={selectedIncident}

                            onSuccess={() => {

                                setShowEditModal(false);

                                fetchIncidents();

                            }}

                        />

                    </div>

                </div>

            </div>

        </div>

    )
}
{
showDeleteModal && (

<div
    className="modal fade show"
    style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,.5)"
    }}
>

    <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">

            <div className="modal-header bg-danger text-white">

                <h5 className="modal-title">

                    Delete Incident

                </h5>

                <button
                    className="btn-close btn-close-white"
                    onClick={() => setShowDeleteModal(false)}
                />

            </div>

            <div className="modal-body">

                <p className="mb-2">

                    Are you sure you want to delete this incident?

                </p>

                <div className="alert alert-light border">

                    <strong>

                        {incidentToDelete?.title}

                    </strong>

                </div>

                <p className="text-danger mb-0">

                    This action cannot be undone.

                </p>

            </div>

            <div className="modal-footer">

                <button

                    className="btn btn-secondary"

                    onClick={() => setShowDeleteModal(false)}

                >

                    Cancel

                </button>

                <button

                    className="btn btn-danger"

                    onClick={deleteIncident}

                >

                    Delete Incident

                </button>

            </div>

        </div>

    </div>

</div>

)
}
        </DashboardLayout>

    );

}