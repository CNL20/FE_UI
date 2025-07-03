import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  CircularProgress,
  Paper,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Groups as GroupsIcon,
  PersonAdd as PersonAddIcon,
  Assignment as AssignmentIcon,
  Assessment as AssessmentIcon,
  EventNote as EventNoteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { HealthCampaign, CampaignListProps } from '../../types';
import Navbar from '../../components/Navbar';

const CampaignList: React.FC<CampaignListProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<HealthCampaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      // Simulate API call - replace with actual API
      const mockCampaigns: HealthCampaign[] = [
        {
          id: '1',
          title: 'Khám sức khỏe định kỳ học kỳ I năm học 2024-2025',
          description: 'Chiến dịch khám sức khỏe tổng quát cho tất cả học sinh từ lớp 1 đến lớp 12',
          startDate: new Date('2024-09-01'),
          endDate: new Date('2024-09-15'),
          location: 'Phòng y tế trường - Tầng 1 Khu A',
          targetGrades: ['Lớp 1', 'Lớp 2', 'Lớp 3', 'Lớp 4', 'Lớp 5'],
          totalStudents: 250,
          completedCount: 180,
          status: 'active',
          createdAt: new Date('2024-08-20'),
          updatedAt: new Date('2024-09-05'),
        },
        {
          id: '2',
          title: 'Khám sức khỏe định kỳ khối THPT',
          description: 'Khám sức khỏe chuyên sâu cho học sinh THPT chuẩn bị thi đại học',
          startDate: new Date('2024-10-01'),
          endDate: new Date('2024-10-10'),
          location: 'Phòng y tế trường',
          targetGrades: ['Lớp 10', 'Lớp 11', 'Lớp 12'],
          totalStudents: 150,
          completedCount: 0,
          status: 'planned',
          createdAt: new Date('2024-09-15'),
          updatedAt: new Date('2024-09-15'),
        },
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      setCampaigns(mockCampaigns);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: HealthCampaign['status']): 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' => {
    switch (status) {
      case 'planned': return 'warning';
      case 'active': return 'success';
      case 'completed': return 'info';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: HealthCampaign['status']) => {
    switch (status) {
      case 'planned': return 'Đang lên kế hoạch';
      case 'active': return 'Đang diễn ra';
      case 'completed': return 'Đã hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return 'Không xác định';
    }
  };

  const handleCreateCampaign = () => {
    navigate('/manager/health-campaigns/create');
  };

  const handleViewCampaign = (campaignId: string) => {
    navigate(`/manager/health-campaigns/${campaignId}`);
  };

  const handleAssignStudents = (campaignId: string) => {
    navigate(`/manager/health-campaigns/${campaignId}/students`);
  };

  const handleAssignNurses = (campaignId: string) => {
    navigate(`/manager/health-campaigns/${campaignId}/nurses`);
  };

  const handleAttendance = (campaignId: string) => {
    navigate(`/manager/health-campaigns/${campaignId}/attendance`);
  };

  const handleReport = (campaignId: string) => {
    navigate(`/manager/health-campaigns/${campaignId}/report`);
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Navbar {...(onLogout ? { onLogout } : {})} />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress size={50} />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar {...(onLogout ? { onLogout } : {})} />
      
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                Quản lý chiến dịch khám sức khỏe
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Tạo và quản lý các chiến dịch khám sức khỏe cho học sinh
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleCreateCampaign}
              sx={{ 
                borderRadius: 2, 
                textTransform: 'none', 
                fontWeight: 'bold',
                px: 3,
                py: 1.5,
              }}
            >
              Tạo chiến dịch mới
            </Button>
          </Box>
        </Paper>

        {campaigns.length === 0 ? (
          <Paper elevation={2} sx={{ p: 6, textAlign: 'center', borderRadius: 2 }}>
            <EventNoteIcon sx={{ fontSize: 80, color: 'action.disabled', mb: 2 }} />
            <Typography variant="h5" color="textSecondary" gutterBottom>
              Chưa có chiến dịch khám sức khỏe nào
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Hãy tạo chiến dịch đầu tiên để bắt đầu quản lý việc khám sức khỏe cho học sinh
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleCreateCampaign}
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Tạo chiến dịch đầu tiên
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {campaigns.map((campaign) => (
              <Grid item xs={12} lg={6} key={campaign.id}>
                <Card 
                  elevation={2} 
                  sx={{ 
                    borderRadius: 2, 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', flexGrow: 1, mr: 2 }}>
                        {campaign.title}
                      </Typography>
                      <Chip 
                        label={getStatusText(campaign.status)} 
                        color={getStatusColor(campaign.status)}
                        size="small"
                      />
                    </Box>
                    
                    <Typography variant="body2" color="textSecondary" paragraph>
                      {campaign.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">
                          Thời gian:
                        </Typography>
                        <Typography variant="body2">
                          {campaign.startDate.toLocaleDateString('vi-VN')} - {campaign.endDate.toLocaleDateString('vi-VN')}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">
                          Địa điểm:
                        </Typography>
                        <Typography variant="body2">
                          {campaign.location}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="textSecondary">
                          Tiến độ:
                        </Typography>
                        <Typography variant="body2">
                          {campaign.completedCount || 0}/{campaign.totalStudents || 0} học sinh
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                        {campaign.targetGrades?.map((grade) => (
                          <Chip 
                            key={grade} 
                            label={grade} 
                            size="small" 
                            variant="outlined" 
                            color="primary"
                          />
                        ))}
                      </Box>
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ p: 2, pt: 0, flexWrap: 'wrap', gap: 1 }}>
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => handleViewCampaign(campaign.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Xem chi tiết
                    </Button>
                    
                    <Button
                      size="small"
                      startIcon={<GroupsIcon />}
                      onClick={() => handleAssignStudents(campaign.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Phân công học sinh
                    </Button>
                    
                    <Button
                      size="small"
                      startIcon={<PersonAddIcon />}
                      onClick={() => handleAssignNurses(campaign.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Phân công y tá
                    </Button>
                    
                    <Button
                      size="small"
                      startIcon={<AssignmentIcon />}
                      onClick={() => handleAttendance(campaign.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Điểm danh
                    </Button>
                    
                    <Button
                      size="small"
                      startIcon={<AssessmentIcon />}
                      onClick={() => handleReport(campaign.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Báo cáo
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default CampaignList;
