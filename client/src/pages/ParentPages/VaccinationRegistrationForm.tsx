import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const VaccinationRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    className: "",
    vaccineType: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Đăng kí tiêm chủng thành công!");
    navigate("/parent/vaccination-event-dashboard");
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Đăng kí tiêm chủng</h1>
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
          <label htmlFor="studentName" style={{ display: "block", marginBottom: "5px" }}>
            Tên học sinh:
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="className" style={{ display: "block", marginBottom: "5px" }}>
            Lớp:
          </label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="vaccineType" style={{ display: "block", marginBottom: "5px" }}>
            Loại vaccin:
          </label>
          <select
            id="vaccineType"
            name="vaccineType"
            value={formData.vaccineType}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            required
          >
            <option value="">Chọn loại vaccin</option>
            <option value="COVID-19">COVID-19</option>
            <option value="Viêm gan B">Viêm gan B</option>
            <option value="Sởi">Sởi</option>
            <option value="Cúm">Cúm</option>
            <option value="Thủy đậu">Thủy đậu</option>
          </select>
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="reason" style={{ display: "block", marginBottom: "5px" }}>
            Lí do đăng kí:
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
            required
          ></textarea>
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
          Gửi
        </button>
      </form>
      <button
        style={{
          backgroundColor: "#2ecc71",
          color: "white",
          padding: "10px 24px",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
          display: "block",
          margin: "32px auto",
        }}
        onClick={() => navigate("/parent/vaccination-event-dashboard")}
      >
        Quay về trang tiêm chủng
      </button>
    </div>
  );
};

export default VaccinationRegistrationForm;
