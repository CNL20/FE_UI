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
  attendanceId?: number;
}

interface AttendanceItem {
  attendanceId?: number;
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

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        // Lấy thông tin y tá từ localStorage hoặc API
        let nurseIdStored = localStorage.getItem("nurseId");
        if (!nurseIdStored) {
          nurseIdStored = localStorage.getItem("nurse_id") || localStorage.getItem("nurse");
        }
        if (nurseIdStored && Number(nurseIdStored) > 0) {
          setNurseId(Number(nurseIdStored));
        } else {
          const nurseRes = await axios.get("/api/account/me");
          const backendNurseId = nurseRes.data.nurseId || nurseRes.data.nurse_id;
          if (backendNurseId && Number(backendNurseId) > 0) {
            setNurseId(Number(backendNurseId));
            localStorage.setItem("nurseId", String(backendNurseId));
          } else {
            setNurseId(null);
          }
        }

        const response = await axios.get(
          `/api/vaccination/campaigns/${campaignId}/agreed-students`
        );
        setStudents(response.data || []);

        const initialAttendance: Record<number, boolean> = {};
        (response.data || []).forEach((s: Student) => {
          initialAttendance[s.studentId] =
            // @ts-ignore
            s.isPresent !== undefined ? s.isPresent : true;
        });
        setAttendance(initialAttendance);
      } catch (error) {
        message.error("Không lấy được danh sách học sinh!");
      }
      setLoading(false);
    };

    if (campaignId) fetchStudents();
  }, [campaignId]);

  const handleAttendanceChange = (studentId: number, checked: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: checked,
    }));
  };

  // SỬA ĐÚNG ĐÂY: BỔ SUNG nurseId vào dữ liệu gửi đi
  const handleSubmit = async () => {
    if (!nurseId || nurseId <= 0) {
      message.error("Không xác định được y tá hợp lệ!");
      return;
    }
    setLoading(true);
    try {
      // Bổ sung nurseId vào từng phần tử
      const data: AttendanceItem[] = students.map((s) => ({
        attendanceId: s.attendanceId,
        studentId: s.studentId,
        nurseId: nurseId, // Đúng key và giá trị
        present: attendance[s.studentId] ?? false,
      }));

      // Kiểm tra dữ liệu trước khi gửi
      console.log("Attendance payload gửi lên BE:", data);

      await axios.post(`/api/Attendance/bulk-update`, data);

      message.success("Điểm danh thành công!");
    } catch (error: any) {
      message.error(
        error.response?.data?.error ||
          "Điểm danh thất bại. Vui lòng thử lại."
      );
    }
    setLoading(false);
  };

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
      render: (_: any, record: Student) => (
        <Checkbox
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