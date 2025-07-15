import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NurseDashboard from "../pages/NursePages/NurseDashboard";
import NurseHealthCheckCampaignList from "../pages/NursePages/NurseHealthCheckCampaignList";
import NurseHealthCheckCampaignDetail from "../pages/NursePages/NurseHealthCheckCampaignDetail"; // Thêm dòng này

const NurseRouter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const safeLogout = onLogout || (() => {});

  return (
    <Routes>
      <Route path="dashboard" element={<NurseDashboard onLogout={safeLogout} />} />
      <Route path="health-check-campaigns" element={<NurseHealthCheckCampaignList />} />
      <Route path="health-check-campaigns/:id" element={<NurseHealthCheckCampaignDetail />} /> {/* Thêm route này */}
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default NurseRouter;