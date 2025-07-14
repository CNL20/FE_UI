import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Spin } from "antd";
import axios from "axios";

const NurseHealthCheckResultForm: React.FC = () => {
  const { campaignId, studentId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await axios.post(`/api/health-check/campaigns/${campaignId}/results`, {
        studentId,
        ...values
      });
      message.success("Lưu kết quả thành công!");
      navigate(-1);
    } catch {
      message.error("Lưu kết quả thất bại!");
    }
    setLoading(false);
  };

  return (
    <Spin spinning={loading}>
      <div style={{ maxWidth: 500, margin: "0 auto", padding: 24 }}>
        <h2>Nhập kết quả khám sức khỏe</h2>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Chiều cao (cm)" name="height" rules={[{ required: true, message: "Nhập chiều cao!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Cân nặng (kg)" name="weight" rules={[{ required: true, message: "Nhập cân nặng!" }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Thị lực" name="eyesight" rules={[{ required: true, message: "Nhập thị lực!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Răng" name="teeth" rules={[{ required: true, message: "Nhập tình trạng răng!" }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Huyết áp" name="bloodPressure">
            <Input />
          </Form.Item>
          <Form.Item label="Nhịp tim" name="heartRate">
            <Input />
          </Form.Item>
          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">Lưu kết quả</Button>
        </Form>
      </div>
    </Spin>
  );
};

export default NurseHealthCheckResultForm;