import React from "react";

const VaccinationEventDashboard = () => {
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
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "1000",
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
        marginTop: "70px",
      }}>
        <h2 style={{ color: "white", marginBottom: "10px", fontSize: "24px" }}>Sự kiện tiêm chủng</h2>
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
          <h3>Đăng kí tiêm chủng</h3>
          <p>Đăng kí lịch tiêm chủng cho học sinh.</p>
        </div>
        <div style={{
          backgroundColor: "#3498db",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          cursor: "pointer",
        }}>
          <h3>Lịch Tiêm chủng</h3>
          <p>Xem lịch tiêm chủng của học sinh.</p>
        </div>
        <div style={{
          backgroundColor: "#e67e22",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          cursor: "pointer",
        }}>
          <h3>Tin tức vaccin</h3>
          <p>Cập nhật tin tức về các loại vaccin.</p>
        </div>
      </div>
      <div style={{
        marginTop: "20px",
        textAlign: "center",
        padding: "5px",
        backgroundColor: "#3498db",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        width: "30%",
        cursor: "pointer",
        color: "white",
      }}>
        <button style={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          fontSize: "18px",
          cursor: "pointer",
        }} onClick={() => window.location.href = '/'}>
          Quay về Trang chủ
        </button>
      </div>
      <div style={{ marginTop: "30px", textAlign: "center", padding: "20px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "100%" }}>
        <h3 style={{ color: "#2c3e50" }}>Trợ giúp</h3>
        <p style={{ color: "#7f8c8d" }}>Hotline nhà trường: 09797979 📞</p>
        <p style={{ color: "#7f8c8d" }}>Email nhà trường: ythd@gmail.com ✉️</p>
      </div>
    </div>
  );
};

export default VaccinationEventDashboard;
