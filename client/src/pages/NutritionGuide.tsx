import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NutritionGuide: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 8, py: 6, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3, textAlign: 'center' }}>
      <Box mb={4}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#1976d2',
          }}
        >
          Dinh Dưỡng Học Đường
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Khuyến cáo mức tiêu thụ thực phẩm trung bình cho 1 người/ngày
        </Typography>
      </Box>

      <Box mb={4}>
        <img
          src="https://th.bing.com/th/id/R.a444dfb1a8ddb459032f2869331e81ed?rik=XA0kXEFt54lQjQ&riu=http%3a%2f%2fstatic.benhvienphusanhanoi.vn%2fimages%2fupload%2f03082022%2fz3240828609437ecce8c58fb98474572ca6380861ba1c6.jpg&ehk=cxvE09YYNKVyT0XVUp2s6WL98RXArXpyud0uagWEhcM%3d&risl=&pid=ImgRaw&r=0"
          alt="Dinh dưỡng học đường"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      </Box>

      <Box mb={4}>
        <img
          src="http://static.benhvienphusanhanoi.vn/images/upload/03082022/z32408286872987f99842ca1e75854dea9b74e29ae55dc.jpg"
          alt="Khuyến cáo tháp dinh dưỡng"
          style={{
            maxWidth: '100%',
            height: 'auto',
            borderRadius: 8,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        />
      </Box>

      <Box mt={6}>
        <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ py: 1.5, px: 4, fontSize: '1rem', fontWeight: 'bold' }}>
          Quay lại trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default NutritionGuide; 