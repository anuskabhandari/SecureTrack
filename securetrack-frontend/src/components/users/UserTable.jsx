import UserRoleBadge from "./UserRoleBadge";

export default function UserTable({ users }) {

    return (

        <div className="card p-4">

            <table className="table table-hover">

                <thead>

                    <tr>

                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map((user) => (

                            <tr key={user.id}>

                                <td>{user.username}</td>

                                <td>{user.email || "-"}</td>

                                <td>

                                    <UserRoleBadge
                                        role={user.role}
                                    />

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}