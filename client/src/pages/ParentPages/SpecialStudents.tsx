import { useEffect, useState } from "react";

const SpecialStudents = () => {
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    const fetchList = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/students/special`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (res.ok) setList(await res.json());
      else {
        setList([]);
        alert("Không lấy được danh sách!");
      }
    };
    fetchList();
  }, []);

  return (
    <div>
      <h2>Danh sách học sinh cần theo dõi đặc biệt</h2>
      <table>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Bệnh mãn tính/Dị ứng</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s, i) => (
            <tr key={i}>
              <td>{s.name}</td>
              <td>{s.class}</td>
              <td>{s.special_condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpecialStudents;