import React from "react";

const VaccinationSchedule: React.FC = () => {
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
    </div>
  );
};

export default VaccinationSchedule;
