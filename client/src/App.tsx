import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import MedicationForm from "./pages/ParentPages/MedicationForm";
import HealthProfileForm from "./pages/ParentPages/HealthProfileForm";
import HealthCheckDashboard from "./pages/ParentPages/HealthCheckDashboard";
import VaccinationEventDashboard from "./pages/ParentPages/VaccinationEventDashboard";
import ParentDashboard from "./pages/ParentPages/ParentDashboard";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Authentication State:", isAuthenticated);
    console.log("User Role:", userRole);
    console.log("Current Path:", window.location.pathname);

    const rolePaths: Record<string, string> = {
      admin: "/admin",
      parent: "/parent",
      manager: "/manager",
      nurse: "/nurse",
    };

    if (isAuthenticated && userRole && window.location.pathname === "/") {
      const path = rolePaths[userRole];
      if (path) {
        console.log("Navigating to:", path);
        navigate(path);
      } else {
        console.error("Invalid role detected:", userRole);
        navigate("/");
      }
    } else if (!isAuthenticated && window.location.pathname === "/login") {
      console.log("User is accessing login page.");
    } else {
      console.log("Conditions not met for navigation.");
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);

    const rolePaths: Record<string, string> = {
      admin: "/admin",
      parent: "/parent",
      manager: "/manager",
      nurse: "/nurse",
    };

    const path = rolePaths[role];
    if (path) {
      navigate(path);
    } else {
      console.error("Invalid role detected during login:", role);
      navigate("/");
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Home onLogin={handleLogin} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/*"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <RoleBasedRoute role="admin" userRole={userRole}>
              <div>Admin Dashboard Placeholder</div>
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <RoleBasedRoute role="manager" userRole={userRole}>
              <div>Manager Dashboard Placeholder</div>
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/parent"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <RoleBasedRoute role="parent" userRole={userRole}>
              <ParentDashboard />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/nurse"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <RoleBasedRoute role="nurse" userRole={userRole}>
              <div>Nurse Dashboard Placeholder</div>
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route path="/medication-form" element={<MedicationForm />} />
      <Route path="/parent-pages/health-profile" element={<HealthProfileForm />} />
      <Route path="/parent-pages/health-check-dashboard" element={<HealthCheckDashboard />} />
      <Route path="/parent-pages/vaccination-event-dashboard" element={<VaccinationEventDashboard />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
