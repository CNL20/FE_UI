import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ManagerDashboard from "../pages/ManagerPages/ManagerDashboard";
import AlertsAndNotifications from "../pages/ManagerPages/AlertsAndNotifications";
import EventAndAppointmentManagement from "../pages/ManagerPages/EventAndAppointmentManagement";
import HealthRecords from "../pages/ManagerPages/HealthRecords";
import MedicalStaffManagement from "../pages/ManagerPages/MedicalStaffManagement";
import VaccinationCampaigns from "../pages/ManagerPages/VaccinationCampaigns";
import CampaignConsents from "../pages/ManagerPages/CampaignConsents";
import HealthCampaignsPage from "../pages/ManagerPages/HealthCampaignsPage";
import HealthCampaignDetailPage from "../pages/ManagerPages/HealthCampaignDetailPage";
import AssignNursesPage from "../pages/ManagerPages/AssignNursesPage";

const ManagerRouter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const safeLogout = onLogout || (() => {});
  return (
    <Routes>
      <Route path="dashboard" element={<ManagerDashboard onLogout={safeLogout} />} />
      <Route path="alerts-and-notifications" element={<AlertsAndNotifications onLogout={safeLogout} />} />
      <Route path="event-and-appointment-management" element={<EventAndAppointmentManagement onLogout={safeLogout} />} />
      <Route path="health-records" element={<HealthRecords onLogout={safeLogout} />} />
      <Route path="medical-staff-management" element={<MedicalStaffManagement onLogout={safeLogout} />} />
      <Route path="vaccination-campaigns" element={<VaccinationCampaigns />} />
      <Route path="vaccination-campaigns/:campaignId/consents" element={<CampaignConsents />} />
      <Route path="health-campaigns" element={<HealthCampaignsPage />} />
      <Route path="health-campaigns/:campaignId/details" element={<HealthCampaignDetailPage />} />
      <Route path="health-campaigns/:campaignId/assign-nurses" element={<AssignNursesPage />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ManagerRouter;