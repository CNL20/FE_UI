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

const ParentDashboard = () => {
  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Bảng Điều Khiển Phụ Huynh
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Thông Tin Sức Khỏe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Xem thông tin sức khỏe và lịch sử khám bệnh của con
              </Typography>
            </DashboardPaper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Thông Báo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nhận và xem các thông báo từ nhà trường
              </Typography>
            </DashboardPaper>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DashboardPaper elevation={3}>
              <Typography variant="h6" gutterBottom>
                Liên Hệ
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Liên hệ với nhân viên y tế và nhà trường
              </Typography>
            </DashboardPaper>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  );
};

export default ParentDashboard; 