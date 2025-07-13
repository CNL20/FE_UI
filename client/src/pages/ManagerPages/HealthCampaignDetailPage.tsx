import React, { useState, useEffect } from 'react';
import { Card, Button, Table, message, Tabs, Descriptions, Spin, Modal, Form, DatePicker, Input, Space } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getHealthCampaignById, 
  getHealthCheckSchedules, 
  createHealthCheckSchedule, 
  getStudentsByHealthCampaign,
  getIncompleteHealthChecks,
  sendHealthCheckResultsToParents
} from '../../services/healthCheckService';
import type { HealthCampaign, HealthCheckSchedule, HealthCheckStudent } from '../../types/healthCheck';
import dayjs from 'dayjs';
import { DATE_FORMATS } from '../../constants';

const { TabPane } = Tabs;

interface RouteParams {
  campaignId: string;
  [key: string]: string;
}

const HealthCampaignDetailPage: React.FC = () => {
  const { campaignId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<HealthCampaign | null>(null);
  const [schedules, setSchedules] = useState<HealthCheckSchedule[]>([]);
  const [students, setStudents] = useState<HealthCheckStudent[]>([]);
  const [incompleteStudents, setIncompleteStudents] = useState<HealthCheckStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [scheduleModalVisible, setScheduleModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [sendingResults, setSendingResults] = useState<boolean>(false);

  // Fetch campaign details and related data
  const fetchCampaignData = async () => {
    if (!campaignId) return;
    
    setLoading(true);
    try {
      const campaignData = await getHealthCampaignById(parseInt(campaignId));
      setCampaign(campaignData);
      
      // Fetch schedules
      const schedulesData = await getHealthCheckSchedules(parseInt(campaignId));
      setSchedules(schedulesData);
      
      // Fetch students
      const studentsData = await getStudentsByHealthCampaign(parseInt(campaignId));
      setStudents(studentsData);
      
      // Fetch incomplete health checks
      const incompleteData = await getIncompleteHealthChecks(parseInt(campaignId));
      setIncompleteStudents(incompleteData);
      
    } catch (error) {
      message.error('Không thể tải thông tin chiến dịch');
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCampaignData();
  }, [campaignId]);

  // Handle create schedule
  const handleCreateSchedule = async (values: any) => {
    if (!campaignId) return;
    
    try {
      const scheduleData: Omit<HealthCheckSchedule, 'id' | 'createdAt' | 'updatedAt'> = {
        campaignId: parseInt(campaignId),
        date: values.date.format('YYYY-MM-DD'),
        location: values.location,
        status: 'scheduled'
      };
      
      await createHealthCheckSchedule(scheduleData);
      message.success('Thêm lịch khám sức khỏe thành công');
      setScheduleModalVisible(false);
      form.resetFields();
      
      // Refresh schedules
      const schedulesData = await getHealthCheckSchedules(parseInt(campaignId));
      setSchedules(schedulesData);
      
    } catch (error) {
      message.error('Không thể tạo lịch khám sức khỏe');
      console.error(error);
    }
  };

  // Handle sending results to parents
  const handleSendResults = async () => {
    if (!campaignId) return;
    
    setSendingResults(true);
    try {
      await sendHealthCheckResultsToParents(parseInt(campaignId));
      message.success('Đã gửi kết quả khám sức khỏe cho phụ huynh thành công');
    } catch (error) {
      message.error('Không thể gửi kết quả khám sức khỏe cho phụ huynh');
      console.error(error);
    }
    setSendingResults(false);
  };

  // Handle assign nurses
  const handleAssignNurses = () => {
    if (!campaignId) return;
    navigate(`/manager/health-campaigns/${campaignId}/assign-nurses`);
  };

  const scheduleColumns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => dayjs(text).format(DATE_FORMATS.DISPLAY),
    },
    {
      title: 'Địa điểm',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          scheduled: { color: 'blue', text: 'Đã lên lịch' },
          in_progress: { color: 'orange', text: 'Đang diễn ra' },
          completed: { color: 'green', text: 'Đã hoàn thành' },
          cancelled: { color: 'red', text: 'Đã hủy' },
        };
        const { color, text } = statusMap[status] || { color: 'default', text: status };
        return <span style={{ color }}>{text}</span>;
      },
    },
  ];

  const studentColumns = [
    {
      title: 'Mã học sinh',
      dataIndex: 'studentCode',
      key: 'studentCode',
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
    },
    {
      title: 'Trường',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Phụ huynh',
      dataIndex: 'parentName',
      key: 'parentName',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
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
  ];

  if (loading || !campaign) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', margin: '100px' }} />;
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card title="Chi tiết chiến dịch khám sức khỏe">
        <Descriptions bordered column={2}>
          <Descriptions.Item label="Tên chiến dịch">{campaign.name}</Descriptions.Item>
          <Descriptions.Item label="Trạng thái">
            {campaign.status === 'planned' && <span style={{ color: 'blue' }}>Đã lên kế hoạch</span>}
            {campaign.status === 'ongoing' && <span style={{ color: 'green' }}>Đang diễn ra</span>}
            {campaign.status === 'completed' && <span style={{ color: 'gray' }}>Đã hoàn thành</span>}
            {campaign.status === 'cancelled' && <span style={{ color: 'red' }}>Đã hủy</span>}
          </Descriptions.Item>
          <Descriptions.Item label="Ngày bắt đầu">{dayjs(campaign.startDate).format(DATE_FORMATS.DISPLAY)}</Descriptions.Item>
          <Descriptions.Item label="Ngày kết thúc">{dayjs(campaign.endDate).format(DATE_FORMATS.DISPLAY)}</Descriptions.Item>
          <Descriptions.Item label="Mô tả" span={2}>{campaign.description}</Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 20, marginBottom: 20 }}>
          <Space>
            <Button 
              type="primary" 
              onClick={handleAssignNurses}
            >
              Bổ nhiệm Y tá
            </Button>
            <Button 
              onClick={() => setScheduleModalVisible(true)}
            >
              Thêm lịch khám
            </Button>
            <Button 
              onClick={handleSendResults}
              loading={sendingResults}
              disabled={incompleteStudents.length === students.length}
            >
              Gửi kết quả cho phụ huynh
            </Button>
          </Space>
        </div>

        <Tabs defaultActiveKey="schedules">
          <TabPane tab="Lịch khám" key="schedules">
            <Table 
              columns={scheduleColumns} 
              dataSource={schedules} 
              rowKey="id" 
              pagination={false} 
            />
          </TabPane>
          <TabPane tab="Danh sách học sinh" key="students">
            <Table 
              columns={studentColumns} 
              dataSource={students} 
              rowKey="studentId" 
            />
          </TabPane>
          <TabPane tab="Học sinh chưa hoàn thành khám" key="incomplete">
            <Table 
              columns={studentColumns} 
              dataSource={incompleteStudents} 
              rowKey="studentId" 
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title="Thêm lịch khám sức khỏe"
        open={scheduleModalVisible}
        onCancel={() => setScheduleModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateSchedule}
        >
          <Form.Item
            name="date"
            label="Ngày khám"
            rules={[{ required: true, message: 'Vui lòng chọn ngày khám' }]}
          >
            <DatePicker style={{ width: '100%' }} format={DATE_FORMATS.DISPLAY} />
          </Form.Item>
          
          <Form.Item
            name="location"
            label="Địa điểm"
            rules={[{ required: true, message: 'Vui lòng nhập địa điểm khám' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Thêm lịch
            </Button>
            <Button onClick={() => setScheduleModalVisible(false)}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HealthCampaignDetailPage;
