import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../components/dashboard/DashboardLayout";


const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("isLoggedIn");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const EMPTY_PROFILE = {
  username: "",
  first_name: "",
  last_name: "",
  email: "",
  role: "",
};

const EMPTY_PASSWORD_FORM = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};

// Maps a 0-4 strength score to a label, Bootstrap color, and fill %.
const PASSWORD_STRENGTH_LEVELS = [
  { label: "Too weak", color: "bg-danger", percent: 20 },
  { label: "Weak", color: "bg-danger", percent: 40 },
  { label: "Fair", color: "bg-warning", percent: 60 },
  { label: "Good", color: "bg-info", percent: 80 },
  { label: "Strong", color: "bg-success", percent: 100 },
];

function getPasswordStrength(password) {
  if (!password) return null;

  let score = 0;
  if (password.length >= MIN_PASSWORD_LENGTH) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const level = Math.min(score, PASSWORD_STRENGTH_LEVELS.length - 1);
  return PASSWORD_STRENGTH_LEVELS[level];
}

function getInitials({ first_name, last_name, username }) {
  const first = first_name?.trim()?.[0] || "";
  const last = last_name?.trim()?.[0] || "";
  if (first || last) return `${first}${last}`.toUpperCase();
  return (username?.trim()?.[0] || "?").toUpperCase();
}

