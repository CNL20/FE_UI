import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { UserRole } from "./types";
import { ROUTES, STORAGE_KEYS } from "./constants";
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
import HealthCheckSchedule from "./pages/ParentPages/HealthCheckSchedule";
import HealthCheckRegistrationForm from "./pages/ParentPages/HealthCheckRegistrationForm";
import HealthCheckResults from "./pages/ParentPages/HealthCheckResults";
import VaccinationRegistrationForm from "./pages/ParentPages/VaccinationRegistrationForm";
import VaccinationSchedule from "./pages/ParentPages/VaccinationSchedule";
import VaccinationNews from "./pages/ParentPages/VaccinationNews";

function App() {
  const [authState, setAuthState] = useState(() => {
    const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const savedRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE) as UserRole | null;
    return {
      isAuthenticated: !!savedAuth,
      userRole: savedRole || "",
    };
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Chỉ cập nhật localStorage khi authState thực sự thay đổi
  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem(STORAGE_KEYS.USER_ROLE, authState.userRole);
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    }
  }, [authState.isAuthenticated, authState.userRole]);

  const handleLogout = useCallback(() => {
    setAuthState({ isAuthenticated: false, userRole: "" });
    navigate(ROUTES.HOME);
  }, [navigate]);

  const handleLogin = useCallback((role: UserRole) => {
    setAuthState({ isAuthenticated: true, userRole: role });
    navigate(`/${role}`);
  }, [navigate]);

  // Protected Route Component
  const ProtectedRoute = useCallback(({ 
    children, 
    requiredRole 
  }: { 
    children: React.ReactNode; 
    requiredRole?: UserRole;
  }) => {
    if (!authState.isAuthenticated) {
      return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
    }

    if (requiredRole && authState.userRole !== requiredRole) {
      return <Navigate to={`/${authState.userRole}`} replace />;
    }

    return <>{children}</>;
  }, [authState.isAuthenticated, authState.userRole, location]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path={ROUTES.HOME} 
        element={<Home isAuthenticated={authState.isAuthenticated} />} 
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          authState.isAuthenticated ? (
            <Navigate to={`/${authState.userRole}`} replace />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />
      <Route path={ROUTES.REGISTER} element={<Register />} />

      {/* Admin Routes */}
      <Route
        path={`${ROUTES.ADMIN.DASHBOARD}/*`}
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.MANAGE_ACCOUNTS}
        element={
          <ProtectedRoute requiredRole="admin">
            <ManageAccounts />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.ADMIN.ACTIVITY_LOGS}
        element={
          <ProtectedRoute requiredRole="admin">
            <ActivityLogs />
          </ProtectedRoute>
        }
      />

      {/* Manager Routes */}
      <Route
        path={`${ROUTES.MANAGER.DASHBOARD}/*`}
        element={
          <ProtectedRoute requiredRole="manager">
            <ManagerDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.MANAGER.HEALTH_RECORDS}
        element={
          <ProtectedRoute requiredRole="manager">
            <HealthRecords />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.MANAGER.MEDICAL_STAFF}
        element={
          <ProtectedRoute requiredRole="manager">
            <MedicalStaffManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.MANAGER.ALERTS}
        element={
          <ProtectedRoute requiredRole="manager">
            <AlertsAndNotifications />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.MANAGER.EVENTS}
        element={
          <ProtectedRoute requiredRole="manager">
            <EventAndAppointmentManagement />
          </ProtectedRoute>
        }
      />

      {/* Nurse Routes */}
      <Route
        path={`${ROUTES.NURSE.DASHBOARD}/*`}
        element={
          <ProtectedRoute requiredRole="nurse">
            <NurseDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />

      {/* Parent Routes */}
      <Route
        path={`${ROUTES.PARENT.DASHBOARD}/*`}
        element={
          <ProtectedRoute requiredRole="parent">
            <ParentDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.HEALTH_PROFILE}
        element={
          <ProtectedRoute requiredRole="parent">
            <HealthProfileForm onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.MEDICATION}
        element={
          <ProtectedRoute requiredRole="parent">
            <MedicationForm onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.HEALTH_CHECK.DASHBOARD}
        element={
          <ProtectedRoute requiredRole="parent">
            <HealthCheckDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.HEALTH_CHECK.SCHEDULE}
        element={
          <ProtectedRoute requiredRole="parent">
            <HealthCheckSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.HEALTH_CHECK.REGISTRATION}
        element={
          <ProtectedRoute requiredRole="parent">
            <HealthCheckRegistrationForm />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.HEALTH_CHECK.RESULTS}
        element={
          <ProtectedRoute requiredRole="parent">
            <HealthCheckResults />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.VACCINATION.DASHBOARD}
        element={
          <ProtectedRoute requiredRole="parent">
            <VaccinationEventDashboard onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.VACCINATION.SCHEDULE}
        element={
          <ProtectedRoute requiredRole="parent">
            <VaccinationSchedule />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.VACCINATION.REGISTRATION}
        element={
          <ProtectedRoute requiredRole="parent">
            <VaccinationRegistrationForm />
          </ProtectedRoute>
        }
      />
      <Route
        path={ROUTES.PARENT.VACCINATION.NEWS}
        element={
          <ProtectedRoute requiredRole="parent">
            <VaccinationNews />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default App;
