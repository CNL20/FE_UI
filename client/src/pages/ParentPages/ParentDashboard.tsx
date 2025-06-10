// Parent Dashboard Page
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

const ParentDashboard = () => {
  const navigate = useNavigate();

  const handleMedicationFormNavigation = () => {
    navigate("/medication-form");
  };

  const handleHealthProfileNavigation = () => {
    navigate("/parent-pages/health-profile");
  };

  const handleHealthCheckNavigation = () => {
    navigate("/parent-pages/health-check-dashboard");
  };

  const handleHomeNavigation = () => {
    navigate("/");
  };

  const handleVaccinationEventNavigation = () => {
    navigate("/parent-pages/vaccination-event-dashboard");
  };

  return (
    <div className="parent-dashboard" style={{ background: "linear-gradient(to bottom, #d4f1f4, #a3d8f4)", padding: "50px", borderRadius: "15px", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative" }}>
      <div style={{
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 30px",
  backgroundColor: "#2c3e50",
  color: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(62, 111, 170, 0.2)",
  width: "100%",
  position: "absolute",
  top: "0",
  left: "0",
}}>
  <div style={{ flex: 1, textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>Hệ thống y tế học đường</div>
  <div style={{ display: "flex", gap: "30px" }}>
    <button style={{ backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: "18px" }}>Trang chủ</button>
    <button style={{ backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: "18px" }}>Đăng xuất</button>
  </div>
</div>
      <div style={{ backgroundColor: "rgba(129, 183, 193, 0.5)", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "30px", marginTop: "80px" }}>
        <h1 style={{ color: "rgba(12, 56, 63, 0.5)", textAlign: "center", fontSize: "32px" }}>
          Chào phụ huynh đến với hệ thống y tế học đường
        </h1>
      </div>
      <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "30px", marginTop: "20px", width: "100%" }}>
        <div className="feature-card" style={{ backgroundColor: "#9b59b6", color: "white", padding: "30px", borderRadius: "10px", textAlign: "center", cursor: "pointer" }} onClick={handleHealthProfileNavigation}>
          <div style={{ fontSize: "50px", marginBottom: "15px" }}>📋</div>
          <h3>Khai báo hồ sơ sức khỏe</h3>
          <p>Khai báo thông tin sức khỏe của học sinh.</p>
        </div>
        <div className="feature-card" style={{ backgroundColor: "#3498db", color: "white", padding: "30px", borderRadius: "10px", textAlign: "center", cursor: "pointer" }} onClick={handleMedicationFormNavigation}> 
          <div style={{ fontSize: "50px", marginBottom: "15px" }}>💊</div>
          <h3>Sử dụng thuốc</h3>
          <p>Truy cập form gửi thuốc và gửi yêu cầu sử dụng thuốc.</p>
        </div>
        <div className="feature-card" style={{ backgroundColor: "#e67e22", color: "white", padding: "30px", borderRadius: "10px", textAlign: "center", cursor: "pointer" }} onClick={handleHealthCheckNavigation}>
          <div style={{ fontSize: "50px", marginBottom: "15px" }}>📅📄</div>
          <h3>Khám sức khỏe</h3>
          <p>Xem lịch khám và kết quả khám sức khỏe của con bạn.</p>
        </div>
        <div className="feature-card" style={{ backgroundColor: "#2ecc71", color: "white", padding: "30px", borderRadius: "10px", textAlign: "center", cursor: "pointer" }} onClick={handleVaccinationEventNavigation}>
          <div style={{ fontSize: "50px", marginBottom: "15px" }}>💉</div>
          <h3>Sự kiện tiêm chủng</h3>
          <p>Xác nhận thông tin tiêm chủng của con bạn.</p>
        </div>
      </div>
      <div style={{
        marginTop: "40px", // Adjusted margin to move the button down
        textAlign: "center",
        padding: "5px",
        backgroundColor: "#3498db",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "20%", // Reduced width for a shorter button
        cursor: "pointer",
        color: "white",
        alignSelf: "center", // Centered the button horizontally
      }}>
        <button style={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }} onClick={() => window.location.href = '/home'}>
          Quay về Trang chủ
        </button>
      </div>
      <div style={{ marginTop: "30px", textAlign: "center", padding: "20px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "100%" }}>
        <h3 style={{ color: "#2c3e50" }}>Trợ giúp</h3>
        <p style={{ color: "#7f8c8d" }}>Hotline nhà trường: 09797979 📞</p>
        <p style={{ color: "#7f8c8d" }}>Email nhà trường: ythd@gmail.com ✉️</p>
      </div>
      <footer style={{ textAlign: "center", marginTop: "20px", color: "#2c3e50", fontSize: "18px" }}>
        Sức khỏe con bạn là sứ mệnh của chúng tôi
      </footer>
    </div>
  );
};

export default ParentDashboard;
