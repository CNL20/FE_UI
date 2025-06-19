import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/AdminPages/AdminDashboard";
import ManageAccounts from "../pages/AdminPages/ManageAccounts";
import ActivityLogs from "../pages/AdminPages/ActivityLogs";

const AdminRouter: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard onLogout={onLogout} />} />
      <Route path="manage-accounts" element={<ManageAccounts onLogout={onLogout} />} />
      <Route path="activity-logs" element={<ActivityLogs onLogout={onLogout} />} />
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default AdminRouter;
