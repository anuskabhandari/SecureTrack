import IncidentPriorityBadge from "./IncidentPriorityBadge";
import IncidentStatusBadge from "./IncidentStatusBadge";

export default function IncidentTable({ incidents }) {

    return (

        <div className="card shadow-sm p-3">

            <table className="table table-hover">

                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Vulnerability</th>

                        <th>Priority</th>

                        <th>Status</th>

                        <th>Assigned To</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        incidents.length > 0 ?

                            incidents.map((incident) => (

                                <tr key={incident.id}>

                                    <td>{incident.title}</td>

                                    <td>{incident.vulnerability_title}</td>

                                    <td>

                                        <IncidentPriorityBadge
                                            priority={incident.priority}
                                        />

                                    </td>

                                    <td>

                                        <IncidentStatusBadge
                                            status={incident.status}
                                        />

                                    </td>

                                    <td>

                                        {

                                            incident.assigned_to_username ||

                                            "Not Assigned"

                                        }

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-info btn-sm me-2"
                                        >
                                            View
                                        </button>

                                        <button
                                            className="btn btn-warning btn-sm"
                                        >
                                            Edit
                                        </button>

                                    </td>

                                </tr>

                            ))

                            :

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >

                                    No incidents found.

                                </td>

                            </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}