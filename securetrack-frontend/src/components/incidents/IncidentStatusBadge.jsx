export default function IncidentStatusBadge({ status }) {

    let color = "secondary";

    if (status === "Open")
        color = "danger";

    else if (status === "Investigating")
        color = "warning";

    else if (status === "Mitigated")
        color = "info";

    else if (status === "Resolved")
        color = "success";

    else if (status === "Closed")
        color = "dark";

    return (

        <span className={`badge bg-${color}`}>

            {status}

        </span>

    );

}