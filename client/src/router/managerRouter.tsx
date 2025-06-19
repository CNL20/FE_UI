import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ManagerDashboard from "../pages/ManagerPages/ManagerDashboard";
import AlertsAndNotifications from "../pages/ManagerPages/AlertsAndNotifications";
import EventAndAppointmentManagement from "../pages/ManagerPages/EventAndAppointmentManagement";
import HealthRecords from "../pages/ManagerPages/HealthRecords";
import MedicalStaffManagement from "../pages/ManagerPages/MedicalStaffManagement";

const ManagerRouter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const safeLogout = onLogout || (() => {});
  return (
    <Routes>
      <Route path="dashboard" element={<ManagerDashboard onLogout={safeLogout} />} />
      <Route path="alerts-and-notifications" element={<AlertsAndNotifications onLogout={safeLogout} />} />
      <Route path="event-and-appointment-management" element={<EventAndAppointmentManagement onLogout={safeLogout} />} />
      <Route path="health-records" element={<HealthRecords onLogout={safeLogout} />} />
      <Route path="medical-staff-management" element={<MedicalStaffManagement onLogout={safeLogout} />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ManagerRouter;
