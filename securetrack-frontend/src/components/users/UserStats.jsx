export default function UserStats({ users }) {

    const admins = users.filter(u => u.role === "Admin").length;
    const developers = users.filter(u => u.role === "Developer").length;
    const normalUsers = users.filter(u => u.role === "User").length;

    return (

        <div className="row mb-4">

            <div className="col-md-3">
                <div className="card p-3 text-center">
                    <h3>{users.length}</h3>
                    <p>Total Users</p>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card p-3 text-center">
                    <h3>{admins}</h3>
                    <p>Admins</p>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card p-3 text-center">
                    <h3>{developers}</h3>
                    <p>Developers</p>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card p-3 text-center">
                    <h3>{normalUsers}</h3>
                    <p>Users</p>
                </div>
            </div>

        </div>

    );

}