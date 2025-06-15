import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { MedicationFormProps } from "../../types";
import { ROUTES } from "../../constants";

const MedicationForm: React.FC<MedicationFormProps> = ({ onLogout }) => {
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

  const [formData, setFormData] = useState({
    ngayThangNam: "",
    khungGio: "",
    hoTenPhuHuynh: "",
    hoTenHocSinh: "",
    lop: "",
    gioiTinh: "",
    lyDoGuiThuoc: "",
    soLanUong: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Thông tin đã gửi:", formData);
    alert("Thông tin đã được gửi thành công!");
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
          }}
        >
          <h2
            style={{ color: "white", marginBottom: "10px", fontSize: "24px" }}
          >
            Mời anh/chị điền vào đơn gửi thuốc
          </h2>
          <p style={{ color: "white", fontSize: "16px" }}>
            Hãy giúp trường nhà chia từng liều thuốc nhé
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          style={{
            width: "80%",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: "rgba(85, 141, 160, 0.5)",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <label style={{ color: "#ffffff" }}>
            Ngày tháng năm:
            <input
              type="date"
              name="ngayThangNam"
              value={formData.ngayThangNam}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                width: "100%",
              }}
            />
          </label>
          <label style={{ color: "#ffffff" }}>
            Khung giờ sẽ đến đưa thuốc:
            <input
              type="time"
              name="khungGio"
              value={formData.khungGio}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                width: "100%",
              }}
            />
          </label>
          <label style={{ color: "#ffffff" }}>
            Họ tên phụ huynh:
            <input
              type="text"
              name="hoTenPhuHuynh"
              value={formData.hoTenPhuHuynh}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                width: "100%",
              }}
            />
          </label>
          <label style={{ color: "#ffffff" }}>
            Họ tên học sinh:
            <input
              type="text"
              name="hoTenHocSinh"
              value={formData.hoTenHocSinh}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                width: "100%",
              }}
            />
          </label>
          <label style={{ color: "#ffffff" }}>
            Lớp:
            <input
              type="text"
              name="lop"
              value={formData.lop}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                width: "100%",
              }}
            />
          </label>
          <label style={{ color: "#ffffff" }}>
            Giới tính học sinh:
            <select
              name="gioiTinh"
              value={formData.gioiTinh}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                width: "100%",
              }}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </label>
          <label style={{ color: "#ffffff" }}>
            Lý do gửi thuốc (bệnh của học sinh):
            <textarea
              name="lyDoGuiThuoc"
              value={formData.lyDoGuiThuoc}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                width: "100%",
                height: "100px",
              }}
            />
          </label>
          <label style={{ color: "#ffffff" }}>
            Số lần uống:
            <input
              type="number"
              name="soLanUong"
              value={formData.soLanUong}
              onChange={handleChange}
              required
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "none",
                width: "100%",
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              backgroundColor: "#3498db",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Gửi
          </button>
        </form>
        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            padding: "20px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            width: "80%",
            maxWidth: "800px",
          }}
        >
          <h3 style={{ color: "#2c3e50" }}>Trạng thái sử dụng thuốc</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#3498db", color: "white" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Tên học sinh
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Lớp
                </th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Tình trạng
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Nguyễn Văn A
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  5A
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Đã cho uống thuốc
                </td>
              </tr>
              <tr>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Trần Thị B
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  4B
                </td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                  Chưa cho uống thuốc
                </td>
              </tr>
            </tbody>
          </table>
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

export default MedicationForm;
