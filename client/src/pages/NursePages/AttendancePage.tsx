import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Checkbox, message, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useParams } from "react-router-dom";

interface Student {
  studentId: number;
  name: string;
  class: string;
  parentName?: string;
}

interface AttendanceItem {
  studentId: number;
  nurseId: number;
  present: boolean;
}

const AttendancePage: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [nurseId, setNurseId] = useState<number | null>(null);

  // Lấy danh sách học sinh thuộc chiến dịch
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Lấy thông tin y tá từ token hoặc API (ở đây giả định BE trả về nurseId khi login)
        // Bạn có thể sửa lại lấy từ localStorage hoặc context nếu dùng Auth
        const nurseIdStored = localStorage.getItem("nurseId");
        if (nurseIdStored) {
          setNurseId(Number(nurseIdStored));
        } else {
          // Thử lấy từ API
          const nurseRes = await axios.get("/api/account/me");
          setNurseId(nurseRes.data.nurseId);
        }

        // Lấy danh sách học sinh đã đồng ý tiêm chủng của campaign này
        const response = await axios.get(
          `/api/vaccination/campaigns/${campaignId}/agreed-students`
        );
        setStudents(response.data || []);

        // Khởi tạo state điểm danh: mặc định tất cả là có mặt
        const initialAttendance: Record<number, boolean> = {};
        (response.data || []).forEach((s: Student) => {
          initialAttendance[s.studentId] = true;
        });
        setAttendance(initialAttendance);
      } catch (error) {
        message.error("Không lấy được danh sách học sinh!");
      }
      setLoading(false);
    };

    if (campaignId) fetchStudents();
  }, [campaignId]);

  // Xử lý khi tick checkbox điểm danh
  const handleAttendanceChange = (studentId: number, checked: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: checked,
    }));
  };

  // Gửi điểm danh lên server
  const handleSubmit = async () => {
    if (!nurseId) {
      message.error("Không xác định được y tá!");
      return;
    }
    setLoading(true);
    try {
      const data: AttendanceItem[] = students.map((s) => ({
        studentId: s.studentId,
        nurseId,
        present: attendance[s.studentId] ?? false,
      }));

      await axios.post(
        `/api/vaccination/campaigns/${campaignId}/attendance`,
        data
      );
      message.success("Điểm danh thành công!");
    } catch (error: any) {
      message.error(
        error.response?.data?.error ||
          "Điểm danh thất bại. Vui lòng thử lại."
      );
    }
    setLoading(false);
  };

  // Table columns
  const columns: ColumnsType<Student & { present: boolean }> = [
    {
      title: "Mã HS",
      dataIndex: "studentId",
      key: "studentId",
      width: 80,
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Lớp",
      dataIndex: "class",
      key: "class",
      width: 100,
    },
    {
      title: "Có mặt",
      dataIndex: "present",
      key: "present",
      width: 120,
      render: (_: any, record: Student) => (        <Checkbox
        checked={attendance[record.studentId] ?? false}
        onChange={(e: CheckboxChangeEvent) =>
          handleAttendanceChange(record.studentId, e.target.checked)
        }
      >
        Có
      </Checkbox>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <h2>Điểm danh học sinh tiêm chủng</h2>
      <Spin spinning={loading}>
        <Table
          dataSource={students.map((s) => ({
            ...s,
            present: attendance[s.studentId] ?? false,
            key: s.studentId,
          }))}
          columns={columns}
          pagination={false}
          rowKey="studentId"
        />
        <div style={{ marginTop: 24, textAlign: "right" }}>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={students.length === 0}
          >
            Xác nhận điểm danh
          </Button>
        </div>
      </Spin>
    </div>
  );
};

export default AttendancePage;