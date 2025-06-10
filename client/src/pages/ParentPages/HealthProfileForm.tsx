import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles.css";

const HealthProfileForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, medicalRecord: e.target.files ? e.target.files[0] : null });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
    navigate("/parent-dashboard");
  };

  return (
    <div
      className="health-profile-form"
      style={{
        padding: "0",
        background: "linear-gradient(to bottom,rgba(21, 187, 216, 0.5), #c2e9fb)",
        minHeight: "100vh",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", backgroundColor: "#2c3e50", color: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", width: "100%" }}>
        <div style={{ flex: 1, textAlign: "center", fontSize: "24px", fontWeight: "bold" }}>Hệ thống y tế học đường</div>
        <div style={{ display: "flex", gap: "30px" }}>
          <button style={{ backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: "18px" }}>Trang chủ</button>
          <button style={{ backgroundColor: "transparent", border: "none", color: "white", cursor: "pointer", fontSize: "18px" }}>Đăng xuất</button>
        </div>
      </div>
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
        <h2 style={{ textAlign: "center", color: "rgba(16, 59, 67, 0.5)" }}>Hồ sơ sức khỏe học sinh</h2>
        <p style={{ textAlign: "center", color: "#7f8c8d", marginBottom: "20px" }}>Hãy đảm bảo những thông tin này được cập nhật liên tục.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Tên học sinh:</label>
            <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Lớp:</label>
            <input type="text" name="class" value={formData.class} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Giới tính:</label>
            <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required>
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Chiều cao (cm):</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Cân nặng (kg):</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Tình trạng mắt:</label>
            <input type="text" name="eyeCondition" value={formData.eyeCondition} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} required />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Bệnh mãn tính:</label>
            <input type="text" name="chronicDiseases" value={formData.chronicDiseases} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Bệnh nền:</label>
            <input type="text" name="underlyingConditions" value={formData.underlyingConditions} onChange={handleChange} style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
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
      </div>
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ color: "#2c3e50" }}>Trợ giúp</h3>
        <p style={{ color: "#7f8c8d" }}>Hotline nhà trường: 09797979 📞</p>
        <p style={{ color: "#7f8c8d" }}>Email nhà trường: ythd@gmail.com ✉️</p>
      </div>
    </div>
  );
};

export default HealthProfileForm;
