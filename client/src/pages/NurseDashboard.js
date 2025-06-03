import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(3),
  background: '#f5f5f5',
}));

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const NurseDashboard = () => {
  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Bảng Điều Khiển Y Tá
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Khám Sức Khỏe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quản lý lịch khám sức khỏe và hồ sơ y tế của học sinh
              </Typography>
            </DashboardPaper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Báo Cáo Y Tế
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Tạo và quản lý các báo cáo y tế học đường
              </Typography>
            </DashboardPaper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Thông Báo Khẩn Cấp
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gửi thông báo khẩn cấp đến phụ huynh và nhà trường
              </Typography>
            </DashboardPaper>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  );
};

export default NurseDashboard; 