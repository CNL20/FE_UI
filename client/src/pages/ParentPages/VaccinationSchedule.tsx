import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const VaccinationSchedule: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

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

  const mockSchedule = [
    {
      date: "2025-06-15",
      time: "09:00 AM",
      className: "5A",
      vaccineType: "COVID-19",
      preparation: "Mang theo giấy tờ tùy thân và phiếu đăng kí tiêm chủng."
    },
    {
      date: "2025-06-16",
      time: "10:00 AM",
      className: "5B",
      vaccineType: "Viêm gan B",
      preparation: "Không ăn sáng trước khi tiêm."
    },
    {
      date: "2025-06-17",
      time: "11:00 AM",
      className: "5C",
      vaccineType: "Sởi",
      preparation: "Mang theo sổ khám sức khỏe."
    }
  ];

  return (
    <>
      <Navbar {...(onLogout ? { onLogout } : {})}
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
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Lịch tiêm chủng</h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#3498db", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Ngày</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Thời gian</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Lớp</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Loại vaccin</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Chuẩn bị</th>
            </tr>
          </thead>
          <tbody>
            {mockSchedule.map((schedule, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{schedule.date}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{schedule.time}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{schedule.className}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{schedule.vaccineType}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{schedule.preparation}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </>
  );
};

export default VaccinationSchedule;
