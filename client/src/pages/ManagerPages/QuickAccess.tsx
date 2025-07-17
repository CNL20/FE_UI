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
      )}      {profile && (
        <div style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)", padding: 24, borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h3 style={{ color: "#1e293b", marginBottom: 20, fontSize: "1.5rem", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)", width: "8px", height: "24px", borderRadius: "4px" }}></span>
            Thông tin hồ sơ sức khỏe
          </h3>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>Mã hồ sơ</div>
              <div style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "600" }}>{profile.record_id}</div>
            </div>
            
            <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>Mã học sinh</div>
              <div style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "600" }}>{profile.student_id}</div>
            </div>
            
            <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", gridColumn: "1 / -1" }}>
              <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>Tên học sinh</div>
              <div style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "600" }}>{profile.student_name}</div>
            </div>
            
            <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>Dị ứng</div>
              <div style={{ 
                color: profile.allergies === "Không" ? "#059669" : "#dc2626", 
                fontSize: "1.1rem", 
                fontWeight: "600",
                background: profile.allergies === "Không" ? "#ecfdf5" : "#fef2f2",
                padding: "4px 8px",
                borderRadius: "4px",
                display: "inline-block"
              }}>{profile.allergies}</div>
            </div>
            
            <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>Bệnh mãn tính</div>
              <div style={{ 
                color: profile.chronic_diseases === "Không" ? "#059669" : "#dc2626", 
                fontSize: "1.1rem", 
                fontWeight: "600",
                background: profile.chronic_diseases === "Không" ? "#ecfdf5" : "#fef2f2",
                padding: "4px 8px",
                borderRadius: "4px",
                display: "inline-block"
              }}>{profile.chronic_diseases}</div>
            </div>
            
            <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>Tình trạng thị lực</div>
              <div style={{ 
                color: profile.vision_status === "Cận" ? "#ea580c" : "#059669", 
                fontSize: "1.1rem", 
                fontWeight: "600",
                background: profile.vision_status === "Cận" ? "#fff7ed" : "#ecfdf5",
                padding: "4px 8px",
                borderRadius: "4px",
                display: "inline-block"
              }}>{profile.vision_status}</div>
            </div>
            
            <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>Lịch sử bệnh án</div>
              <div style={{ 
                color: profile.medical_history === "Không" ? "#059669" : "#dc2626", 
                fontSize: "1.1rem", 
                fontWeight: "600",
                background: profile.medical_history === "Không" ? "#ecfdf5" : "#fef2f2",
                padding: "4px 8px",
                borderRadius: "4px",
                display: "inline-block"
              }}>{profile.medical_history}</div>
            </div>
            
            <div style={{ background: "#fff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", gridColumn: "1 / -1" }}>
              <div style={{ color: "#64748b", fontSize: "0.875rem", fontWeight: "500", marginBottom: "4px" }}>Cập nhật lần cuối</div>
              <div style={{ color: "#1e293b", fontSize: "1.1rem", fontWeight: "600" }}>
                {new Date(profile.updated_at).toLocaleString('vi-VN', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickAccess;