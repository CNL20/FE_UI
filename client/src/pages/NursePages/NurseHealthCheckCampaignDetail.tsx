import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button, Checkbox, Spin, message } from "antd";
import axios from "axios";

interface Student {
  id: number;
  name: string;
  class: string;
  attended: boolean;
  completed: boolean;
}

const API_URL = process.env['REACT_APP_API_URL'] || "http://localhost:5000";

const NurseHealthCheckCampaignDetail: React.FC = () => {
  const { id } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Lấy nurseId từ localStorage cho mỗi lần điểm danh
  const nurseId = Number(localStorage.getItem("nurseId"));

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('auth_token');
    axios.get(`${API_URL}/api/health-check/campaigns/${id}/students`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setStudents(res.data || []);
        const initial: Record<number, boolean> = {};
        (res.data || []).forEach((s: Student) => { initial[s.id] = s.attended; });
        setAttendance(initial);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAttendanceChange = (studentId: number, checked: boolean) => {
    setAttendance(prev => ({ ...prev, [studentId]: checked }));
  };

  const handleSaveAttendance = async () => {
    // Kiểm tra nurseId trước khi gửi
    if (!nurseId || nurseId <= 0 || Number.isNaN(nurseId)) {
      message.error("Không xác định được mã y tá hợp lệ!");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('auth_token');
      // Thêm nurseId vào từng bản ghi gửi lên BE
      const data = students.map(s => ({
        studentId: s.id,
        present: attendance[s.id],
        nurseId: nurseId
      }));
      await axios.post(`${API_URL}/api/health-check/campaigns/${id}/attendance`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      message.success("Lưu điểm danh thành công!");
    } catch {
      message.error("Lưu điểm danh thất bại!");
    }
    setLoading(false);
  };

  const columns = [
    { title: "Họ tên", dataIndex: "name", key: "name" },
    { title: "Lớp", dataIndex: "class", key: "class" },
    { 
      title: "Có mặt",
      dataIndex: "attended",
      key: "attended",
      render: (_: any, record: Student) => (
        <Checkbox
          checked={attendance[record.id] ?? false}
          onChange={e => handleAttendanceChange(record.id, e.target.checked)}
        />
      )
    },
    {
      title: "Trạng thái",
      dataIndex: "completed",
      key: "completed",
      render: (completed: boolean) => completed ? "Đã khám" : "Chưa khám"
    },
    {
      title: "Nhập kết quả",
      key: "action",
      render: (_: any, record: Student) => (
        <Button
          type="link"
          disabled={!attendance[record.id]}
          onClick={() => navigate(`/nurse/health-check-campaigns/${id}/student/${record.id}`)}
        >
          Nhập kết quả
        </Button>
      )
    }
  ];

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h2>Danh sách học sinh</h2>
      <Spin spinning={loading}>
        <Table dataSource={students.map(s => ({ ...s, key: s.id }))} columns={columns} pagination={false} />
        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Button type="primary" onClick={handleSaveAttendance}>Lưu điểm danh</Button>
        </div>
      </Spin>
    </div>
  );
};

export default NurseHealthCheckCampaignDetail;