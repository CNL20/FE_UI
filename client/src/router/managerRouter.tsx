import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ManagerDashboard from "../pages/ManagerPages/ManagerDashboard";
import AlertsAndNotifications from "../pages/ManagerPages/AlertsAndNotifications";
import EventAndAppointmentManagement from "../pages/ManagerPages/EventAndAppointmentManagement";
import HealthRecords from "../pages/ManagerPages/HealthRecords";
import MedicalStaffManagement from "../pages/ManagerPages/MedicalStaffManagement";
import VaccinationCampaigns from "../pages/ManagerPages/VaccinationCampaigns";
import VaccinationConsents from "../pages/ManagerPages/VaccinationConsents";
import AssignNurse from "../pages/ManagerPages/AssignNurse";
import VaccinationResults from "../pages/ManagerPages/VaccinationResults";
import HealthCheckCampaigns from "../pages/ManagerPages/HealthCheckCampaigns";
import QuickAccess from "../pages/ManagerPages/QuickAccess";

const ManagerRouter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const safeLogout = onLogout || (() => {});
  return (
    <Routes>
      <Route path="dashboard" element={<ManagerDashboard onLogout={safeLogout} />} />
      <Route path="alerts-and-notifications" element={<AlertsAndNotifications onLogout={safeLogout} />} />
      <Route path="event-and-appointment-management" element={<EventAndAppointmentManagement onLogout={safeLogout} />} />
      <Route path="health-records" element={<HealthRecords onLogout={safeLogout} />} />
      <Route path="medical-staff-management" element={<MedicalStaffManagement onLogout={safeLogout} />} />

      {/* Bổ sung các route tiêm chủng */}
      <Route path="vaccination-campaigns" element={<VaccinationCampaigns />} />
      <Route path="vaccination-campaigns/:id/consents" element={<VaccinationConsents />} />
      <Route path="vaccination-campaigns/:id/assign-nurse" element={<AssignNurse />} />
      <Route path="vaccination-campaigns/:id/results" element={<VaccinationResults />} />
      <Route path="health-check-campaigns" element={<HealthCheckCampaigns />} />
      <Route path="health-records/quick-access" element={<QuickAccess />} />    
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ManagerRouter;