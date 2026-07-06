import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
      fullName: "",
     username: "",
     email: "",
     role: "User",
     password: "",
     confirmPassword: "",
});

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const password = form.password;

const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
};

const passedChecks = Object.values(passwordChecks).filter(Boolean).length;

let strength = "Weak";
let strengthColor = "danger";
let progress = 20;

if (passedChecks >= 3) {
    strength = "Medium";
    strengthColor = "warning";
    progress = 60;
}

if (passedChecks === 5) {
    strength = "Strong";
    strengthColor = "success";
    progress = 100;
}

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setSuccess(false);
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        {
            full_name: form.fullName,
            username: form.username,
            email: form.email,
            password: form.password,
            confirm_password: form.confirmPassword,
            role: form.role,
        }
      );

      setSuccess(true);
      setMessage(response.data.message);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);

    } catch (error) {

    setSuccess(false);

    const data = error.response?.data;

    if (!data) {
        setMessage("Registration failed.");
        return;
    }

    let errors = [];

    Object.keys(data).forEach((key) => {

        if (Array.isArray(data[key])) {
            errors.push(`${key}: ${data[key].join(", ")}`);
        } else {
            errors.push(`${key}: ${data[key]}`);
        }

    });

    setMessage(errors.join(" | "));
}
};

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">

      <div
        className="card shadow-lg border-0 rounded-4 p-5"
        style={{ width: "500px" }}
      >
        <h2 className="text-center fw-bold text-primary mb-4">
          Create Account
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
        Full Name
    </label>

    <input
        type="text"
        className="form-control"
        placeholder="Enter your full name"
        required
        value={form.fullName}
        onChange={(e) =>
            setForm({
                ...form,
                fullName: e.target.value,
            })
        }
    />

</div>
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

          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-3">
             <label className="form-label">
                Register As
             </label>

             <select
               className="form-select"
               value={form.role}
               onChange={(e) =>
                 setForm({
                   ...form,
                   role: e.target.value,
                 })
               }
             >
               <option value="User">User</option>
               <option value="Developer">Developer</option>
             </select>
          </div>

          <div className="mb-3">

    <label className="form-label fw-semibold">
        Password
    </label>

    <input
        type="password"
        className="form-control"
        placeholder="Create a strong password"
        required
        value={form.password}
        onChange={(e) =>
            setForm({
                ...form,
                password: e.target.value,
            })
        }
    />

    {
        form.password && (

            <>
                <div className="d-flex justify-content-between mt-3">

                    <small className="fw-semibold">
                        Password Strength
                    </small>

                    <span
                        className={`badge bg-${strengthColor}`}
                    >
                        {strength}
                    </span>

                </div>

                <div
                    className="progress mt-2"
                    style={{ height: "8px" }}
                >

                    <div
                        className={`progress-bar bg-${strengthColor}`}
                        style={{
                            width: `${progress}%`
                        }}
                    />

                </div>

                <div className="mt-2">

    <small className="text-muted">

        Use at least 8 characters with uppercase, lowercase,
        numbers and special characters.

    </small>

</div>
            </>

        )

    }

</div>

          <div className="mb-4">

    <label className="form-label fw-semibold">
        Confirm Password
    </label>

    <input
        type="password"
        className="form-control"
        placeholder="Confirm password"
        required
        value={form.confirmPassword}
        onChange={(e) =>
            setForm({
                ...form,
                confirmPassword: e.target.value,
            })
        }
    />

    {
        form.confirmPassword && (

            <small
                className={
                    form.password === form.confirmPassword
                        ? "text-success"
                        : "text-danger"
                }
            >
                {
                    form.password === form.confirmPassword
                        ? "✔ Passwords match"
                        : "✖ Passwords do not match"
                }
            </small>

        )

    }

</div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Create Account
          </button>

        </form>
      </div>

    </div>
  );
}