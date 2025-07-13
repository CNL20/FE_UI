import React, { useState, useEffect } from 'react';
import { Card, Table, Typography, Tag, Descriptions, Spin, Empty, Button, Statistic } from 'antd';
import { MedicineBoxOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { DATE_FORMATS } from '../../constants';

const { Title, Text } = Typography;

interface RouteParams {
  studentId: string;
  campaignId?: string;
  [key: string]: string | undefined;
}

interface HealthCheckResultDetail {
  id: number;
  studentId: number;
  studentName: string;
  class: string;
  campaignId: number;
  campaignName: string;
  date: string;
  height: number;
  weight: number;
  eyesight: string;
  teeth: string;
  bloodPressure: string;
  heartRate: number;
  additionalNotes?: string;
  previousHeight?: number;
  previousWeight?: number;
  bmi?: number;
}

const HealthCheckResultsDetail: React.FC = () => {
  const { studentId, campaignId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [healthCheckResults, setHealthCheckResults] = useState<HealthCheckResultDetail | null>(null);
  const [historyResults, setHistoryResults] = useState<HealthCheckResultDetail[]>([]);

  useEffect(() => {
    const fetchHealthCheckResults = async () => {
      setLoading(true);
      try {
        // Use the healthCheckService to get results
        // In a real app, this would call our API service
        // const response = await getHealthCheckResultsByStudent(parseInt(studentId || '0'), parseInt(campaignId || '0'));
        // setHealthCheckResults(response);
        
        // For demonstration, we'll use mock data
        setTimeout(() => {
          const mockResult: HealthCheckResultDetail = {
            id: 1,
            studentId: parseInt(studentId || '0'),
            studentName: 'Nguyễn Văn A',
            class: '5A',
            campaignId: parseInt(campaignId || '0'),
            campaignName: 'Khám sức khỏe định kỳ Học kỳ 1 năm 2025',
            date: '2025-07-15',
            height: 135,
            weight: 32,
            eyesight: '10/10',
            teeth: 'Bình thường, cần đánh răng đều đặn hơn',
            bloodPressure: '110/70',
            heartRate: 82,
            additionalNotes: 'Sức khỏe tổng thể tốt. Cần bổ sung thêm canxi.',
            previousHeight: 133,
            previousWeight: 30.5,
            bmi: 17.6
          };
          setHealthCheckResults(mockResult);
          
          // Mock history data
          setHistoryResults([
            {
              id: 2,
              studentId: parseInt(studentId || '0'),
              studentName: 'Nguyễn Văn A',
              class: '5A',
              campaignId: 2,
              campaignName: 'Khám sức khỏe định kỳ Học kỳ 2 năm 2024',
              date: '2024-12-10',
              height: 133,
              weight: 30.5,
              eyesight: '10/10',
              teeth: 'Bình thường',
              bloodPressure: '105/65',
              heartRate: 84,
              bmi: 17.2
            },
            {
              id: 3,
              studentId: parseInt(studentId || '0'),
              studentName: 'Nguyễn Văn A',
              class: '4A',
              campaignId: 1,
              campaignName: 'Khám sức khỏe định kỳ Học kỳ 1 năm 2024',
              date: '2024-07-05',
              height: 130,
              weight: 28,
              eyesight: '10/10',
              teeth: 'Bình thường',
              bloodPressure: '100/65',
              heartRate: 86,
              bmi: 16.6
            }
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching health check results', error);
        setLoading(false);
      }
    };

    fetchHealthCheckResults();
  }, [studentId, campaignId]);

  const columns = [
    {
      title: 'Ngày khám',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format(DATE_FORMATS.DISPLAY),
    },
    {
      title: 'Đợt khám',
      dataIndex: 'campaignName',
      key: 'campaignName',
      ellipsis: true,
    },
    {
      title: 'Chiều cao',
      dataIndex: 'height',
      key: 'height',
      render: (height: number) => `${height} cm`,
    },
    {
      title: 'Cân nặng',
      dataIndex: 'weight',
      key: 'weight',
      render: (weight: number) => `${weight} kg`,
    },
    {
      title: 'BMI',
      dataIndex: 'bmi',
      key: 'bmi',
      render: (bmi: number) => {
        let color = 'green';
        let status = 'Bình thường';
        
        if (bmi < 16) {
          color = 'red';
          status = 'Gầy độ III';
        } else if (bmi < 17) {
          color = 'orange';
          status = 'Gầy độ II';
        } else if (bmi < 18.5) {
          color = 'yellow';
          status = 'Gầy độ I';
        } else if (bmi > 25) {
          color = 'orange';
          status = 'Thừa cân';
        } else if (bmi > 30) {
          color = 'red';
          status = 'Béo phì';
        }
        
        return (
          <Tag color={color}>{bmi.toFixed(1)} - {status}</Tag>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: HealthCheckResultDetail) => (
        <Button 
          type="link"
          onClick={() => navigate(`/parent/health-check/results/${record.studentId}/${record.campaignId}`)}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  if (loading) {
    return <Spin size="large" style={{ display: 'flex', justifyContent: 'center', margin: '100px' }} />;
  }

  if (!healthCheckResults) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Empty description="Không tìm thấy kết quả khám sức khỏe" />
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Button type="primary" onClick={() => navigate('/parent/notification')}>
              Quay lại thông báo
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MedicineBoxOutlined style={{ fontSize: 24, marginRight: 8 }} />
            <Title level={4} style={{ margin: 0 }}>Chi tiết kết quả khám sức khỏe</Title>
          </div>
        }
        extra={
          <Button type="primary" onClick={() => navigate('/parent/notification')}>
            Quay lại
          </Button>
        }
      >
        <Descriptions 
          title={`Học sinh: ${healthCheckResults.studentName} - Lớp ${healthCheckResults.class}`} 
          bordered
          column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}
        >
          <Descriptions.Item label="Đợt khám">{healthCheckResults.campaignName}</Descriptions.Item>
          <Descriptions.Item label="Ngày khám">{dayjs(healthCheckResults.date).format(DATE_FORMATS.DISPLAY)}</Descriptions.Item>
          
          <Descriptions.Item label="Chiều cao" span={1}>
            <Statistic
              value={healthCheckResults.height}
              suffix="cm"
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={healthCheckResults.previousHeight && healthCheckResults.height > healthCheckResults.previousHeight ? <ArrowUpOutlined /> : null}
            />
            {healthCheckResults.previousHeight && (
              <Text type="secondary" style={{ display: 'block' }}>
                {healthCheckResults.height > healthCheckResults.previousHeight ? 'Tăng ' : 'Giảm '}
                {Math.abs(healthCheckResults.height - healthCheckResults.previousHeight)} cm so với lần trước
              </Text>
            )}
          </Descriptions.Item>
          
          <Descriptions.Item label="Cân nặng" span={1}>
            <Statistic
              value={healthCheckResults.weight}
              suffix="kg"
              precision={1}
              valueStyle={{ color: '#3f8600' }}
              prefix={healthCheckResults.previousWeight && healthCheckResults.weight > healthCheckResults.previousWeight ? <ArrowUpOutlined /> : null}
            />
            {healthCheckResults.previousWeight && (
              <Text type="secondary" style={{ display: 'block' }}>
                {healthCheckResults.weight > healthCheckResults.previousWeight ? 'Tăng ' : 'Giảm '}
                {Math.abs(healthCheckResults.weight - healthCheckResults.previousWeight).toFixed(1)} kg so với lần trước
              </Text>
            )}
          </Descriptions.Item>
          
          <Descriptions.Item label="BMI">
            {healthCheckResults.bmi && (
              <>
                <Statistic
                  value={healthCheckResults.bmi}
                  precision={1}
                  valueStyle={{ color: '#3f8600' }}
                />
                <Text>
                  {healthCheckResults.bmi < 16 && <Tag color="red">Gầy độ III</Tag>}
                  {healthCheckResults.bmi >= 16 && healthCheckResults.bmi < 17 && <Tag color="orange">Gầy độ II</Tag>}
                  {healthCheckResults.bmi >= 17 && healthCheckResults.bmi < 18.5 && <Tag color="gold">Gầy độ I</Tag>}
                  {healthCheckResults.bmi >= 18.5 && healthCheckResults.bmi <= 25 && <Tag color="green">Bình thường</Tag>}
                  {healthCheckResults.bmi > 25 && healthCheckResults.bmi <= 30 && <Tag color="orange">Thừa cân</Tag>}
                  {healthCheckResults.bmi > 30 && <Tag color="red">Béo phì</Tag>}
                </Text>
              </>
            )}
          </Descriptions.Item>
          
          <Descriptions.Item label="Thị lực">{healthCheckResults.eyesight}</Descriptions.Item>
          <Descriptions.Item label="Răng">{healthCheckResults.teeth}</Descriptions.Item>
          <Descriptions.Item label="Huyết áp">{healthCheckResults.bloodPressure} mmHg</Descriptions.Item>
          <Descriptions.Item label="Nhịp tim">{healthCheckResults.heartRate} bpm</Descriptions.Item>
          
          {healthCheckResults.additionalNotes && (
            <Descriptions.Item label="Ghi chú" span={3}>
              {healthCheckResults.additionalNotes}
            </Descriptions.Item>
          )}
        </Descriptions>

        <div style={{ marginTop: 32 }}>
          <Title level={5}>Lịch sử khám sức khỏe</Title>
          <Table 
            dataSource={historyResults} 
            columns={columns} 
            rowKey="id" 
          />
        </div>
      </Card>
    </div>
  );
};

export default HealthCheckResultsDetail;
