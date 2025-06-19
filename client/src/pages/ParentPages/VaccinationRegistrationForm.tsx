import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const VaccinationRegistrationForm: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  // Dữ liệu mẫu, có thể thay bằng props hoặc lấy từ API
  const vaccinationInfo = {
    studentName: "Nguyễn Văn A",
    className: "5A1",
    vaccineType: "COVID-19",
    schedule: "08:00, 20/06/2024",
  };

  const [confirmation, setConfirmation] = useState<"yes" | "no" | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmation) {
      alert("Vui lòng chọn đồng ý hoặc không đồng ý.");
      return;
    }
    alert(
      confirmation === "yes"
        ? "Bạn đã đồng ý cho con tham gia tiêm chủng."
        : "Bạn đã từ chối cho con tham gia tiêm chủng."
    );
    navigate("/parent/vaccination-event-dashboard");
  };

  const handleNavigateToHome = () => {
    navigate("/");
  };
  const handleNavigateToNews = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("school-health-news");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleNavigateToContact = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <Navbar
        {...(onLogout ? { onLogout } : {})}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToNews={handleNavigateToNews}
        onNavigateToContact={handleNavigateToContact}
      />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Xác nhận tiêm chủng</h1>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ marginBottom: "15px" }}>
            <b>Tên học sinh:</b> {vaccinationInfo.studentName}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <b>Lớp:</b> {vaccinationInfo.className}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <b>Loại vaccin:</b> {vaccinationInfo.vaccineType}
          </div>
          <div style={{ marginBottom: "15px" }}>
            <b>Lịch tiêm:</b> {vaccinationInfo.schedule}
          </div>
          <div style={{ margin: "24px 0" }}>
            <b>Phụ huynh học sinh có đồng ý cho con em mình tham gia kì tiêm chủng này không?</b>
            <div style={{ marginTop: "10px" }}>
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  name="confirmation"
                  value="yes"
                  checked={confirmation === "yes"}
                  onChange={() => setConfirmation("yes")}
                />{" "}
                Có
              </label>
              <label>
                <input
                  type="radio"
                  name="confirmation"
                  value="no"
                  checked={confirmation === "no"}
                  onChange={() => setConfirmation("no")}
                />{" "}
                Không
              </label>
            </div>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "10px 24px",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              display: "block",
              margin: "0 auto",
            }}
          >
            Xác nhận
          </button>
        </form>
      </div>
    </>
  );
};

export default VaccinationRegistrationForm;
