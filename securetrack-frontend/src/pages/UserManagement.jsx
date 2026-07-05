import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import UserTable from "../components/users/UserTable";

export default function UserManagement() {

    const [users, setUsers] = useState([]);
    const totalUsers = users.length;

    const developers = users.filter(
       user => user.role === "Developer"
    ).length;

    const normalUsers = users.filter(
       user => user.role === "User"
    ).length;

    const admins = users.filter(
      user => user.role === "Admin"
    ).length;
    const [loading, setLoading] =useState(true);
    const [search, setSearch] = useState("");

    const [roleFilter, setRoleFilter] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                "http://127.0.0.1:8000/users/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUsers(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };
    const filteredUsers = users.filter((user) => {

    const matchesSearch =

        user.username.toLowerCase().includes(search.toLowerCase()) ||

        user.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =

        roleFilter === "" ||

        user.role === roleFilter;

    return matchesSearch && matchesRole;

});

    return (

        <DashboardLayout role="Admin">

            <div className="container-fluid">

                <h2 className="mb-4">
                    User Management
                </h2>
                <div className="row mb-4">

    <div className="col-md-3">
        <div className="card text-center shadow-sm">
            <div className="card-body">
                <h3>{totalUsers}</h3>
                <p>Total Users</p>
            </div>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card text-center shadow-sm">
            <div className="card-body">
                <h3>{developers}</h3>
                <p>Developers</p>
            </div>
        </div>
    </div>

    <div className="col-md-3">
        <div className="card text-center shadow-sm">
            <div className="card-body">
                <h3>{normalUsers}</h3>
                <p>Users</p>
            </div>
        </div>
    </div>



</div>
            <div className="row mb-4">

    <div className="col-md-8">

        <input
            type="text"
            className="form-control"
            placeholder="🔍 Search username or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

    </div>

    <div className="col-md-4">

        <select
            className="form-select"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
        >

            <option value="">All Roles</option>

            <option value="Developer">
                Developer
            </option>

            <option value="User">
                User
            </option>

        </select>

    </div>

</div>

                {
                    loading ?

                        <div className="text-center">
                            Loading...
                        </div>

                        :

                        <UserTable
                            users={filteredUsers}
                        />
                }

            </div>

        </DashboardLayout>

    );

}