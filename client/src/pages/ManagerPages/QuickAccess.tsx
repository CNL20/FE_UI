import { useState } from "react";

const QuickAccess = () => {
  const [studentId, setStudentId] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setProfile(null);

    try {
      // Đã đổi endpoint phù hợp backend mới
      const token = localStorage.getItem("token");
      const res = await fetch(
        `http://localhost:5000/api/healthrecord/student/${studentId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        setError("Không tìm thấy hồ sơ hoặc có lỗi xảy ra!");
        setProfile(null);
      } else {
        setProfile(await res.json());
      }
    } catch (e) {
      setError("Đã xảy ra lỗi khi tìm kiếm.");
      setProfile(null);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 8 }}>
      <h2>Truy cập nhanh hồ sơ sức khỏe học sinh</h2>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Nhập mã học sinh hoặc ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{ padding: 8, width: "70%", marginRight: 8, borderRadius: 4, border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 16px",
            background: "#1976d2",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
          disabled={loading || !studentId}
        >
          {loading ? "Đang tìm..." : "Xem hồ sơ"}
        </button>
      </div>
      {error && (
        <div style={{ color: "red", marginBottom: 16 }}>{error}</div>
      )}
      {profile && (
        <div style={{ background: "#f4f6fa", padding: 16, borderRadius: 8 }}>
          <h3>Thông tin hồ sơ sức khỏe</h3>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(profile, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default QuickAccess;