import IncidentPriorityBadge from "./IncidentPriorityBadge";
import IncidentStatusBadge from "./IncidentStatusBadge";

export default function ViewIncidentModal({ incident, onClose }) {

    if (!incident) return null;

    return (

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
                            Incident Details
                        </h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <div className="row mb-3">

                            <div className="col-md-6">

                                <strong>Incident Title</strong>

                                <p>{incident.title}</p>

                            </div>

                            <div className="col-md-6">

                                <strong>Related Vulnerability</strong>

                                <p>{incident.vulnerability_title}</p>

                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-md-6">

                                <strong>Priority</strong>

                                <br />

                                <IncidentPriorityBadge
                                    priority={incident.priority}
                                />

                            </div>

                            <div className="col-md-6">

                                <strong>Status</strong>

                                <br />

                                <IncidentStatusBadge
                                    status={incident.status}
                                />

                            </div>

                        </div>

                        <div className="row mb-3">

                            <div className="col-md-6">

                                <strong>Assigned Developer</strong>

                                <p>

                                    {incident.assigned_to_username || "Not Assigned"}

                                </p>

                            </div>

                            <div className="col-md-6">

                                <strong>Reported By</strong>

                                <p>

                                    {incident.reported_by_username}

                                </p>

                            </div>

                        </div>

                        <div className="mb-3">

                            <strong>Description</strong>

                            <div className="border rounded p-3 mt-2">

                                {incident.description}

                            </div>

                        </div>

                        <div className="mb-3">

                            <strong>Resolution Notes</strong>

                            <div className="border rounded p-3 mt-2">

                                {

                                    incident.resolution_notes ||

                                    "No resolution notes available."

                                }

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-6">

                                <strong>Created</strong>

                                <p>

                                    {new Date(
                                        incident.created_at
                                    ).toLocaleString()}

                                </p>

                            </div>

                            <div className="col-md-6">

                                <strong>Last Updated</strong>

                                <p>

                                    {new Date(
                                        incident.updated_at
                                    ).toLocaleString()}

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Close
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}