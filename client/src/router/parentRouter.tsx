import React from "react";
import { Route, Routes, Navigate, useParams } from "react-router-dom";
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
import StudentHealthProfiles from "../pages/ParentPages/StudentHealthProfiles";
import SpecialStudents from "../pages/ParentPages/SpecialStudents";
import StudentSelector from "../pages/ParentPages/StudentSelector"; // <-- Thêm dòng này

// Wrapper để lấy studentId từ URL param và truyền cho HealthProfileForm
const HealthProfileFormWrapper: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { studentId } = useParams<{ studentId: string }>();
  if (!studentId) {
    return <div>Vui lòng truy cập từ danh sách học sinh hoặc chọn học sinh để xem hồ sơ sức khỏe.</div>;
  }
  return <HealthProfileForm onLogout={onLogout} studentId={studentId} />;
};

const ParentRouter: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const safeLogout = onLogout || (() => {});
  return (
    <Routes>
      <Route path="dashboard" element={<ParentDashboard onLogout={safeLogout} />} />
      {/* Route động nhận studentId */}
      <Route path="health-profile-form/:studentId" element={<HealthProfileFormWrapper onLogout={safeLogout} />} />
      {/* Route phụ xử lý thiếu studentId: Dùng StudentSelector */}
      <Route path="health-profile-form" element={<StudentSelector />} />
      <Route path="medication-form" element={<MedicationForm onLogout={safeLogout} />} />
      <Route path="health-check-dashboard" element={<HealthCheckDashboard onLogout={safeLogout} />} />
      <Route path="health-check-registration" element={<HealthCheckRegistrationForm />} />
      <Route path="health-check-results" element={<HealthCheckResults />} />
      <Route path="health-check-schedule" element={<HealthCheckSchedule />} />

      {/* Sự kiện tiêm chủng: dashboard + các chức năng con */}
      <Route path="vaccination-event-dashboard" element={<VaccinationEventDashboard onLogout={safeLogout} />} />
      <Route path="vaccination-event-dashboard/consent/:campaignId" element={<VaccinationRegistrationForm />} />
      <Route path="vaccination-event-dashboard/consent" element={<VaccinationRegistrationForm />} />
      <Route path="vaccination-event-dashboard/schedule" element={<VaccinationSchedule />} />
      <Route path="vaccination-event-dashboard/news" element={<VaccinationNews />} />

      <Route path="vaccination-registration-form/:campaignId" element={<VaccinationRegistrationForm />} />
      <Route path="vaccination-schedule" element={<VaccinationSchedule />} />
      <Route path="vaccination-news" element={<VaccinationNews />} />

      {/* Thông báo */}
      <Route path="notification" element={<ParentNotification />} />

      {/* Thêm 2 route mới theo yêu cầu */}
      <Route path="student-health-profiles" element={<StudentHealthProfiles />} />
      <Route path="special-students" element={<SpecialStudents />} />

      <Route index element={<Navigate to="dashboard" replace />} />
    </Routes>
  );
};

export default ParentRouter;