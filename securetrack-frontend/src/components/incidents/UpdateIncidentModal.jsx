import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UpdateIncidentModal({

    incident,

    onClose,

    onSuccess,

}) {

    const [status, setStatus] = useState(incident.status);

    const [resolutionNotes, setResolutionNotes] = useState(

        incident.resolution_notes || ""

    );

    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {

        setLoading(true);

        try {

            const token = localStorage.getItem("access");

            await axios.put(

                `${import.meta.env.VITE_API_URL}/api/incidents/${incident.id}/`,

                {

                    title: incident.title,

                    description: incident.description,

                    vulnerability: incident.vulnerability,

                    assigned_to: incident.assigned_to,

                    priority: incident.priority,

                    status: status,

                    resolution_notes: resolutionNotes,

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            toast.success("Incident updated successfully.");

            onSuccess();

            onClose();

        }

        catch {

            toast.error("Failed to update incident.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

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

                        <h5>

                            Update Incident

                        </h5>

                        <button

                            className="btn-close"

                            onClick={onClose}

                        />

                    </div>

                    <div className="modal-body">

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Incident

                            </label>

                            <input

                                className="form-control"

                                value={incident.title}

                                disabled

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Status

                            </label>

                            <select

                                className="form-select"

                                value={status}

                                onChange={(e)=>setStatus(e.target.value)}

                            >

                                <option>Open</option>

                                <option>Investigating</option>

                                <option>Mitigated</option>

                                <option>Resolved</option>

                                <option>Closed</option>

                            </select>

                        </div>

                        <div className="mb-3">

                            <label className="form-label fw-semibold">

                                Resolution Notes

                            </label>

                            <textarea

                                rows="6"

                                className="form-control"

                                placeholder="Describe how you fixed this incident..."

                                value={resolutionNotes}

                                onChange={(e)=>setResolutionNotes(e.target.value)}

                            />

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button

                            className="btn btn-secondary"

                            onClick={onClose}

                        >

                            Cancel

                        </button>

                        <button

                            className="btn btn-primary"

                            onClick={handleUpdate}

                            disabled={loading}

                        >

                            {

                                loading

                                ?

                                "Saving..."

                                :

                                "Update Incident"

                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}