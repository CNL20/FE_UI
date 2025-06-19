import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
  
const HealthCheckResults: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
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

  const mockResults = [
    {
      studentName: "Nguyen Van A",
      className: "5A",
      height: "140 cm",
      weight: "35 kg",
      eyesight: "20/20",
      dentalHealth: "Tốt",
      bloodQuality: "Bình thường",
    },
    {
      studentName: "Tran Thi B",
      className: "5B",
      height: "135 cm",
      weight: "32 kg",
      eyesight: "20/25",
      dentalHealth: "Cần chú ý",
      bloodQuality: "Bình thường",
    },
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
        <nav
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "10px",
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Kết quả khám sức khỏe
        </nav>
        <div
          style={{
            backgroundColor: "#f4f4f4",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ color: "#3498db", textAlign: "center" }}>Kết quả khám sức khỏe</h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#3498db", color: "white" }}>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Tên học sinh</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Lớp</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Chiều cao</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Cân nặng</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Mắt</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Răng miệng</th>
                <th style={{ padding: "10px", border: "1px solid #ddd" }}>Chất lượng máu</th>
              </tr>
            </thead>
            <tbody>
              {mockResults.map((result, index) => (
                <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff" }}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{result.studentName}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{result.className}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{result.height}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{result.weight}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{result.eyesight}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{result.dentalHealth}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{result.bloodQuality}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          style={{
            backgroundColor: "#e67e22",
            color: "white",
            padding: "10px 24px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer",
            display: "block",
            margin: "32px auto",
          }}
          onClick={() => navigate("/parent/health-check-dashboard")}
        >
          Quay Về
        </button>
      </div>
    </>
  );
};

export default HealthCheckResults;
