import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const HomeContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: '#f5f5f5',
}));

const HeroSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  background: 'linear-gradient(135deg, #1a73e8, #4285f4)',
  color: 'white',
  textAlign: 'center',
}));

const FeaturePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <HeroSection>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            Hệ Thống Quản Lý Trường Học
          </Typography>
          <Typography variant="h5" paragraph>
            Giải pháp toàn diện cho việc quản lý và theo dõi hoạt động học tập
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Bắt Đầu Ngay
          </Button>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeaturePaper elevation={3}>
              <Typography variant="h5" component="h2" gutterBottom>
                Quản Lý Học Sinh
              </Typography>
              <Typography>
                Theo dõi thông tin học sinh, điểm số và tiến độ học tập một cách hiệu quả
              </Typography>
            </FeaturePaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeaturePaper elevation={3}>
              <Typography variant="h5" component="h2" gutterBottom>
                Quản Lý Giáo Viên
              </Typography>
              <Typography>
                Hỗ trợ giáo viên trong việc quản lý lớp học và đánh giá học sinh
              </Typography>
            </FeaturePaper>
          </Grid>

          <Grid item xs={12} md={4}>
            <FeaturePaper elevation={3}>
              <Typography variant="h5" component="h2" gutterBottom>
                Theo Dõi Tiến Độ
              </Typography>
              <Typography>
                Phân tích và báo cáo chi tiết về tiến độ học tập của học sinh
              </Typography>
            </FeaturePaper>
          </Grid>
        </Grid>
      </Container>
    </HomeContainer>
  );
};

export default Home; 