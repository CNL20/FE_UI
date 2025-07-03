import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Group,
  LocalHospital,
  CheckCircle,
  Assignment,
  Assessment,
  Campaign,
  CalendarToday,
  LocationOn,
  School,
} from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { HealthCampaign, CampaignCreateProps } from '../../types';

const CampaignDetail: React.FC<CampaignCreateProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { campaignId } = useParams<{ campaignId: string }>();
  const [campaign, setCampaign] = useState<HealthCampaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        // Simulate API call - in real app, fetch from backend
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if this is a newly created campaign from localStorage
        const newCampaignData = localStorage.getItem(`campaign_${campaignId}`);
        let mockCampaign: HealthCampaign;
        
        if (newCampaignData) {
          // Use data from the create form
          const savedData = JSON.parse(newCampaignData);
          mockCampaign = {
            id: campaignId || '1',
            title: savedData.title || 'Chiến dịch khám sức khỏe mới',
            description: savedData.description || 'Mô tả chiến dịch khám sức khỏe',
            startDate: new Date(savedData.startDate || '2024-01-15'),
            endDate: new Date(savedData.endDate || '2024-01-25'),
            location: savedData.location || 'Phòng y tế trường học',
            targetGrades: savedData.targetGrades || ['Lớp 1', 'Lớp 2'],
            status: 'planned',
            totalStudents: 150,
            completedCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          // Clean up localStorage after use
          localStorage.removeItem(`campaign_${campaignId}`);
        } else {
          // For demo purposes, create a default mock campaign
          mockCampaign = {
            id: campaignId || '1',
            title: 'Chiến dịch khám sức khỏe định kỳ Q1/2024',
            description: 'Chương trình khám sức khỏe định kỳ cho học sinh các khối lớp từ 1-12, bao gồm các chỉ số cơ bản như chiều cao, cân nặng, thị lực, răng miệng.',
            startDate: new Date('2024-01-15'),
            endDate: new Date('2024-01-25'),
            location: 'Phòng y tế trường học',
            targetGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
            status: 'planned',
            totalStudents: 150,
            completedCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
        }
        
        setCampaign(mockCampaign);
      } catch (error) {
        console.error('Error fetching campaign:', error);
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'info';
      case 'ongoing': return 'warning';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planned': return 'Đang lên kế hoạch';
      case 'ongoing': return 'Đang diễn ra';
      case 'completed': return 'Đã hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar {...(onLogout ? { onLogout } : {})} />
        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <CircularProgress size={48} />
        </Box>
      </Box>
    );
  }

  if (!campaign) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Navbar {...(onLogout ? { onLogout } : {})} />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Alert severity="error">
            Không tìm thấy chiến dịch khám sức khỏe.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar {...(onLogout ? { onLogout } : {})} />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/manager/health-campaigns')}
              variant="outlined"
            >
              Quay lại danh sách
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {campaign.title}
              </Typography>
              <Chip 
                label={getStatusText(campaign.status)} 
                color={getStatusColor(campaign.status) as any}
                sx={{ mt: 1 }}
              />
            </Box>
            <Button
              startIcon={<Edit />}
              variant="contained"
              onClick={() => navigate(`/manager/health-campaigns/${campaign.id}/edit`)}
            >
              Chỉnh sửa
            </Button>
          </Box>
        </Paper>

        <Grid container spacing={3}>
          {/* Campaign Information */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Campaign color="primary" />
                Thông tin chiến dịch
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Mô tả
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {campaign.description}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday fontSize="small" />
                    Ngày bắt đầu
                  </Typography>
                  <Typography variant="body1">
                    {new Date(campaign.startDate).toLocaleDateString('vi-VN')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarToday fontSize="small" />
                    Ngày kết thúc
                  </Typography>
                  <Typography variant="body1">
                    {new Date(campaign.endDate).toLocaleDateString('vi-VN')}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn fontSize="small" />
                    Địa điểm
                  </Typography>
                  <Typography variant="body1">
                    {campaign.location}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <School fontSize="small" />
                    Khối lớp tham gia
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {campaign.targetGrades?.map((grade) => (
                      <Chip key={grade} label={grade} variant="outlined" size="small" />
                    )) || []}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Tiến độ khám sức khỏe
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {campaign.completedCount || 0}/{campaign.totalStudents || 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    học sinh đã hoàn thành
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Trạng thái chiến dịch
                  </Typography>
                  <Typography variant="h4" color="success.main">
                    {getStatusText(campaign.status)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    trạng thái hiện tại
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom>
                Quản lý chiến dịch
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Button
                  startIcon={<Group />}
                  variant="outlined"
                  onClick={() => navigate(`/manager/health-campaigns/${campaign.id}/students`)}
                >
                  Phân công học sinh
                </Button>
                <Button
                  startIcon={<LocalHospital />}
                  variant="outlined"
                  onClick={() => navigate(`/manager/health-campaigns/${campaign.id}/nurses`)}
                >
                  Phân công y tá
                </Button>
                <Button
                  startIcon={<CheckCircle />}
                  variant="outlined"
                  onClick={() => navigate(`/manager/health-campaigns/${campaign.id}/attendance`)}
                >
                  Điểm danh
                </Button>
                <Button
                  startIcon={<Assignment />}
                  variant="outlined"
                  onClick={() => navigate(`/manager/health-campaigns/${campaign.id}/checkup/1`)}
                >
                  Nhập kết quả khám
                </Button>
                <Button
                  startIcon={<Assessment />}
                  variant="outlined"
                  onClick={() => navigate(`/manager/health-campaigns/${campaign.id}/report`)}
                >
                  Báo cáo kết quả
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CampaignDetail;
