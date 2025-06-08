import React, { useState } from "react";

const ActivityLogs: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const logs = [
    {
      time: "2025-06-08 10:00",
      user: "Admin",
      action: "Created Account",
      details: "Created account for user John Doe",
    },
    {
      time: "2025-06-08 11:00",
      user: "Manager",
      action: "Updated Profile",
      details: "Updated profile for user Jane Smith",
    },
    // ...more logs
  ];

  const filteredLogs = logs.filter(
    (log) =>
      log.user.toLowerCase().includes(search.toLowerCase()) &&
      (filter ? log.action === filter : true)
  );

  return (
    <div>
      <h1>Nhật ký hoạt động</h1>
      <div>
        <input
          type="text"
          placeholder="Tìm kiếm theo người dùng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">Tất cả hành động</option>
          <option value="Created Account">Tạo tài khoản</option>
          <option value="Updated Profile">Cập nhật hồ sơ</option>
          {/* Add more filter options as needed */}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Thời gian</th>
            <th>Người thực hiện</th>
            <th>Hành động</th>
            <th>Chi tiết</th>
          </tr>
        </thead>
        <tbody>
          {filteredLogs.map((log, index) => (
            <tr key={index}>
              <td>{log.time}</td>
              <td>{log.user}</td>
              <td>{log.action}</td>
              <td>{log.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityLogs;
