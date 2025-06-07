import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import NurseDashboard from "./pages/NurseDashboard";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

const App: React.FC = () => {
  // State để lưu trạng thái đăng nhập và vai trò người dùng
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect triggered: isAuthenticated:", isAuthenticated);
    console.log("useEffect triggered: userRole:", userRole);

    if (isAuthenticated && userRole) {
      console.log("Navigating based on role:", userRole);
      if (userRole === "admin") navigate("/admin");
      else if (userRole === "parent") navigate("/parent");
      else if (userRole === "manager") navigate("/manager");
      else if (userRole === "nurse") navigate("/nurse");
      else console.error("Invalid role detected.");
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleLogin = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    console.log("Login triggered with role:", role);
  };

  return (
    <Routes>
      <Route path="/" element={<Home onLogin={handleLogin} />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes based on authentication and roles */}
      <Route
        path="/admin/*"
        element={(() => {
          console.log("Admin Route: isAuthenticated:", isAuthenticated);
          console.log("Admin Route: userRole:", userRole);
          return (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <RoleBasedRoute role="admin" userRole={userRole}>
                <AdminDashboard
                  setIsAuthenticated={setIsAuthenticated}
                  setUserRole={setUserRole}
                />
              </RoleBasedRoute>
            </PrivateRoute>
          );
        })()}
      />
      <Route
        path="/parent/*"
        element={(() => {
          console.log("Parent Route: isAuthenticated:", isAuthenticated);
          console.log("Parent Route: userRole:", userRole);
          return (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <RoleBasedRoute role="parent" userRole={userRole}>
                <ParentDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          );
        })()}
      />
      <Route
        path="/manager/*"
        element={(() => {
          console.log("Manager Route: isAuthenticated:", isAuthenticated);
          console.log("Manager Route: userRole:", userRole);
          return (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <RoleBasedRoute role="manager" userRole={userRole}>
                <ManagerDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          );
        })()}
      />
      <Route
        path="/nurse/*"
        element={(() => {
          console.log("Nurse Route: isAuthenticated:", isAuthenticated);
          console.log("Nurse Route: userRole:", userRole);
          return (
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <RoleBasedRoute role="nurse" userRole={userRole}>
                <NurseDashboard />
              </RoleBasedRoute>
            </PrivateRoute>
          );
        })()}
      />

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
