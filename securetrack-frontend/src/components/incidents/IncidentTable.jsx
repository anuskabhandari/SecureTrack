import IncidentPriorityBadge from "./IncidentPriorityBadge";
import IncidentStatusBadge from "./IncidentStatusBadge";

export default function IncidentTable({ incidents,
    onView,
    onEdit,
    onDelete,
      role = "Admin",
      }) {

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
        onClick={() => onView(incident)}
    >
        View
    </button>

    {

        role === "Admin" && (

            <>
                <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(incident)}
                >
                    Edit
                </button>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(incident)}
                >
                    Delete
                </button>
            </>

        )

    }

    {

        role === "Developer" && (

            <button
                className="btn btn-primary btn-sm"
                onClick={() => onEdit(incident)}
            >
                Update
            </button>

        )

    }

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