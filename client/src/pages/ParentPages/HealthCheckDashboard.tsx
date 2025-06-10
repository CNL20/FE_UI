import React from "react";
import { useNavigate } from "react-router-dom";

const HealthCheckDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: "0",
      width: "100%",
      minHeight: "100vh",
      background: "rgba(66, 137, 150, 0.5)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    }}>
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
      <div style={{
        textAlign: "center",
        marginBottom: "40px",
        padding: "20px",
        backgroundColor: "rgba(65, 92, 117, 0.3)",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        width: "100%",
      }}>
        <h2 style={{ color: "white", marginBottom: "10px", fontSize: "24px" }}>Khám sức khỏe</h2>
        <p style={{ color: "white", fontSize: "16px" }}>Chọn một trong các mục bên dưới để tiếp tục</p>
      </div>
      <div style={{
        width: "100%",
        maxWidth: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        backgroundColor: "rgba(85, 141, 160, 0.5)",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}>
        <div style={{
          backgroundColor: "#9b59b6",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          cursor: "pointer",
        }}>
          <h3>Lịch Khám sức khỏe</h3>
          <p>Xem lịch khám sức khỏe của học sinh.</p>
        </div>
        <div style={{
          backgroundColor: "#3498db",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          cursor: "pointer",
        }}>
          <h3>Đăng kí khám sức khỏe</h3>
          <p>Đăng kí lịch khám sức khỏe cho học sinh.</p>
        </div>
        <div style={{
          backgroundColor: "#e67e22",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          cursor: "pointer",
        }}>
          <h3>Kết quả khám sức khỏe</h3>
          <p>Xem kết quả khám sức khỏe của học sinh.</p>
        </div>
      </div>
      <button onClick={() => navigate("/")} style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", width: "auto" }}>Quay về Trang chủ</button>
      <div style={{ marginTop: "30px", textAlign: "center", padding: "20px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "100%" }}>
        <h3 style={{ color: "#2c3e50" }}>Trợ giúp</h3>
        <p style={{ color: "#7f8c8d" }}>Hotline nhà trường: 09797979 📞</p>
        <p style={{ color: "#7f8c8d" }}>Email nhà trường: ythd@gmail.com ✉️</p>
      </div>
    </div>
  );
};

export default HealthCheckDashboard;
