import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerPages/ManagerDashboard";
import ParentDashboard from "./pages/ParentPages/ParentDashboard";
import NurseDashboard from "./pages/NursePages/NurseDashboard";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";
import ManageAccounts from "./pages/AdminPages/ManageAccounts";
import ActivityLogs from "./pages/AdminPages/ActivityLogs";
import Help from "./pages/AdminPages/Help";

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

    if (isAuthenticated && userRole && window.location.pathname !== "/") {
      const path = rolePaths[userRole];
      if (path && window.location.pathname !== path) {
        console.log("Navigating to:", path);
        navigate(path);
      } else if (!path) {
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
              <AdminDashboard
                setIsAuthenticated={setIsAuthenticated}
                setUserRole={setUserRole}
              />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <RoleBasedRoute role="manager" userRole={userRole}>
              <ManagerDashboard />
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
              <NurseDashboard />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route path="/admin/manage-accounts" element={<ManageAccounts />} />
      <Route path="/admin/activity-logs" element={<ActivityLogs />} />
      <Route path="/admin/help" element={<Help />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
