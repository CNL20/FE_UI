import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, DatePicker, message, Spin } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";

interface Student {
  studentId: number;
  name: string;
  class: string;
  vaccineName: string;
  status: string;
  dateOfVaccination?: string;
}

interface VaccinationRecordInput {
  campaignId: number;
  studentId: number;
  vaccineName: string;
  dateOfVaccination: string;
  followUpReminder: string;
}

const VaccinationResults: React.FC = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [students, setStudents] = useState<Student[]>([]);
  const [records, setRecords] = useState<Record<number, VaccinationRecordInput>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `/api/vaccination/campaigns/${campaignId}/results`
        );
        const filtered = (response.data || []).filter(
          (r: Student) => r.status === "Pending"
        );
        setStudents(filtered);

        const initialRecords: Record<number, VaccinationRecordInput> = {};
        filtered.forEach((s: Student) => {
          initialRecords[s.studentId] = {
            campaignId: Number(campaignId),
            studentId: s.studentId,
            vaccineName: s.vaccineName,
            dateOfVaccination: dayjs().format("YYYY-MM-DD"),
            followUpReminder: "",
          };
        });
        setRecords(initialRecords);
      } catch (error) {
        message.error("Không lấy được danh sách học sinh cần ghi nhận kết quả!");
      }
      setLoading(false);
    };

    if (campaignId) fetchStudents();
  }, [campaignId]);

  const handleDateChange = (studentId: number, date: Dayjs | null, _dateString: string | string[]) => {
    setRecords((prev) => {
      const old = prev[studentId];
      if (!old) return prev;
      return {
        ...prev,
        [studentId]: {
          ...old,
          dateOfVaccination: date && dayjs.isDayjs(date) ? date.format("YYYY-MM-DD") : "",
        },
      };
    });
  };

  const handleFollowUpChange = (studentId: number, date: Dayjs | null, _dateString: string | string[]) => {
    setRecords((prev) => {
      const old = prev[studentId];
      if (!old) return prev;
      return {
        ...prev,
        [studentId]: {
          ...old,
          followUpReminder: date && dayjs.isDayjs(date) ? date.format("YYYY-MM-DD") : "",
        },
      };
    });
  };

  const handleSubmit = async (studentId: number) => {
    const record = records[studentId];
    if (!record || !record.dateOfVaccination) {
      message.error("Vui lòng nhập ngày tiêm chủng!");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`/api/vaccination/record`, record);
      message.success("Đã ghi nhận kết quả tiêm cho học sinh!");
      setStudents((prev) => prev.filter((s) => s.studentId !== studentId));
    } catch (error: any) {
      message.error(
        error.response?.data?.error ||
          "Ghi nhận kết quả thất bại. Vui lòng thử lại."
      );
    }
    setLoading(false);
  };

  const columns: ColumnsType<Student> = [
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
      title: "Tên vaccine",
      dataIndex: "vaccineName",
      key: "vaccineName",
      width: 160,
    },
    {
      title: "Ngày tiêm",
      dataIndex: "dateOfVaccination",
      key: "dateOfVaccination",
      width: 140,
      render: (_: any, record: Student) => {
        const rec = records[record.studentId];
        let dateValue: Dayjs | null = null;
        if (rec) {
          const value = rec.dateOfVaccination;
          const str = Array.isArray(value) ? value[0] : value;
          dateValue = typeof str === "string" && str !== "" ? dayjs(str) : null;
        }
        return (
          <DatePicker
            value={dateValue}
            format="YYYY-MM-DD"
            onChange={(date, dateString) =>
              handleDateChange(
                record.studentId,
                date,
                typeof dateString === "string" ? dateString : (dateString[0] ?? "")
              )
            }
          />
        );
      },
    },
    {
      title: "Nhắc lại (nếu có)",
      key: "followUpReminder",
      width: 160,
      render: (_: any, record: Student) => {
        const rec = records[record.studentId];
        let followUpValue: Dayjs | null = null;
        if (rec) {
          const value = rec.followUpReminder;
          const str = Array.isArray(value) ? value[0] : value;
          followUpValue = typeof str === "string" && str !== "" ? dayjs(str) : null;
        }
        return (
          <DatePicker
            value={followUpValue}
            format="YYYY-MM-DD"
            placeholder="Chọn ngày"
            onChange={(date, dateString) =>
              handleFollowUpChange(
                record.studentId,
                date,
                typeof dateString === "string" ? dateString : (dateString[0] ?? "")
              )
            }
          />
        );
      },
    },
    {
      title: "",
      key: "action",
      width: 120,
      render: (_: any, record: Student) => (
        <Button
          type="primary"
          onClick={() => handleSubmit(record.studentId)}
          disabled={loading}
        >
          Ghi nhận
        </Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h2>Ghi nhận kết quả tiêm chủng</h2>
      <Spin spinning={loading}>
        <Table
          dataSource={students.map((s) => ({
            ...s,
            key: s.studentId,
          }))}
          columns={columns}
          pagination={{ pageSize: 10 }}
          rowKey="studentId"
        />
        {students.length === 0 && (
          <div style={{ marginTop: 32, textAlign: "center" }}>
            <b>Tất cả học sinh đã được ghi nhận kết quả tiêm chủng!</b>
          </div>
        )}
      </Spin>
    </div>
  );
};

export default VaccinationResults;