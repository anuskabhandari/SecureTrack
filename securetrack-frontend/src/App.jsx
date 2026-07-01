import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Vulnerabilities from "./pages/Vulnerabilities";
function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin-dashboard"
          element={
              <ProtectedRoute allowedRole="Admin">
                <AdminDashboard />
              </ProtectedRoute>
          }
        />

        <Route
           path="/developer-dashboard"
           element={
              <ProtectedRoute allowedRole="Developer">
                <DeveloperDashboard />
              </ProtectedRoute>
           }
        />

        <Route
           path="/user-dashboard"
           element={
              <ProtectedRoute allowedRole="User">
                 <UserDashboard />
              </ProtectedRoute>
           }
        />

        <Route
          path="/vulnerabilities"
          element={<Vulnerabilities />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;