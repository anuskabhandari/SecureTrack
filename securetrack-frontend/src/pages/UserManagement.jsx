import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import UserTable from "../components/users/UserTable";
import ViewUserModal from "../components/users/ViewUserModal";

export default function UserManagement() {

    const [users, setUsers] = useState([]);
    const totalUsers = users.length;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
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
    const [showViewModal, setShowViewModal] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const usersPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/users/`,
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
  const confirmDelete = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
};

const deleteUser = async () => {

    try {

        const token = localStorage.getItem("access");

        await axios.delete(
            `${import.meta.env.VITE_API_URL}/users/${userToDelete.id}/`,

            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        toast.success("User deleted successfully.");

        setShowDeleteModal(false);
        setUserToDelete(null);

        fetchUsers();

    } catch {

        toast.error("Failed to delete user.");

    }

};
   const indexOfLast = currentPage * usersPerPage;

const indexOfFirst = indexOfLast - usersPerPage;

const currentUsers = filteredUsers.slice(
    indexOfFirst,
    indexOfLast
);

const totalPages = Math.ceil(
    filteredUsers.length / usersPerPage
);

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
                    <>
                        <UserTable
                            users={currentUsers}
                            onDelete={confirmDelete}
                            onView={(user) => {
                                 setSelectedUser(user);

                                 setShowViewModal(true);

                            }}
                        />
                        <div className="d-flex justify-content-center mt-4">

    <nav>

        <ul className="pagination">

            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>

                <button
                    className="page-link"
                    onClick={() =>
                        currentPage > 1 &&
                        setCurrentPage(currentPage - 1)
                    }
                >
                    Previous
                </button>

            </li>

            {[...Array(totalPages)].map((_, index) => (

                <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >

                    <button
                        className="page-link"
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>

                </li>

            ))}

            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>

                <button
                    className="page-link"
                    onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                    }
                >
                    Next
                </button>

            </li>

        </ul>

    </nav>

</div>
</>

                }

            </div>
            {
    showViewModal && (

        <ViewUserModal

            user={selectedUser}

            onClose={() => {

                setShowViewModal(false);

            }}

        />

    )
}

   {
    showDeleteModal && (

        <div
            className="modal fade show"
            style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Delete User
                        </h5>

                    </div>

                    <div className="modal-body">

                        Are you sure you want to delete
                        <strong> {userToDelete?.username}</strong>?

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                setShowDeleteModal(false);
                                setUserToDelete(null);
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={deleteUser}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )
}

        </DashboardLayout>

    );

}