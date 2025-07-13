import React, { useEffect, useState } from 'react';
import { Table, Button, message, Spin, Card, Form, Input, Modal, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useParams, useNavigate } from 'react-router-dom';
import { getHealthCampaignById, getStudentsByHealthCampaign, submitHealthCheckResult } from '../../services/healthCheckService';
import type { HealthCampaign, HealthCheckStudent, HealthCheckResult } from '../../types/healthCheck';

interface RouteParams {
  campaignId: string;
  scheduleId: string;
  [key: string]: string;
}

const HealthCheckResultsPage: React.FC = () => {
  const { campaignId, scheduleId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [students, setStudents] = useState<HealthCheckStudent[]>([]);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<HealthCampaign | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<HealthCheckStudent | null>(null);
  const [form] = Form.useForm();

  // Fetch students and campaign data
  useEffect(() => {
    const fetchData = async () => {
      if (!campaignId || !scheduleId) return;
      
      setLoading(true);
      try {
        // Nurse ID is retrieved on demand when needed

        // Fetch campaign details
        const campaignData = await getHealthCampaignById(parseInt(campaignId));
        setCampaign(campaignData);
        
        // Fetch students for the campaign
        const studentsData = await getStudentsByHealthCampaign(parseInt(campaignId));
        setStudents(studentsData);
      } catch (error) {
        message.error('Không thể tải danh sách học sinh');
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [campaignId, scheduleId]);

  // Handle opening the form for a student
  const handleOpenForm = (student: HealthCheckStudent) => {
    setCurrentStudent(student);
    setModalVisible(true);
    form.resetFields();
  };

  // Handle submitting health check results
  const handleSubmitResult = async (values: any) => {
    if (!currentStudent || !campaignId || !scheduleId) return;
    
    try {
      const resultData: Omit<HealthCheckResult, 'id' | 'createdAt' | 'updatedAt'> = {
        studentId: currentStudent.studentId,
        campaignId: parseInt(campaignId),
        scheduleId: parseInt(scheduleId),
        height: values.height,
        weight: values.weight,
        eyesight: values.eyesight,
        teeth: values.teeth,
        bloodPressure: values.bloodPressure,
        heartRate: values.heartRate,
        additionalNotes: values.notes || '',
        status: 'completed'
      };
      
      await submitHealthCheckResult(resultData);
      message.success(`Đã lưu kết quả khám sức khỏe cho học sinh ${currentStudent.name}`);
      
      // Update student status in the list
      setStudents(students.map(s => 
        s.studentId === currentStudent.studentId 
          ? { ...s, status: 'completed' } 
          : s
      ));
      
      setModalVisible(false);
    } catch (error) {
      message.error('Không thể lưu kết quả khám sức khỏe');
      console.error(error);
    }
  };

  // Define table columns
  const columns: ColumnsType<HealthCheckStudent> = [
    {
      title: 'Mã HS',
      dataIndex: 'studentCode',
      key: 'studentCode',
      width: 100,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Lớp',
      dataIndex: 'class',
      key: 'class',
      width: 100,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          pending: { color: 'blue', text: 'Chưa khám' },
          completed: { color: 'green', text: 'Đã khám' },
          absent: { color: 'red', text: 'Vắng mặt' },
        };
        const { color, text } = statusMap[status] || { color: 'default', text: status };
        return <span style={{ color }}>{text}</span>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_: any, record: HealthCheckStudent) => (
        <Button
          type="primary"
          onClick={() => handleOpenForm(record)}
          disabled={record.status === 'absent' || record.status === 'completed'}
        >
          {record.status === 'completed' ? 'Xem kết quả' : 'Nhập kết quả'}
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card 
        title={`Kết quả khám sức khỏe - ${campaign?.name || 'Đợt khám sức khỏe'}`}
        extra={
          <Button type="primary" onClick={() => navigate('/nurse/dashboard')}>
            Quay lại
          </Button>
        }
      >
        <Spin spinning={loading}>
          <Table
            dataSource={students}
            columns={columns}
            pagination={{ pageSize: 50 }}
            rowKey="studentId"
          />
        </Spin>
      </Card>

      <Modal
        title={`Nhập kết quả khám sức khỏe - ${currentStudent?.name}`}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmitResult}
        >
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="height"
              label="Chiều cao (cm)"
              rules={[{ required: true, message: 'Vui lòng nhập chiều cao' }]}
              style={{ width: '50%' }}
            >
              <InputNumber min={0} max={250} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              name="weight"
              label="Cân nặng (kg)"
              rules={[{ required: true, message: 'Vui lòng nhập cân nặng' }]}
              style={{ width: '50%' }}
            >
              <InputNumber min={0} max={200} precision={1} style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="eyesight"
              label="Thị lực"
              rules={[{ required: true, message: 'Vui lòng nhập thị lực' }]}
              style={{ width: '50%' }}
            >
              <Input placeholder="VD: 10/10, 7/10" />
            </Form.Item>

            <Form.Item
              name="teeth"
              label="Răng"
              rules={[{ required: true, message: 'Vui lòng nhập tình trạng răng' }]}
              style={{ width: '50%' }}
            >
              <Input placeholder="VD: Bình thường, Sâu 2 răng" />
            </Form.Item>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item
              name="bloodPressure"
              label="Huyết áp (mmHg)"
              rules={[{ required: true, message: 'Vui lòng nhập huyết áp' }]}
              style={{ width: '50%' }}
            >
              <Input placeholder="VD: 120/80" />
            </Form.Item>

            <Form.Item
              name="heartRate"
              label="Nhịp tim (bpm)"
              rules={[{ required: true, message: 'Vui lòng nhập nhịp tim' }]}
              style={{ width: '50%' }}
            >
              <InputNumber min={40} max={200} style={{ width: '100%' }} />
            </Form.Item>
          </div>

          <Form.Item
            name="notes"
            label="Ghi chú"
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <Button onClick={() => setModalVisible(false)}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Lưu kết quả
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HealthCheckResultsPage;
