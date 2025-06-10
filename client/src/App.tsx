import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerPages/ManagerDashboard";
import NurseDashboard from "./pages/NursePages/NurseDashboard";
import HealthRecords from "./pages/ManagerPages/HealthRecords";
import MedicalStaffManagement from "./pages/ManagerPages/MedicalStaffManagement";
import AlertsAndNotifications from "./pages/ManagerPages/AlertsAndNotifications";
import EventAndAppointmentManagement from "./pages/ManagerPages/EventAndAppointmentManagement";
import ParentDashboard from "./pages/ParentPages/ParentDashboard";
import ManageAccounts from "./pages/AdminPages/ManageAccounts";
import ActivityLogs from "./pages/AdminPages/ActivityLogs";
import HealthProfileForm from "./pages/ParentPages/HealthProfileForm";
import MedicationForm from "./pages/ParentPages/MedicationForm";
import HealthCheckDashboard from "./pages/ParentPages/HealthCheckDashboard";
import VaccinationEventDashboard from "./pages/ParentPages/VaccinationEventDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem("isAuthenticated");
    return savedAuth === "true";
  });
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem("userRole") || "";
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    localStorage.setItem("userRole", userRole);
  }, [isAuthenticated, userRole]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={`/${userRole}`} />
          ) : (
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
            />
          )
        }
      />
      <Route path="/register" element={<Register />} />

      <Route
        path="/admin/*"
        element={
          isAuthenticated && userRole === "admin" ? (
            <AdminDashboard
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manager/*"
        element={
          isAuthenticated && userRole === "manager" ? (
            <ManagerDashboard
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/nurse/*"
        element={
          isAuthenticated && userRole === "nurse" ? (
            <NurseDashboard
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manager/health-records"
        element={
          isAuthenticated && userRole === "manager" ? (
            <HealthRecords />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manager/medical-staff-management"
        element={
          isAuthenticated && userRole === "manager" ? (
            <MedicalStaffManagement />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manager/alerts-and-notifications"
        element={
          isAuthenticated && userRole === "manager" ? (
            <AlertsAndNotifications />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/manager/event-and-appointment-management"
        element={
          isAuthenticated && userRole === "manager" ? (
            <EventAndAppointmentManagement />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/parent"
        element={
          isAuthenticated && userRole === "parent" ? (
            <ParentDashboard
              setIsAuthenticated={setIsAuthenticated}
              setUserRole={setUserRole}
              onLogout={handleLogout}
            />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/manage-accounts"
        element={
          isAuthenticated && userRole === "admin" ? (
            <ManageAccounts />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/admin/activity-logs"
        element={
          isAuthenticated && userRole === "admin" ? (
            <ActivityLogs />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/parent-pages/health-profile-form"
        element={
          <HealthProfileForm
            setIsAuthenticated={setIsAuthenticated}
            setUserRole={setUserRole}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/parent-pages/medication-form"
        element={
          <MedicationForm
            setIsAuthenticated={setIsAuthenticated}
            setUserRole={setUserRole}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/parent-pages/health-check-dashboard"
        element={
          <HealthCheckDashboard
            setIsAuthenticated={setIsAuthenticated}
            setUserRole={setUserRole}
            onLogout={handleLogout}
          />
        }
      />
      <Route
        path="/parent-pages/vaccination-event-dashboard"
        element={
          <VaccinationEventDashboard
            setIsAuthenticated={setIsAuthenticated}
            setUserRole={setUserRole}
            onLogout={handleLogout}
          />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
