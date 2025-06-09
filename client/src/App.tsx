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

    console.log("Debugging Navigation:", {
      isAuthenticated,
      userRole,
      currentPath: window.location.pathname,
      rolePaths,
    });

    if (isAuthenticated && userRole && window.location.pathname !== "/") {
      const path = rolePaths[userRole];
      if (path && !window.location.pathname.startsWith(path)) {
        console.log("Navigating to:", path);
        navigate(path);
      }
    } else if (!isAuthenticated && window.location.pathname === "/login") {
      console.log("User is accessing login page.");
    } else {
      console.log("Conditions not met for navigation.");
    }

    if (
      isAuthenticated &&
      userRole &&
      window.location.pathname.startsWith("/admin")
    ) {
      console.log("Admin-specific navigation detected.");
      return;
    }

    if (
      isAuthenticated &&
      userRole &&
      window.location.pathname.startsWith(rolePaths[userRole])
    ) {
      console.log("User is already in the correct role path.");
      return;
    }

    if (
      isAuthenticated &&
      userRole &&
      window.location.pathname.startsWith(`/admin/`) &&
      window.location.pathname !== `/admin`
    ) {
      console.log("User is already in an admin subpage.");
      return;
    }

    if (isAuthenticated && userRole && window.location.pathname === `/admin`) {
      console.log("User is in the admin dashboard.");
      return;
    }

    if (
      isAuthenticated &&
      userRole &&
      window.location.pathname === "/admin-dashboard"
    ) {
      console.log("Navigating to admin dashboard subpage.");
      return;
    }

    if (
      isAuthenticated &&
      userRole === "admin" &&
      (window.location.pathname === "/admin-dashboard" ||
        window.location.pathname.startsWith("/admin"))
    ) {
      console.log(
        "Admin-specific navigation detected, allowing access to admin routes."
      );
      return;
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);

    if (role === "admin") {
      navigate("/admin"); // Chuyển sang AdminDashboard khi admin đăng nhập
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
      <Route
        path="/admin/manage-accounts"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <RoleBasedRoute role="admin" userRole={userRole}>
              <ManageAccounts />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/activity-logs"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <RoleBasedRoute role="admin" userRole={userRole}>
              <ActivityLogs />
            </RoleBasedRoute>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
