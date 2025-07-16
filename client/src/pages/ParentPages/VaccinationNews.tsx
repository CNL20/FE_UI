import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const VaccinationNews: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();

  const vaccineNews = [
    {
      vaccineName: "COVID-19",
      description: "Vaccin COVID-19 giúp giảm nguy cơ mắc bệnh và biến chứng nghiêm trọng.",
      benefits: "Bảo vệ sức khỏe cộng đồng, giảm nguy cơ lây nhiễm.",
    },
    {
      vaccineName: "Viêm gan B",
      description: "Vaccin Viêm gan B giúp ngăn ngừa bệnh viêm gan B và các biến chứng liên quan.",
      benefits: "Bảo vệ gan, giảm nguy cơ ung thư gan.",
    },
    {
      vaccineName: "Sởi",
      description: "Vaccin Sởi giúp ngăn ngừa bệnh sởi và các biến chứng nghiêm trọng.",
      benefits: "Bảo vệ trẻ em khỏi bệnh sởi, giảm nguy cơ tử vong.",
    },
    {
      vaccineName: "Cúm",
      description: "Vaccin Cúm giúp giảm nguy cơ mắc bệnh cúm và biến chứng nghiêm trọng.",
      benefits: "Bảo vệ sức khỏe trong mùa cúm, giảm nguy cơ lây lan.",
    },
    {
      vaccineName: "Thủy đậu",
      description: "Vaccin Thủy đậu giúp ngăn ngừa bệnh thủy đậu và các biến chứng nghiêm trọng.",
      benefits: "Bảo vệ trẻ em khỏi bệnh thủy đậu, giảm nguy cơ biến chứng.",
    },
  ];
  return (
    <>
      <Navbar {...(onLogout ? { onLogout } : {})}
      />
      <div
        style={{
          padding: "20px",
          backgroundColor: "#f4f4f4",
          minHeight: "100vh",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Tin tức về vaccin</h1>
        <p style={{ textAlign: "center", marginBottom: "20px", fontSize: "16px", color: "#555" }}>
          Hiện tại trường đang triển khai các chương trình tiêm chủng vaccin nhằm bảo vệ sức khỏe học sinh và cộng đồng.
          Dưới đây là thông tin chi tiết về các loại vaccin và lợi ích của chúng.
        </p>
        <p style={{ textAlign: "center", marginBottom: "20px", fontSize: "16px", color: "#555" }}>
          Hoàn cảnh bệnh hiện tại: Một số bệnh như COVID-19, Viêm gan B, Sởi, Cúm, và Thủy đậu vẫn đang là mối nguy cơ lớn đối với sức khỏe cộng đồng.
          Việc tiêm chủng là biện pháp hiệu quả để phòng ngừa và giảm thiểu tác động của các bệnh này.
        </p>
        {vaccineNews.map((news, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <h2 style={{ color: "#3498db" }}>{news.vaccineName}</h2>
            <p><strong>Giới thiệu:</strong> {news.description}</p>
            <p><strong>Lợi ích:</strong> {news.benefits}</p>
          </div>
        ))}
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

export default VaccinationNews;
