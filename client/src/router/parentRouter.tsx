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
import ParentNotification from "../pages/ParentPages/ParentNotification";
import ParentHealthCheckNotifications from "../pages/ParentPages/ParentHealthCheckNotifications";
import HealthCheckResultsDetail from "../pages/ParentPages/HealthCheckResultsDetail";

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

      {/* Sự kiện tiêm chủng: dashboard + các chức năng con */}
      <Route path="vaccination-event-dashboard" element={<VaccinationEventDashboard onLogout={safeLogout} />} />
      {/* Khi bấm vào "Xác nhận tiêm chủng" sẽ navigate sang route này (có thể truyền campaignId hoặc không tuỳ hệ thống) */}
      <Route path="vaccination-event-dashboard/consent/:campaignId" element={<VaccinationRegistrationForm />} />
      {/* Nếu không có campaignId, bạn có thể thêm route này: */}
      <Route path="vaccination-event-dashboard/consent" element={<VaccinationRegistrationForm />} />
      <Route path="vaccination-event-dashboard/schedule" element={<VaccinationSchedule />} />
      <Route path="vaccination-event-dashboard/news" element={<VaccinationNews />} />

      {/* Nếu có phiếu đăng ký/vaccination form theo chiến dịch thì vẫn giữ */}
      <Route path="vaccination-registration-form/:campaignId" element={<VaccinationRegistrationForm />} />

      {/* Các đường dẫn xem lịch, xem tin tức, ... */}
      <Route path="vaccination-schedule" element={<VaccinationSchedule />} />
      <Route path="vaccination-news" element={<VaccinationNews />} />

      {/* Thông báo */}
      <Route path="notification" element={<ParentNotification />} />
      <Route path="health-check-notifications" element={<ParentHealthCheckNotifications />} />
      <Route path="health-check/results/:studentId/:campaignId" element={<HealthCheckResultsDetail />} />
      
      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ParentRouter;