import React, { useState, useEffect } from 'react';
import { Card, Tabs, List, Badge, Typography, Space, Tag, Spin, Empty, Button } from 'antd';
import { BellOutlined, MedicineBoxOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { DATE_FORMATS } from '../../constants';
import axios from 'axios';

const { TabPane } = Tabs;
const { Text, Title } = Typography;

interface HealthNotification {
  id: number;
  title: string;
  message: string;
  type: string;
  createdAt: string;
  isRead: boolean;
  data?: any;
}

const ParentHealthCheckNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<HealthNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        // Use the API client to get parent notifications related to health checks
        // In a production app, you would replace this with your actual API endpoint
        const response = await axios.get('/api/notification/parent/health-check');
        setNotifications(response.data || []);
      } catch (error) {
        console.error('Error fetching notifications', error);
        
        // For demonstration, set some mock data
        setNotifications([
          {
            id: 1,
            title: 'Thông báo khám sức khỏe định kỳ',
            message: 'Con bạn (Nguyễn Văn A - Lớp 5A) sẽ tham gia khám sức khỏe định kỳ vào ngày 15/07/2025 tại Phòng Y tế trường Tiểu học ABC.',
            type: 'health_check_schedule',
            createdAt: '2025-07-10T08:00:00',
            isRead: false,
            data: {
              studentName: 'Nguyễn Văn A',
              class: '5A',
              date: '2025-07-15',
              location: 'Phòng Y tế trường Tiểu học ABC'
            }
          },
          {
            id: 2,
            title: 'Kết quả khám sức khỏe',
            message: 'Kết quả khám sức khỏe của học sinh Nguyễn Văn A - Lớp 5A đã có. Vui lòng xem chi tiết bên dưới.',
            type: 'health_check_result',
            createdAt: '2025-07-15T15:30:00',
            isRead: true,
            data: {
              studentName: 'Nguyễn Văn A',
              class: '5A',
              results: {
                height: 135,
                weight: 32,
                eyesight: '10/10',
                teeth: 'Bình thường',
                bloodPressure: '110/70',
                heartRate: 82,
                notes: 'Sức khỏe tổng thể tốt'
              }
            }
          }
        ]);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const handleReadNotification = async (notificationId: number) => {
    try {
      // Mark notification as read via API call
      await axios.put(`/notification/${notificationId}/read`);
      
      // Update local state
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read', error);
    }
  };

  const renderNotificationContent = (notification: HealthNotification) => {
    switch (notification.type) {
      case 'health_check_schedule':
        return (
          <Card style={{ marginTop: 16 }}>
            <Space direction="vertical" size="small">
              <Text strong>Học sinh: {notification.data?.studentName}</Text>
              <Text>Lớp: {notification.data?.class}</Text>
              <Text>Ngày khám: {dayjs(notification.data?.date).format(DATE_FORMATS.DISPLAY)}</Text>
              <Text>Địa điểm: {notification.data?.location}</Text>
              <Text type="secondary">Vui lòng đảm bảo học sinh đi học đúng giờ vào ngày khám sức khỏe.</Text>
            </Space>
          </Card>
        );
      
      case 'health_check_result':
        const results = notification.data?.results || {};
        return (
          <Card style={{ marginTop: 16 }}>
            <Title level={5}>Kết quả khám sức khỏe</Title>
            <Space direction="vertical" size="small">
              <Text strong>Học sinh: {notification.data?.studentName}</Text>
              <Text>Lớp: {notification.data?.class}</Text>                <div style={{ marginTop: 8, marginBottom: 8 }}>
                <Tag color="blue">Chiều cao: {results.height} cm</Tag>
                <Tag color="blue">Cân nặng: {results.weight} kg</Tag>
                <Tag color="blue">Thị lực: {results.eyesight}</Tag>
                <Tag color="blue">Răng: {results.teeth}</Tag>
                <Tag color="blue">Huyết áp: {results.bloodPressure}</Tag>
                <Tag color="blue">Nhịp tim: {results.heartRate} bpm</Tag>
              </div>
              
              {results.notes && (
                <div>
                  <Text strong>Ghi chú:</Text>
                  <Text>{results.notes}</Text>
                </div>
              )}

              <div style={{ marginTop: 12 }}>
                <Button 
                  type="primary" 
                  href={`/parent/health-check/results/${notification.data?.studentId}/${notification.data?.campaignId}`}
                >
                  Xem chi tiết
                </Button>
              </div>
            </Space>
          </Card>
        );
      
      default:
        return <Text>{notification.message}</Text>;
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={
          <Space>
            <BellOutlined />
            <span>Thông báo sức khỏe</span>
            {unreadCount > 0 && <Badge count={unreadCount} style={{ backgroundColor: '#52c41a' }} />}
          </Space>
        }
      >
        <Tabs defaultActiveKey="all">
          <TabPane tab="Tất cả thông báo" key="all">
            <Spin spinning={loading}>
              {notifications.length > 0 ? (
                <List
                  dataSource={notifications}
                  renderItem={item => (
                    <List.Item 
                      actions={[
                        !item.isRead && (
                          <Button 
                            type="link" 
                            onClick={() => handleReadNotification(item.id)}
                          >
                            Đánh dấu đã đọc
                          </Button>
                        )
                      ]}
                      style={{ 
                        backgroundColor: !item.isRead ? '#f0f7ff' : 'transparent',
                        padding: '12px 16px',
                        marginBottom: 8,
                        borderRadius: 4
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          item.type === 'health_check_result' ? 
                            <MedicineBoxOutlined style={{ fontSize: 24, color: '#1890ff' }} /> : 
                            <BellOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                        }
                        title={
                          <Space>
                            <Text strong>{item.title}</Text>
                            {!item.isRead && <Badge color="#1890ff" />}
                          </Space>
                        }
                        description={
                          <div>
                            <Text>{item.message}</Text>
                            <div>
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                {dayjs(item.createdAt).format(`${DATE_FORMATS.DISPLAY} ${DATE_FORMATS.TIME}`)}
                              </Text>
                            </div>
                            {renderNotificationContent(item)}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có thông báo" />
              )}
            </Spin>
          </TabPane>
          
          <TabPane 
            tab={
              <span>
                Chưa đọc
                {unreadCount > 0 && <Badge count={unreadCount} size="small" style={{ marginLeft: 8 }} />}
              </span>
            } 
            key="unread"
          >
            <Spin spinning={loading}>
              {notifications.filter(n => !n.isRead).length > 0 ? (
                <List
                  dataSource={notifications.filter(n => !n.isRead)}
                  renderItem={item => (
                    <List.Item 
                      actions={[
                        <Button 
                          type="link" 
                          onClick={() => handleReadNotification(item.id)}
                        >
                          Đánh dấu đã đọc
                        </Button>
                      ]}
                      style={{ 
                        backgroundColor: '#f0f7ff',
                        padding: '12px 16px',
                        marginBottom: 8,
                        borderRadius: 4
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          item.type === 'health_check_result' ? 
                            <MedicineBoxOutlined style={{ fontSize: 24, color: '#1890ff' }} /> : 
                            <BellOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                        }
                        title={
                          <Space>
                            <Text strong>{item.title}</Text>
                            <Badge color="#1890ff" />
                          </Space>
                        }
                        description={
                          <div>
                            <Text>{item.message}</Text>
                            <div>
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                {dayjs(item.createdAt).format(`${DATE_FORMATS.DISPLAY} ${DATE_FORMATS.TIME}`)}
                              </Text>
                            </div>
                            {renderNotificationContent(item)}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có thông báo chưa đọc" />
              )}
            </Spin>
          </TabPane>

          <TabPane tab="Kết quả khám" key="results">
            <Spin spinning={loading}>
              {notifications.filter(n => n.type === 'health_check_result').length > 0 ? (
                <List
                  dataSource={notifications.filter(n => n.type === 'health_check_result')}
                  renderItem={item => (
                    <List.Item 
                      style={{ 
                        backgroundColor: !item.isRead ? '#f0f7ff' : 'transparent',
                        padding: '12px 16px',
                        marginBottom: 8,
                        borderRadius: 4
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          <CheckCircleOutlined style={{ fontSize: 24, color: '#52c41a' }} />
                        }
                        title={
                          <Space>
                            <Text strong>{item.title}</Text>
                            {!item.isRead && <Badge color="#1890ff" />}
                          </Space>
                        }
                        description={
                          <div>
                            <Text>{item.message}</Text>
                            <div>
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                {dayjs(item.createdAt).format(`${DATE_FORMATS.DISPLAY} ${DATE_FORMATS.TIME}`)}
                              </Text>
                            </div>
                            {renderNotificationContent(item)}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có kết quả khám sức khỏe" />
              )}
            </Spin>
          </TabPane>

          <TabPane tab="Lịch khám" key="schedules">
            <Spin spinning={loading}>
              {notifications.filter(n => n.type === 'health_check_schedule').length > 0 ? (
                <List
                  dataSource={notifications.filter(n => n.type === 'health_check_schedule')}
                  renderItem={item => (
                    <List.Item 
                      style={{ 
                        backgroundColor: !item.isRead ? '#f0f7ff' : 'transparent',
                        padding: '12px 16px',
                        marginBottom: 8,
                        borderRadius: 4
                      }}
                    >
                      <List.Item.Meta
                        avatar={
                          <CloseCircleOutlined style={{ fontSize: 24, color: '#1890ff' }} />
                        }
                        title={
                          <Space>
                            <Text strong>{item.title}</Text>
                            {!item.isRead && <Badge color="#1890ff" />}
                          </Space>
                        }
                        description={
                          <div>
                            <Text>{item.message}</Text>
                            <div>
                              <Text type="secondary" style={{ fontSize: 12 }}>
                                {dayjs(item.createdAt).format(`${DATE_FORMATS.DISPLAY} ${DATE_FORMATS.TIME}`)}
                              </Text>
                            </div>
                            {renderNotificationContent(item)}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <Empty description="Không có lịch khám sức khỏe" />
              )}
            </Spin>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ParentHealthCheckNotifications;