export default function Settings() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY_PROFILE);
  const [passwordForm, setPasswordForm] = useState(EMPTY_PASSWORD_FORM);
  const [showPasswords, setShowPasswords] = useState(false);

  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileErrors, setProfileErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const passwordStrength = useMemo(
    () => getPasswordStrength(passwordForm.new_password),
    [passwordForm.new_password]
  );

  const initials = useMemo(() => getInitials(form), [form]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    setIsProfileLoading(true);
    try {
      const { data } = await apiClient.get("/profile/");
      setForm(data);
    } catch (error) {
      toast.error("Unable to load your profile. Please try again.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setProfileErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
    setPasswordErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateProfile = () => {
    const errors = {};
    if (!form.first_name.trim()) errors.first_name = "First name is required.";
    if (!form.last_name.trim()) errors.last_name = "Last name is required.";
    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(form.email)) {
      errors.email = "Enter a valid email address.";
    }
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePasswordForm = () => {
    const errors = {};
    if (!passwordForm.current_password) {
      errors.current_password = "Current password is required.";
    }
    if (!passwordForm.new_password) {
      errors.new_password = "New password is required.";
    } else if (passwordForm.new_password.length < MIN_PASSWORD_LENGTH) {
      errors.new_password = `New password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
    } else if (passwordForm.new_password === passwordForm.current_password) {
      errors.new_password = "New password must differ from the current password.";
    }
    if (passwordForm.confirm_password !== passwordForm.new_password) {
      errors.confirm_password = "Passwords do not match.";
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveProfile = async () => {
    if (!validateProfile()) return;

    setIsSavingProfile(true);
    try {
      await apiClient.put("/profile/", {
        first_name: form.first_name,
        last_name: form.last_name,
        email: form.email,
      });
      toast.success("Profile updated successfully.");
    } catch (error) {
      const apiErrors = error.response?.data;
      if (apiErrors && typeof apiErrors === "object") {
        setProfileErrors(apiErrors);
      }
      toast.error(apiErrors?.detail || "Failed to update profile.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const changePassword = async () => {
    if (!validatePasswordForm()) return;

    setIsChangingPassword(true);
    try {
      await apiClient.post("/profile/change-password/", passwordForm);

      toast.success("Password changed successfully. Please log in again.");
      setPasswordForm(EMPTY_PASSWORD_FORM);

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");
      localStorage.removeItem("username");
      localStorage.removeItem("isLoggedIn");

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Failed to change password."
      );
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <DashboardLayout role={role}>
      <div className="container">
        <div className="card shadow p-4">
          <h2 className="mb-4">Profile Settings</h2>

          {isProfileLoading ? (
            <div className="d-flex align-items-center gap-2 text-muted">
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              Loading profile...
            </div>
          ) : (
            <>
              {/* Profile Card: avatar + read-only identity summary */}
              <div className="d-flex align-items-center gap-3 mb-4 pb-4 border-bottom">
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-primary text-white fw-bold flex-shrink-0"
                  style={{ width: 72, height: 72, fontSize: "1.5rem" }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
                <div>
                  <div className="fs-5 fw-semibold">
                    {form.first_name || form.last_name
                      ? `${form.first_name} ${form.last_name}`.trim()
                      : form.username}
                  </div>
                  <div className="text-muted">{form.email}</div>
                  {form.role && (
                    <span className="badge bg-secondary-subtle text-secondary-emphasis mt-1">
                      {form.role}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  id="username"
                  className="form-control"
                  value={form.username}
                  disabled
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="first_name" className="form-label">
                    First Name
                  </label>
                  <input
                    id="first_name"
                    className={`form-control ${
                      profileErrors.first_name ? "is-invalid" : ""
                    }`}
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                  />
                  {profileErrors.first_name && (
                    <div className="invalid-feedback">
                      {profileErrors.first_name}
                    </div>
                  )}
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="last_name" className="form-label">
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    className={`form-control ${
                      profileErrors.last_name ? "is-invalid" : ""
                    }`}
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                  />
                  {profileErrors.last_name && (
                    <div className="invalid-feedback">
                      {profileErrors.last_name}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${
                    profileErrors.email ? "is-invalid" : ""
                  }`}
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {profileErrors.email && (
                  <div className="invalid-feedback">{profileErrors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input
                  id="role"
                  className="form-control"
                  value={form.role}
                  disabled
                />
              </div>

              <button
                className="btn btn-primary"
                onClick={saveProfile}
                disabled={isSavingProfile}
              >
                {isSavingProfile ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </>
          )}
        </div>

        <div className="card shadow p-4 mt-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">Change Password</h3>
            <button
              type="button"
              className="btn btn-link btn-sm text-decoration-none"
              onClick={() => setShowPasswords((prev) => !prev)}
            >
              {showPasswords ? "Hide" : "Show"} passwords
            </button>
          </div>

          <div className="mb-3">
            <label htmlFor="current_password" className="form-label">
              Current Password
            </label>
            <input
              id="current_password"
              type={showPasswords ? "text" : "password"}
              className={`form-control ${
                passwordErrors.current_password ? "is-invalid" : ""
              }`}
              name="current_password"
              value={passwordForm.current_password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            {passwordErrors.current_password && (
              <div className="invalid-feedback">
                {passwordErrors.current_password}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="new_password" className="form-label">
              New Password
            </label>
            <input
              id="new_password"
              type={showPasswords ? "text" : "password"}
              className={`form-control ${
                passwordErrors.new_password ? "is-invalid" : ""
              }`}
              name="new_password"
              value={passwordForm.new_password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
            {passwordErrors.new_password ? (
              <div className="invalid-feedback">
                {passwordErrors.new_password}
              </div>
            ) : (
              <div className="form-text">
                At least {MIN_PASSWORD_LENGTH} characters.
              </div>
            )}

            {passwordStrength && (
              <div className="mt-2">
                <div className="progress" style={{ height: 6 }}>
                  <div
                    className={`progress-bar ${passwordStrength.color}`}
                    role="progressbar"
                    style={{ width: `${passwordStrength.percent}%` }}
                    aria-valuenow={passwordStrength.percent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                <div className="form-text">{passwordStrength.label}</div>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="confirm_password" className="form-label">
              Confirm New Password
            </label>
            <input
              id="confirm_password"
              type={showPasswords ? "text" : "password"}
              className={`form-control ${
                passwordErrors.confirm_password ? "is-invalid" : ""
              }`}
              name="confirm_password"
              value={passwordForm.confirm_password}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
            {passwordErrors.confirm_password && (
              <div className="invalid-feedback">
                {passwordErrors.confirm_password}
              </div>
            )}
          </div>

          <button
            className="btn btn-warning"
            onClick={changePassword}
            disabled={isChangingPassword}
          >
            {isChangingPassword ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                />
                Changing Password...
              </>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
