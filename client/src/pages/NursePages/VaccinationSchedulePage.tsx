import React, { useEffect, useState } from "react";
import { Table, Button, Tag, Spin, message, Select } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

interface ScheduleItem {
  studentId: number;
  studentName: string;
  vaccineName: string;
  nextDate: string;
  status: string;
}

interface AttendanceItem {
  studentId: number;
  nurseId: number;
  present: boolean;
}

const VaccinationSchedulePage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [data, setData] = useState<ScheduleItem[]>([]);
  // Đổi state attendance thành string | undefined để dễ kiểm soát (có thể là 'present', 'absent', hoặc undefined)
  const [attendance, setAttendance] = useState<{ [studentId: number]: "present" | "absent" | undefined }>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const nurseId = 1; // TODO: Lấy nurseId thực tế

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/vaccination/campaigns/${campaignId}/schedule`);
        setData(res.data || []);
        const initialAttendance: { [studentId: number]: "present" | "absent" | undefined } = {};
        (res.data || []).forEach((item: ScheduleItem) => {
          initialAttendance[item.studentId] = undefined;
        });
        setAttendance(initialAttendance);
      } catch (err) {
        message.error("Không thể tải dữ liệu lịch tiêm chủng!");
      }
      setLoading(false);
    };
    if (campaignId) fetchData();
  }, [campaignId]);

  const handleAttendanceChange = (studentId: number, value: "present" | "absent") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: value,
    }));
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      const attendanceList: AttendanceItem[] = Object.entries(attendance)
        .filter(([, status]) => status !== undefined)
        .map(([studentId, status]) => ({
          studentId: Number(studentId),
          nurseId,
          present: status === "present",
        }));
      if (attendanceList.length === 0) {
        message.warning("Vui lòng chọn trạng thái điểm danh cho ít nhất một học sinh.");
        setSaving(false);
        return;
      }
      await axios.post(`/api/vaccination/campaigns/${campaignId}/attendance`, attendanceList);
      message.success("Lưu điểm danh thành công!");
    } catch (err) {
      message.error("Lưu điểm danh thất bại!");
    }
    setSaving(false);
  };

  const columns = [
    { title: "Tên Học Sinh", dataIndex: "studentName", key: "studentName" },
    { title: "Loại Vắc Xin", dataIndex: "vaccineName", key: "vaccineName" },
    { title: "Ngày Tiêm Tiếp Theo", dataIndex: "nextDate", key: "nextDate", align: "center" as const },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string) => (
        <Tag color={status === "Hoàn Thành" ? "green" : status === "Đang Chờ" ? "orange" : "default"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Điểm Danh",
      key: "attendance",
      align: "center" as const,
      render: (_: any, record: ScheduleItem) => (
        <Select
          style={{ width: 100 }}
          placeholder="Chọn"
          value={attendance[record.studentId]}
          onChange={(value) => handleAttendanceChange(record.studentId, value as "present" | "absent")}
        >
          <Select.Option value="present">Có mặt</Select.Option>
          <Select.Option value="absent">Vắng</Select.Option>
        </Select>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Lịch Tiêm Chủng</h2>
        <Button
          type="primary"
          loading={saving}
          onClick={handleSaveAttendance}
        >
          Lưu điểm danh
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data.map((item) => ({ ...item, key: item.studentId }))}
          pagination={false}
          bordered
        />
      </Spin>
    </div>
  );
};

export default VaccinationSchedulePage;