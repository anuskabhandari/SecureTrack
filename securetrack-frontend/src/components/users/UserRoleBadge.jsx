export default function UserRoleBadge({ role }) {

    if (role === "Admin") {

        return (
            <span className="badge bg-danger">
                Admin
            </span>
        );

    }

    if (role === "Developer") {

        return (
            <span className="badge bg-success">
                Developer
            </span>
        );

    }

    return (

        <span className="badge bg-primary">
            User
        </span>

    );

}