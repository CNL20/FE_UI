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

const ManagerDashboard = () => {
  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Bảng Điều Khiển Quản Lý
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Quản Lý Nhân Viên
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Quản lý thông tin và phân quyền nhân viên y tế
              </Typography>
            </DashboardPaper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Báo Cáo Thống Kê
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Xem và phân tích các báo cáo thống kê y tế
              </Typography>
            </DashboardPaper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Cài Đặt Hệ Thống
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cấu hình và quản lý các thiết lập hệ thống
              </Typography>
            </DashboardPaper>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  );
};

export default ManagerDashboard; 