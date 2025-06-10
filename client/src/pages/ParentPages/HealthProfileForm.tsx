import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";
import Navbar from "../../components/Navbar";
import { Box } from "@mui/material";

interface HealthProfileFormProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserRole: (userRole: string) => void;
  onLogout: () => void;
}

const HealthProfileForm: React.FC<HealthProfileFormProps> = ({
  setIsAuthenticated,
  setUserRole,
  onLogout,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    class: "",
    gender: "",
    height: "",
    weight: "",
    eyeCondition: "",
    chronicDiseases: "",
    underlyingConditions: "",
    medicalRecord: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      medicalRecord: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
    navigate("/parent-dashboard");
  };

  const handleNavigateToHome = () => navigate("/");
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
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToNews={handleNavigateToNews}
        onNavigateToContact={handleNavigateToContact}
        onLogout={onLogout}
      />
      <Box sx={{ height: 68 }} />
      <div
        className="health-profile-form"
        style={{
          padding: "0",
          background:
            "linear-gradient(to bottom,rgba(21, 187, 216, 0.5), #c2e9fb)",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "800px", // Increased width
            margin: "0 auto",
            background: "rgba(236, 238, 238, 0.5)",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", color: "rgba(16, 59, 67, 0.5)" }}>
            Hồ sơ sức khỏe học sinh
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#7f8c8d",
              marginBottom: "20px",
            }}
          >
            Hãy đảm bảo những thông tin này được cập nhật liên tục.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "15px" }}>
              <label>Tên học sinh:</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Lớp:</label>
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Giới tính:</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Chiều cao (cm):</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Cân nặng (kg):</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Tình trạng mắt:</label>
              <input
                type="text"
                name="eyeCondition"
                value={formData.eyeCondition}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Bệnh mãn tính:</label>
              <input
                type="text"
                name="chronicDiseases"
                value={formData.chronicDiseases}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Bệnh nền:</label>
              <input
                type="text"
                name="underlyingConditions"
                value={formData.underlyingConditions}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Gửi ảnh hoặc hồ sơ bệnh án:</label>
              <input
                type="file"
                name="medicalRecord"
                onChange={handleFileChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Gửi
            </button>
          </form>
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
      </div>
    </>
  );
};

export default HealthProfileForm;
