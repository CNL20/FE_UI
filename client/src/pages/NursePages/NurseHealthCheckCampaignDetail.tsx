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

const NurseHealthCheckCampaignDetail: React.FC = () => {
  const { campaignId } = useParams();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(`/api/health-check/campaigns/${campaignId}/students`)
      .then(res => {
        setStudents(res.data || []);
        const initial: Record<number, boolean> = {};
        (res.data || []).forEach((s: Student) => { initial[s.id] = s.attended; });
        setAttendance(initial);
      })
      .finally(() => setLoading(false));
  }, [campaignId]);

  const handleAttendanceChange = (studentId: number, checked: boolean) => {
    setAttendance(prev => ({ ...prev, [studentId]: checked }));
  };

  const handleSaveAttendance = async () => {
    setLoading(true);
    try {
      const data = students.map(s => ({
        studentId: s.id,
        present: attendance[s.id],
      }));
      await axios.post(`/api/health-check/campaigns/${campaignId}/attendance`, data);
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
          onClick={() => navigate(`/nurse/health-check-campaigns/${campaignId}/student/${record.id}`)}
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