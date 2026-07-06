import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import DeveloperDashboard from "./pages/DeveloperDashboard";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Vulnerabilities from "./pages/Vulnerabilities";
import VulnerabilityManagement from "./pages/VulnerabilityManagement";
import DeveloperVulnerabilities from "./pages/DeveloperVulnerabilities";
import UserVulnerabilities from "./pages/UserVulnerabilities";
import UserManagement from "./pages/UserManagement";
import AdminIncidents from "./pages/AdminIncidents";
import DeveloperIncidents from "./pages/DeveloperIncidents";
import UserIncidents from "./pages/UserIncidents";

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
          element={
             <ProtectedRoute allowedRole="Admin">
                <VulnerabilityManagement />
             </ProtectedRoute>
          }
        />

      <Route
          path="/developer/vulnerabilities"
          element={
              <ProtectedRoute allowedRole="Developer">
                   <DeveloperVulnerabilities />
              </ProtectedRoute>
          }
      />
      <Route
          path="/user/vulnerabilities"
          element={
             <ProtectedRoute allowedRole="User">
                 <UserVulnerabilities />
             </ProtectedRoute>
          }
      />

      <Route
        path="/users"
        element={<UserManagement />}
      />
      <Route
        path="/incidents"
        element={<AdminIncidents />}
      />

      <Route
         path="/developer/incidents"
         element={<DeveloperIncidents />}
      />

      <Route
       path="/user/incidents"
       element={<UserIncidents />}
       />


      </Routes>


    </BrowserRouter>
  );
}

export default App;