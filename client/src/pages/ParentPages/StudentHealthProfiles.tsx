import { useState } from "react";

const StudentHealthProfiles = () => {
  const [studentId, setStudentId] = useState("");
  const [profile, setProfile] = useState<any>(null);

  const handleSearch = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/api/health-records/${studentId}`, {
      headers: { "Authorization": `Bearer ${token}` },
    });
    if (res.ok) setProfile(await res.json());
    else {
      setProfile(null);
      alert("Không tìm thấy hồ sơ!");
    }
  };

  return (
    <div>
      <h2>Tìm kiếm hồ sơ sức khỏe học sinh</h2>
      <input
        type="text"
        placeholder="Nhập mã học sinh"
        value={studentId}
        onChange={e => setStudentId(e.target.value)}
      />
      <button onClick={handleSearch}>Xem hồ sơ</button>
      {profile && (
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      )}
    </div>
  );
};

export default StudentHealthProfiles;