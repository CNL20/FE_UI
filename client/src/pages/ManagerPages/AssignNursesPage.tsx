import React, { useState, useEffect } from 'react';
import { Card, Button, Table, message, Form, Select, Space, Spin, Descriptions } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getHealthCampaignById,
  assignNurseToHealthCampaign, 
  getNurseAssignmentsByCampaign 
} from '../../services/healthCheckService';
import type { HealthCampaign, NurseAssignment } from '../../types/healthCheck';
import { User } from '../../types';
import dayjs from 'dayjs';
import { DATE_FORMATS } from '../../constants';

const { Option } = Select;

interface RouteParams {
  campaignId: string;
  [key: string]: string;
}

interface Nurse extends User {
  nurse_id?: number;
  specialization?: string;
}

const AssignNursesPage: React.FC = () => {
  const { campaignId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [assignments, setAssignments] = useState<NurseAssignment[]>([]);
  const [campaign, setCampaign] = useState<HealthCampaign | null>(null);
  const [form] = Form.useForm();

  // Fetch campaign details and assignments
  useEffect(() => {
    const fetchCampaignData = async () => {
      if (!campaignId) return;
      
      setLoading(true);
      try {
        // Fetch campaign details
        const campaignData = await getHealthCampaignById(parseInt(campaignId));
        setCampaign(campaignData);
        
        // Fetch current assignments
        const assignmentsData = await getNurseAssignmentsByCampaign(parseInt(campaignId));
        setAssignments(assignmentsData);
        
        // Fetch all nurses (would come from a different endpoint in a real app)
        // This is a placeholder, in a real app you'd call the proper API
        const response = await fetch('/api/nurse');
        if (response.ok) {
          const nursesData = await response.json();
          setNurses(nursesData);
        } else {
          throw new Error('Failed to fetch nurses');
        }
      } catch (error) {
        message.error('Không thể tải dữ liệu');
        console.error(error);
      }
      setLoading(false);
    };

    fetchCampaignData();
  }, [campaignId]);

  // Handle assign nurse
  const handleAssignNurse = async (values: any) => {
    if (!campaignId) return;
    
    const selectedNurse = nurses.find(nurse => nurse.nurse_id === values.nurseId);
    
    if (!selectedNurse) {
      message.error('Y tá không hợp lệ');
      return;
    }
    
    try {
      const assignmentData = {
        nurseId: values.nurseId,
        nurseName: `${selectedNurse.fullName || selectedNurse.username}`,
        campaignId: parseInt(campaignId)
      };
      
      await assignNurseToHealthCampaign(assignmentData);
      message.success('Bổ nhiệm y tá thành công');
      
      // Refresh assignments
      const assignmentsData = await getNurseAssignmentsByCampaign(parseInt(campaignId));
      setAssignments(assignmentsData);
      form.resetFields();
    } catch (error) {
      message.error('Không thể bổ nhiệm y tá');
      console.error(error);
    }
  };

  const assignmentColumns = [
    {
      title: 'ID Y tá',
      dataIndex: 'nurseId',
      key: 'nurseId',
    },
    {
      title: 'Tên Y tá',
      dataIndex: 'nurseName',
      key: 'nurseName',
    },
    {
      title: 'Ngày bổ nhiệm',
      dataIndex: 'assignedAt',
      key: 'assignedAt',
      render: (text: string) => dayjs(text).format(DATE_FORMATS.DISPLAY),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          assigned: { color: 'blue', text: 'Đã bổ nhiệm' },
          active: { color: 'green', text: 'Đang làm việc' },
          completed: { color: 'gray', text: 'Đã hoàn thành' },
        };
        const { color, text } = statusMap[status] || { color: 'default', text: status };
        return <span style={{ color }}>{text}</span>;
      },
    },
  ];

  if (loading || !campaign) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', margin: '100px' }} />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card title={`Bổ nhiệm Y tá - ${campaign.name}`}>
        <Descriptions bordered column={1} style={{ marginBottom: 24 }}>
          <Descriptions.Item label="Mô tả chiến dịch">{campaign.description}</Descriptions.Item>
          <Descriptions.Item label="Thời gian">
            {dayjs(campaign.startDate).format(DATE_FORMATS.DISPLAY)} - {dayjs(campaign.endDate).format(DATE_FORMATS.DISPLAY)}
          </Descriptions.Item>
        </Descriptions>

        <Form
          form={form}
          layout="inline"
          onFinish={handleAssignNurse}
          style={{ marginBottom: 24 }}
        >
          <Form.Item
            name="nurseId"
            label="Y tá"
            rules={[{ required: true, message: 'Vui lòng chọn y tá' }]}
          >
            <Select style={{ width: 250 }} placeholder="Chọn y tá">
              {nurses.map(nurse => (
                <Option key={nurse.nurse_id} value={nurse.nurse_id}>
                  {nurse.fullName || nurse.username} {nurse.specialization ? `(${nurse.specialization})` : ''}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Bổ nhiệm
            </Button>
          </Form.Item>
        </Form>
        
        <Table
          columns={assignmentColumns}
          dataSource={assignments}
          rowKey="id"
        />
        
        <div style={{ marginTop: 16 }}>
          <Space>
            <Button onClick={() => navigate(`/manager/health-campaigns/${campaignId}/details`)}>
              Quay lại chi tiết chiến dịch
            </Button>
            <Button onClick={() => navigate('/manager/health-campaigns')}>
              Danh sách chiến dịch
            </Button>
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default AssignNursesPage;
