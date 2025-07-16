import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";

const API_URL = process.env['REACT_APP_API_URL'] || "http://localhost:5000";

interface HealthCheckupFormValues {
  height: number;
  weight: number;
  vision: string;
  bloodPressure?: string;
  notes?: string;
}

const NurseHealthCheckResultForm: React.FC = () => {
  const { campaignId, studentId } = useParams();
  const [loading, setLoading] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<string | null | false>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        // Lấy token đúng key mà bạn đang lưu (auth_token hoặc token)
        const token =
          localStorage.getItem("auth_token") || localStorage.getItem("token");
        const res = await axios.get(
          `${API_URL}/api/health-check/campaigns/${campaignId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // LOG RESPONSE để debug
        console.log("API campaign response:", res.data);
        // Thử lấy tất cả biến có thể, tuỳ theo backend
        const date =
          res.data?.StartDate ||
          res.data?.startDate ||
          res.data?.scheduledDate ||
          res.data?.date ||
          null;
        setScheduledDate(date ? date.substring(0, 10) : false);
      } catch (e) {
        setScheduledDate(false);
        message.error("Không lấy được thông tin ngày khám!");
      }
    };
    fetchCampaign();
  }, [campaignId]);

  const onFinish = async (values: HealthCheckupFormValues) => {
    setLoading(true);
    try {
      const nurseId =
        localStorage.getItem("nurse_id") ||
        localStorage.getItem("nurseId") ||
        null;
      const token =
        localStorage.getItem("auth_token") || localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/health-check/campaigns/${campaignId}/results`,
        {
          studentId,
          nurseId,
          checkupDate: scheduledDate,
          height: values.height,
          weight: values.weight,
          vision: values.vision,
          bloodPressure: values.bloodPressure,
          notes: values.notes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      message.success("Lưu kết quả thành công!");
      navigate(-1);
    } catch {
      message.error("Lưu kết quả thất bại!");
    }
    setLoading(false);
  };

  // scheduledDate === false nghĩa là không tìm thấy ngày khám hoặc lỗi
  if (scheduledDate === null) {
    return (
      <Spin spinning={true}>
        <div>Đang tải ngày khám...</div>
      </Spin>
    );
  }
  if (scheduledDate === false) {
    return (
      <div style={{ textAlign: "center", marginTop: 48, color: "red" }}>
        Không có thông tin ngày khám!
      </div>
    );
  }

  return (
    <Spin spinning={loading}>
      <div style={{ maxWidth: 500, margin: "0 auto", padding: 24 }}>
        <h2>Nhập kết quả khám sức khỏe</h2>
        <div style={{ marginBottom: 12, color: "#555" }}>
          <b>Ngày khám:</b> {scheduledDate.split("-").reverse().join("/")}
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Chiều cao (cm)"
            name="height"
            rules={[{ required: true, message: "Nhập chiều cao!" }]}
          >
            <Input type="number" min="0" step="0.1" />
          </Form.Item>
          <Form.Item
            label="Cân nặng (kg)"
            name="weight"
            rules={[{ required: true, message: "Nhập cân nặng!" }]}
          >
            <Input type="number" min="0" step="0.1" />
          </Form.Item>
          <Form.Item
            label="Thị lực"
            name="vision"
            rules={[{ required: true, message: "Nhập thị lực!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Huyết áp" name="bloodPressure">
            <Input />
          </Form.Item>
          <Form.Item label="Ghi chú" name="notes">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu kết quả
          </Button>
        </Form>
      </div>
    </Spin>
  );
};

export default NurseHealthCheckResultForm;