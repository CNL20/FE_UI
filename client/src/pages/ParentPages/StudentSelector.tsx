import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Student {
  id: string;
  name: string;
}

const StudentSelector: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Lấy base URL từ biến môi trường .env
    const apiBaseUrl = process.env['REACT_APP_API_BASE_URL'];
    const token = localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (!token) {
      setError("Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn!");
      setLoading(false);
      return;
    }
    fetch(`${apiBaseUrl}/parent/students`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(async (res) => {
        const text = await res.text();
        try {
          const data = JSON.parse(text);
          setStudents(data);
        } catch (err) {
          setError("Lỗi backend trả về: " + text.substring(0, 200));
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const studentId = e.target.value;
    if (studentId) {
      navigate(`/parent/health-profile-form/${studentId}`);
    }
  };

  if (loading) return <div>Đang tải danh sách học sinh...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ margin: 24 }}>
      <h2>Chọn học sinh để điền hồ sơ sức khỏe</h2>
      <select defaultValue="" onChange={handleSelect}>
        <option value="" disabled>-- Chọn học sinh --</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>
      {students.length === 0 && <div>Không có học sinh nào!</div>}
    </div>
  );
};

export default StudentSelector;