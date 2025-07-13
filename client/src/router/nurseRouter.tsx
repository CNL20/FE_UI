import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NurseDashboard from "../pages/NursePages/NurseDashboard";
import HealthCheckAttendancePage from "../pages/NursePages/HealthCheckAttendancePage";
import HealthCheckResultsPage from "../pages/NursePages/HealthCheckResultsPage";

const NurseRouter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const safeLogout = onLogout || (() => {});

  return (
    <Routes>
      <Route path="dashboard" element={<NurseDashboard onLogout={safeLogout} />} />
      <Route path="health-check/:campaignId/:scheduleId/attendance" element={<HealthCheckAttendancePage />} />
      <Route path="health-check/:campaignId/:scheduleId/results" element={<HealthCheckResultsPage />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default NurseRouter;
