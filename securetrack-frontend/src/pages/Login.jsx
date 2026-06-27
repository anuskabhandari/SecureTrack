import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        form
      );

      setSuccess(true);
      setMessage(response.data.message);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("username", response.data.username);

      setTimeout(() => {

        if (response.data.role === "Admin") {
          window.location.href = "/admin-dashboard";
         }

        else if (response.data.role === "Developer") {
          window.location.href = "/developer-dashboard";
         }

        else {
          window.location.href = "/user-dashboard";
         }

      }, 1000);

    } catch (error) {
      setSuccess(false);

      setMessage(
        error.response?.data?.message ||
        "Invalid username or password"
      );
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">

      <div
        className="card shadow-lg border-0 rounded-4 p-5"
        style={{ width: "450px" }}
      >
        <h2 className="text-center fw-bold text-primary mb-4">
          SecureTrack Login
        </h2>

        {message && (
          <div
            className={`alert ${
              success ? "alert-success" : "alert-danger"
            }`}
          >
            {success ? "✓ " : "✕ "}
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              required
              onChange={(e) =>
                setForm({
                  ...form,
                  username: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>
      </div>

    </div>
  );
}