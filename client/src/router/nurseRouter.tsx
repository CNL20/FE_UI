import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NurseDashboard from "../pages/NursePages/NurseDashboard";

const NurseRouter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const safeLogout = onLogout || (() => {});

  return (
    <Routes>
      <Route path="dashboard" element={<NurseDashboard onLogout={safeLogout} />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default NurseRouter;
