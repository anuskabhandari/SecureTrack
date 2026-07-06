import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import IncidentTable from "../components/incidents/IncidentTable";
import IncidentForm from "../components/incidents/IncidentForm";

export default function AdminIncidents() {

    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
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

    return (

        <DashboardLayout role="Admin">

            <div className="container-fluid">

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>
                        Incident Management
                    </h2>

                    <button className="btn btn-primary"
                    onClick={() => setShowCreateModal(true)}
                    >
                        + Create Incident
                    </button>

                </div>

                {

                    loading ?

                        <div className="text-center">

                            Loading...

                        </div>

                        :

                        <IncidentTable
                            incidents={incidents}
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
        </DashboardLayout>

    );

}