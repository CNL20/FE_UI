import React, { useEffect, useState } from 'react';
import { Table, Button, Checkbox, message, Spin, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useParams, useNavigate } from 'react-router-dom';
import { getHealthCampaignById, getStudentsByHealthCampaign, submitHealthCheckAttendance } from '../../services/healthCheckService';
import type { HealthCampaign, HealthCheckAttendance, HealthCheckStudent } from '../../types/healthCheck';

interface RouteParams {
  campaignId: string;
  scheduleId: string;
  [key: string]: string;
}

const HealthCheckAttendancePage: React.FC = () => {
  const { campaignId, scheduleId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const [students, setStudents] = useState<HealthCheckStudent[]>([]);
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [nurseId, setNurseId] = useState<number | null>(null);
  const [campaign, setCampaign] = useState<HealthCampaign | null>(null);

  // Fetch students and campaign data
  useEffect(() => {
    const fetchData = async () => {
      if (!campaignId || !scheduleId) return;
      
      setLoading(true);
      try {
        // Get nurse ID from localStorage
        const nurseIdStored = localStorage.getItem('nurse_id');
        if (nurseIdStored) {
          setNurseId(parseInt(nurseIdStored));
        } else {
          // Alternatively get from API if implemented
          message.error('Không xác định được thông tin y tá');
        }

        // Fetch campaign details
        const campaignData = await getHealthCampaignById(parseInt(campaignId));
        setCampaign(campaignData);
        
        // Fetch students for the campaign
        const studentsData = await getStudentsByHealthCampaign(parseInt(campaignId));
        setStudents(studentsData);
        
        // Initialize attendance (all present by default)
        const initialAttendance: Record<number, boolean> = {};
        studentsData.forEach((s: HealthCheckStudent) => {
          initialAttendance[s.studentId] = true;
        });
        setAttendance(initialAttendance);
      } catch (error) {
        message.error('Không thể tải danh sách học sinh');
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [campaignId, scheduleId]);

  // Handle attendance change
  const handleAttendanceChange = (studentId: number, checked: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: checked,
    }));
  };

  // Submit attendance
  const handleSubmitAttendance = async () => {
    if (!nurseId || !campaignId || !scheduleId) {
      message.error('Thiếu thông tin cần thiết để điểm danh');
      return;
    }
    
    setLoading(true);
    try {
      const attendanceData: HealthCheckAttendance[] = students.map((s) => ({
        studentId: s.studentId,
        nurseId: nurseId,
        campaignId: parseInt(campaignId),
        scheduleId: parseInt(scheduleId),
        present: attendance[s.studentId] ?? false,
      }));

      await submitHealthCheckAttendance(attendanceData);
      message.success('Điểm danh thành công!');
      
      // Navigate to health check results page
      navigate(`/nurse/health-check/${campaignId}/${scheduleId}/results`);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Điểm danh thất bại');
    }
    setLoading(false);
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
      title: 'Trường',
      dataIndex: 'school',
      key: 'school',
      width: 150,
    },
    {
      title: 'Có mặt',
      key: 'present',
      width: 120,
      render: (_: any, record: HealthCheckStudent) => (
        <Checkbox
          checked={attendance[record.studentId] ?? false}
          onChange={(e: CheckboxChangeEvent) =>
            handleAttendanceChange(record.studentId, e.target.checked)
          }
        >
          Có mặt
        </Checkbox>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card 
        title={`Điểm danh học sinh - ${campaign?.name || 'Đợt khám sức khỏe'}`}
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
          
          <div style={{ marginTop: 16, textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={handleSubmitAttendance}
              disabled={!nurseId || students.length === 0}
            >
              Xác nhận điểm danh
            </Button>
          </div>
        </Spin>
      </Card>
    </div>
  );
};

export default HealthCheckAttendancePage;
