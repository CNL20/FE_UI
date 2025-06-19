import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ParentDashboard from "../pages/ParentPages/ParentDashboard";
import HealthCheckDashboard from "../pages/ParentPages/HealthCheckDashboard";
import HealthCheckRegistrationForm from "../pages/ParentPages/HealthCheckRegistrationForm";
import HealthProfileForm from "../pages/ParentPages/HealthProfileForm";
import MedicationForm from "../pages/ParentPages/MedicationForm";
import HealthCheckResults from "../pages/ParentPages/HealthCheckResults";
import VaccinationEventDashboard from "../pages/ParentPages/VaccinationEventDashboard";
import VaccinationRegistrationForm from "../pages/ParentPages/VaccinationRegistrationForm";
import VaccinationSchedule from "../pages/ParentPages/VaccinationSchedule";
import VaccinationNews from "../pages/ParentPages/VaccinationNews";
import HealthCheckSchedule from "../pages/ParentPages/HealthCheckSchedule";
const ParentRouter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const safeLogout = onLogout || (() => {});
  return (
    <Routes>
      <Route path="dashboard" element={<ParentDashboard onLogout={safeLogout} />} />
      <Route path="health-profile-form" element={<HealthProfileForm onLogout={safeLogout} />} />
      <Route path="medication-form" element={<MedicationForm onLogout={safeLogout} />} />
      <Route path="health-check-dashboard" element={<HealthCheckDashboard onLogout={safeLogout} />} />
      <Route path="health-check-registration" element={<HealthCheckRegistrationForm />} />
      <Route path="health-check-results" element={<HealthCheckResults />} />
      <Route path="health-check-schedule" element={<HealthCheckSchedule />} />
      <Route path="vaccination-event-dashboard" element={<VaccinationEventDashboard onLogout={safeLogout} />} />
      <Route path="vaccination-registration" element={<VaccinationRegistrationForm />} />
      <Route path="vaccination-schedule" element={<VaccinationSchedule />} />
      <Route path="vaccination-news" element={<VaccinationNews />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ParentRouter;
