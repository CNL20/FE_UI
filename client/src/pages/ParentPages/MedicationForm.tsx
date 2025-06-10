import React, { useState } from "react";

const MedicationForm = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Thông tin đã gửi:", formData);
    alert("Thông tin đã được gửi thành công!");
  };

  return (
    <div style={{
      padding: "0",
      width: "100%",
      minHeight: "100vh",
      background: "rgba(66, 137, 150, 0.5)", // Changed outer container to light blue
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px 30px", backgroundColor: "#2c3e50", color: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(62, 111, 170, 0.2)", width: "100%" }}>
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
      }}>
        <h2 style={{ color: "white", marginBottom: "10px", fontSize: "24px" }}>Mời anh/chị điền vào đơn gửi thuốc</h2>
        <p style={{ color: "white", fontSize: "16px" }}>Hãy giúp trường nhà chia từng liều thuốc nhé</p>
      </div>
      <form
        onSubmit={handleSubmit}
        style={{
          width: "80%",
          maxWidth: "800px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "rgba(85, 141, 160, 0.5)", // Changed to light blue
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
      <div style={{ marginTop: "30px", textAlign: "center", padding: "20px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "80%", maxWidth: "800px" }}>
        <h3 style={{ color: "#2c3e50" }}>Trạng thái sử dụng thuốc</h3>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#3498db", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tên học sinh</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Lớp</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tình trạng</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Nguyễn Văn A</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>5A</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Đã cho uống thuốc</td>
            </tr>
            <tr>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Trần Thị B</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>4B</td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>Chưa cho uống thuốc</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: "30px", textAlign: "center", padding: "20px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", width: "80%", maxWidth: "800px" }}>
        <h3 style={{ color: "#2c3e50" }}>Trợ giúp</h3>
        <p style={{ color: "#7f8c8d" }}>Hotline nhà trường: 09797979 📞</p>
        <p style={{ color: "#7f8c8d" }}>Email nhà trường: ythd@gmail.com ✉️</p>
      </div>
    </div>
  );
};

export default MedicationForm;
