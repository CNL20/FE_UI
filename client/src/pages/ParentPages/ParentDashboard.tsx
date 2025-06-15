// Parent Dashboard Page
import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../../styles.css";
import { Box } from "@mui/material";
import { ParentDashboardProps } from "../../types";
import { ROUTES } from "../../constants";

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigateToHome = () => {
    navigate(ROUTES.HOME);
  };
  const handleNavigateToNews = () => {
    navigate(ROUTES.HOME);
    setTimeout(() => {
      const el = document.getElementById("school-health-news");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleNavigateToContact = () => {
    navigate(ROUTES.HOME);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleMedicationFormNavigation = () => {
    navigate("/parent-pages/medication-form");
  };
  const handleHealthProfileNavigation = () => {
    navigate("/parent-pages/health-profile-form");
  };
  const handleHealthCheckNavigation = () => {
    navigate("/parent-pages/health-check-dashboard");
  };
  const handleVaccinationEventNavigation = () => {
    navigate("/parent-pages/vaccination-event-dashboard");
  };

  return (
    <>
      <Navbar
        onLogout={onLogout}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToNews={handleNavigateToNews}
        onNavigateToContact={handleNavigateToContact}
      />
      <Box sx={{ height: 68 }} />
      <div
        className="parent-dashboard"
        style={{
          background: "linear-gradient(to bottom, #d4f1f4, #a3d8f4)",
          padding: "50px",
          borderRadius: "15px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(129, 183, 193, 0.5)",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            marginBottom: "30px",
            marginTop: "80px",
          }}
        >
          <h1
            style={{
              color: "rgba(12, 56, 63, 0.5)",
              textAlign: "center",
              fontSize: "32px",
            }}
          >
            Chào phụ huynh đến với hệ thống y tế học đường
          </h1>
        </div>
        <div
          className="dashboard-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "30px",
            marginTop: "20px",
            width: "100%",
          }}
        >
          <div
            className="feature-card"
            style={{
              backgroundColor: "#9b59b6",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleHealthProfileNavigation}
          >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>📋</div>
            <h3>Khai báo hồ sơ sức khỏe</h3>
            <p>Khai báo thông tin sức khỏe của học sinh.</p>
          </div>
          <div
            className="feature-card"
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleMedicationFormNavigation}
          >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>💊</div>
            <h3>Sử dụng thuốc</h3>
            <p>Truy cập form gửi thuốc và gửi yêu cầu sử dụng thuốc.</p>
          </div>
          <div
            className="feature-card"
            style={{
              backgroundColor: "#e67e22",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleHealthCheckNavigation}
          >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>📅📄</div>
            <h3>Khám sức khỏe</h3>
            <p>Xem lịch khám và kết quả khám sức khỏe của con bạn.</p>
          </div>
          <div
            className="feature-card"
            style={{
              backgroundColor: "#2ecc71",
              color: "white",
              padding: "30px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleVaccinationEventNavigation}
          >
            <div style={{ fontSize: "50px", marginBottom: "15px" }}>💉</div>
            <h3>Sự kiện tiêm chủng</h3>
            <p>Xác nhận thông tin tiêm chủng của con bạn.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ParentDashboard;
