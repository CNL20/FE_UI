import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { HealthCheckDashboardProps } from "../../types";

const HealthCheckDashboard: React.FC<HealthCheckDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleNavigateToSchedule = () => {
    navigate("/parent/health-check-schedule");
  };

  const handleNavigateToRegistration = () => {
    navigate("/parent/health-check-registration");
  };

  const handleNavigateToResults = () => {
    navigate("/parent/health-check-results");
  };
  return (
    <>
      <Navbar
        onLogout={onLogout}
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
          }}
        >
          <h2
            style={{ color: "white", marginBottom: "10px", fontSize: "24px" }}
          >
            Khám sức khỏe
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
              backgroundColor: "#9b59b6",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleNavigateToSchedule}
          >
            <h3>Lịch Khám sức khỏe</h3>
            <p>Xem lịch khám sức khỏe của học sinh.</p>
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
            onClick={handleNavigateToRegistration}
          >
            <h3>Đăng kí khám sức khỏe</h3>
            <p>Đăng kí lịch khám sức khỏe cho học sinh.</p>
          </div>
          <div
            style={{
              backgroundColor: "#e67e22",
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleNavigateToResults}
          >
            <h3>Kết quả khám sức khỏe</h3>
            <p>Xem kết quả khám sức khỏe của học sinh.</p>
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

export default HealthCheckDashboard;
