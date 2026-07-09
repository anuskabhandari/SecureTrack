import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";

export default function Settings() {

    const role = localStorage.getItem("role");
    const [passwordForm, setPasswordForm] = useState({

       current_password: "",

       new_password: "",

       confirm_password: "",

    });

    const [form, setForm] = useState({

        username: "",
        first_name: "",
        last_name: "",
        email: "",
        role: "",

    });

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const token = localStorage.getItem("access");

            const response = await axios.get(

                "http://127.0.0.1:8000/api/profile/",

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            setForm(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };
    const handlePasswordChange = (e) => {

       setPasswordForm({

          ...passwordForm,

          [e.target.name]: e.target.value,

       });

    };

    const saveProfile = async () => {

        try {

            const token = localStorage.getItem("access");

            await axios.put(

                "http://127.0.0.1:8000/api/profile/",

                {

                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email,

                },

                {

                    headers: {

                        Authorization: `Bearer ${token}`,

                    },

                }

            );

            toast.success("Profile updated successfully.");

        }

        catch (error) {

            toast.error("Failed to update profile.");

        }

    };
    const changePassword = async () => {

    try {

        const token = localStorage.getItem("access");

        await axios.post(

            "http://127.0.0.1:8000/api/profile/change-password/",

            passwordForm,

            {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            }

        );

        toast.success(
    "Password changed successfully. Please login again."
);

localStorage.removeItem("access");
localStorage.removeItem("refresh");
localStorage.removeItem("role");
localStorage.removeItem("username");
localStorage.removeItem("isLoggedIn");

setTimeout(() => {

    navigate("/login");

}, 1500);

    }

    catch (error) {

        toast.error(

            error.response?.data?.error ||

            "Failed to change password."

        );

    }

};


    return (

        <DashboardLayout role={role}>

            <div className="container">

                <div className="card shadow p-4">

                    <h2 className="mb-4">

                        Profile Settings

                    </h2>

                    <div className="mb-3">

                        <label>Username</label>

                        <input

                            className="form-control"

                            value={form.username}

                            disabled

                        />

                    </div>

                    <div className="row">

                        <div className="col-md-6">

                            <label>First Name</label>

                            <input

                                className="form-control"

                                name="first_name"

                                value={form.first_name}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="col-md-6">

                            <label>Last Name</label>

                            <input

                                className="form-control"

                                name="last_name"

                                value={form.last_name}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="mt-3">

                        <label>Email</label>

                        <input

                            className="form-control"

                            name="email"

                            value={form.email}

                            onChange={handleChange}

                        />

                    </div>

                    <div className="mt-3">

                        <label>Role</label>

                        <input

                            className="form-control"

                            value={form.role}

                            disabled

                        />

                    </div>

                    <button

                        className="btn btn-primary mt-4"

                        onClick={saveProfile}

                    >

                        Save Changes

                    </button>

                </div>

            </div>

            <hr className="my-5" />

<h3>

    Change Password

</h3>

<div className="mb-3">

    <label>

        Current Password

    </label>

    <input

        type="password"

        className="form-control"

        name="current_password"

        value={passwordForm.current_password}

        onChange={handlePasswordChange}

    />

</div>

<div className="mb-3">

    <label>

        New Password

    </label>

    <input

        type="password"

        className="form-control"

        name="new_password"

        value={passwordForm.new_password}

        onChange={handlePasswordChange}

    />

</div>

<div className="mb-4">

    <label>

        Confirm Password

    </label>

    <input

        type="password"

        className="form-control"

        name="confirm_password"

        value={passwordForm.confirm_password}

        onChange={handlePasswordChange}

    />

</div>

<button

    className="btn btn-warning"

    onClick={changePassword}

>

    Change Password

</button>

        </DashboardLayout>

    );

}