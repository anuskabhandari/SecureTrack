import UserRoleBadge from "./UserRoleBadge";

export default function UserTable({ users,
    onView,
    onDelete,
    }) {

    return (

        <div className="card p-4">

            <table className="table table-hover">

                <thead>

                    <tr>

                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <tr key={user.id}>

    <td>{user.username}</td>

    <td>{user.email}</td>

    <td>
        <UserRoleBadge role={user.role} />
    </td>

    <td>

        <button
            className="btn btn-info btn-sm me-2"
            onClick={() => onView(user)}
        >
            View
        </button>

        <button
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(user.id)}
        >
            Delete
        </button>

    </td>

</tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}