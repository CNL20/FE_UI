import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { VaccinationEventDashboardProps } from "../../types";
import { ROUTES } from "../../constants";

const VaccinationEventDashboard: React.FC<VaccinationEventDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();

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

  const handleNavigateToVaccinationRegistration = () => {
    navigate("/parent/vaccination-registration");
  };
  const handleNavigateToVaccinationSchedule = () => {
    navigate("/parent/vaccination-schedule");
  };
  const handleNavigateToVaccinationNews = () => {
    navigate("/parent/vaccination-news");
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
        style={{
          padding: "0",
          width: "100%",
          minHeight: "100vh",
          background: "rgba(66, 137, 150, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            padding: "20px",
            backgroundColor: "rgba(65, 92, 117, 0.3)",
            borderRadius: "10px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            width: "100%",
            marginTop: "70px",
          }}
        >
          <h2
            style={{ color: "white", marginBottom: "10px", fontSize: "24px" }}
          >
            Sự kiện tiêm chủng
          </h2>
          <p style={{ color: "white", fontSize: "16px" }}>
            Chọn một trong các mục bên dưới để tiếp tục
          </p>
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            backgroundColor: "rgba(85, 141, 160, 0.5)",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              backgroundColor: "#2ecc71",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleNavigateToVaccinationRegistration}
          >
            <h3>Xác nhận tiêm chủng</h3>
            <p>Xác nhận tiêm chủng vaccin cho học sinh.</p>
          </div>
          <div
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleNavigateToVaccinationSchedule}
          >
            <h3>Lịch Tiêm chủng</h3>
            <p>Xem lịch tiêm chủng vaccin của học sinh.</p>
          </div>
          <div
            style={{
              backgroundColor: "#9b59b6",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleNavigateToVaccinationNews}
          >
            <h3>Tin tức về vaccin</h3>
            <p>Xem thông tin và lợi ích của các loại vaccin hiện có.</p>
          </div>
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <button
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "10px 24px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/parent")}
          >
            Quay về
          </button>
          
        </div>
      </div>
    </>
  );
};

export default VaccinationEventDashboard;
