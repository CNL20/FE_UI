import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles.css";
import Navbar from "../../components/Navbar";
import { Box } from "@mui/material";
import { HealthProfileFormProps } from "../../types";
import { ROUTES } from "../../constants";
import { submitHealthProfile } from "../../services/apiClient";

// Các trường đúng với backend
interface HealthProfileFormData {
  allergies: string;
  chronicDiseases: string;
  visionStatus: string;
  medicalHistory: string;
  medicalRecord: File | null;
}

const HealthProfileForm: React.FC<HealthProfileFormProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { studentId } = useParams<{ studentId: string }>();

  const [formData, setFormData] = useState<HealthProfileFormData>({
    allergies: "",
    chronicDiseases: "",
    visionStatus: "",
    medicalHistory: "",
    medicalRecord: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({
      ...prev,
      medicalRecord: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!studentId) {
        alert("Thiếu mã học sinh!");
        return;
      }
      const studentIdNum = Number(studentId);
      if (isNaN(studentIdNum) || studentIdNum <= 0) {
        alert("Mã học sinh không hợp lệ!");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("studentId", studentId); // đúng tên property backend
      formDataToSend.append("allergies", formData.allergies);
      formDataToSend.append("chronicDiseases", formData.chronicDiseases); // sửa tên
      formDataToSend.append("visionStatus", formData.visionStatus);       // sửa tên
      formDataToSend.append("medicalHistory", formData.medicalHistory);   // sửa tên
      if (formData.medicalRecord) {
        formDataToSend.append("medicalRecord", formData.medicalRecord);
      }

      await submitHealthProfile(formDataToSend);
      alert("Hồ sơ sức khỏe đã được gửi thành công!");
      navigate(ROUTES.PARENT.DASHBOARD);
    } catch (err: any) {
      alert(err.response?.data?.message || "Gửi hồ sơ thất bại, vui lòng thử lại!");
    }
  };

  return (
    <>
      <Navbar onLogout={onLogout} />
      <Box sx={{ height: 68 }} />
      <div
        className="health-profile-form"
        style={{
          padding: "0",
          background: "linear-gradient(to bottom,rgba(21, 187, 216, 0.5), #c2e9fb)",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
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
              <label>Mã học sinh (ID):</label>
              <input
                type="text"
                name="studentId"
                value={studentId || ""}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                required
                disabled // không cho sửa, lấy từ URL param
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Dị ứng:</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                placeholder="Không có"
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
                placeholder="Không có"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Tình trạng mắt:</label>
              <input
                type="text"
                name="visionStatus"
                value={formData.visionStatus}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                placeholder="Bình thường"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label>Tiền sử y tế:</label>
              <input
                type="text"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                placeholder="Không có"
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