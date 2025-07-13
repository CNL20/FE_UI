import React, { useState, useEffect } from 'react';
import { Card, Button, Table, message, Modal, Form, Input, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getHealthCampaigns, createHealthCampaign, sendHealthCheckNotificationToParents } from '../../services/healthCheckService';
import type { HealthCampaign } from '../../types/healthCheck';
import dayjs from 'dayjs';
import { DATE_FORMATS, STORAGE_KEYS } from '../../constants';

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const HealthCampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<HealthCampaign[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [notifyLoading, setNotifyLoading] = useState<Record<number, boolean>>({});

  // Fetch health campaigns
  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await getHealthCampaigns();
      setCampaigns(data);
    } catch (error) {
      message.error('Không thể tải danh sách chiến dịch sức khỏe');
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Handle create campaign
  const handleCreateCampaign = async (values: any) => {
    try {
      console.log('Giá trị form nhận được:', values);
      
      if (!values.dateRange || values.dateRange.length !== 2) {
        message.error('Lỗi: Dữ liệu ngày tháng không hợp lệ');
        console.error('Dữ liệu ngày tháng không đúng định dạng:', values.dateRange);
        return;
      }
      
      const [startDate, endDate] = values.dateRange;
      
      const campaignData: Omit<HealthCampaign, 'id' | 'createdAt' | 'updatedAt'> = {
        name: values.name,
        description: values.description,
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        status: 'planned'
      };
      
      console.log('Dữ liệu gửi đi:', campaignData);
      
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || localStorage.getItem(STORAGE_KEYS.TOKEN);
      if (!token) {
        message.error('Lỗi: Chưa đăng nhập hoặc phiên làm việc đã hết hạn');
        console.error('Không tìm thấy token xác thực');
        return;
      }
      
      const result = await createHealthCampaign(campaignData);
      console.log('Kết quả từ API:', result);
      
      message.success('Tạo chiến dịch sức khỏe thành công');
      setModalVisible(false);
      form.resetFields();
      fetchCampaigns();
    } catch (error: any) {
      if (error.response) {
        // Lỗi từ API - có phản hồi từ server
        console.error('Lỗi API:', error.response.status, error.response.data);
        message.error(`Không thể tạo chiến dịch sức khỏe: ${error.response.data?.message || error.response.statusText}`);
      } else if (error.request) {
        // Lỗi mạng - không nhận được phản hồi
        console.error('Lỗi kết nối:', error.request);
        message.error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng.');
      } else {
        // Lỗi khác
        console.error('Lỗi:', error.message);
        message.error('Không thể tạo chiến dịch sức khỏe: ' + error.message);
      }
    }
  };

  // Handle send notification to parents
  const handleSendNotifications = async (campaignId: number) => {
    setNotifyLoading((prev) => ({ ...prev, [campaignId]: true }));
    try {
      await sendHealthCheckNotificationToParents(campaignId);
      message.success('Đã gửi thông báo cho phụ huynh học sinh thành công');
    } catch (error) {
      message.error('Không thể gửi thông báo cho phụ huynh học sinh');
      console.error(error);
    }
    setNotifyLoading((prev) => ({ ...prev, [campaignId]: false }));
  };

  const columns = [
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text: string) => dayjs(text).format(DATE_FORMATS.DISPLAY),
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text: string) => dayjs(text).format(DATE_FORMATS.DISPLAY),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusMap: Record<string, { color: string; text: string }> = {
          planned: { color: 'blue', text: 'Đã lên kế hoạch' },
          ongoing: { color: 'green', text: 'Đang diễn ra' },
          completed: { color: 'gray', text: 'Đã hoàn thành' },
          cancelled: { color: 'red', text: 'Đã hủy' },
        };
        const { color, text } = statusMap[status] || { color: 'default', text: status };
        return <span style={{ color }}>{text}</span>;
      },
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: HealthCampaign) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button 
            type="primary" 
            href={`/manager/health-campaigns/${record.id}/details`}
          >
            Chi tiết
          </Button>
          <Button 
            onClick={() => handleSendNotifications(record.id)}
            loading={notifyLoading[record.id]}
            disabled={record.status === 'cancelled' || record.status === 'completed'}
          >
            Gửi thông báo
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card 
        title="Quản lý chiến dịch khám sức khỏe" 
        extra={
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => setModalVisible(true)}
          >
            Thêm chiến dịch mới
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={campaigns} 
          rowKey="id" 
          loading={loading}
        />
      </Card>

      <Modal
        title="Tạo chiến dịch khám sức khỏe mới"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateCampaign}
        >
          <Form.Item
            name="name"
            label="Tên chiến dịch"
            rules={[{ required: true, message: 'Vui lòng nhập tên chiến dịch' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả chiến dịch' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          
          <Form.Item
            name="dateRange"
            label="Thời gian diễn ra"
            rules={[{ required: true, message: 'Vui lòng chọn thời gian diễn ra chiến dịch' }]}
          >
            <RangePicker style={{ width: '100%' }} format={DATE_FORMATS.DISPLAY} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              Tạo chiến dịch
            </Button>
            <Button onClick={() => setModalVisible(false)}>
              Hủy
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HealthCampaignsPage;
