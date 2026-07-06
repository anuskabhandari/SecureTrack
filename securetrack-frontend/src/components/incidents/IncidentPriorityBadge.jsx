export default function IncidentPriorityBadge({ priority }) {

    let color = "secondary";

    if (priority === "Critical") color = "danger";
    else if (priority === "High") color = "warning";
    else if (priority === "Medium") color = "primary";
    else if (priority === "Low") color = "success";

    return (

        <span className={`badge bg-${color}`}>

            {priority}

        </span>

    );

}