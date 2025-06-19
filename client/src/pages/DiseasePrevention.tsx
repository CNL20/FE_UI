import React from 'react';
import { Box, Typography, Container, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import SickOutlinedIcon from '@mui/icons-material/SickOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';

const DiseasePrevention: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const preventionTopics = [
    {
      icon: <CleanHandsIcon sx={{ fontSize: 60, color: '#2196f3' }} />,
      title: 'Cách rửa tay đúng cách',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Rửa tay thường xuyên với xà phòng và nước sạch trong ít nhất 20 giây, đặc biệt sau khi ho, hắt hơi, chạm vào bề mặt công cộng, hoặc trước khi ăn.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Sử dụng dung dịch sát khuẩn tay nhanh chứa ít nhất 60% cồn khi không có xà phòng và nước.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Hướng dẫn học sinh thực hiện đúng 6 bước rửa tay theo khuyến cáo của Bộ Y tế.</Typography>
        </>
      ),
      color: '#e3f2fd',
    },
    {
      icon: <CoronavirusIcon sx={{ fontSize: 60, color: '#f44336' }} />,
      title: 'Phòng chống COVID-19',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Đeo khẩu trang đúng cách ở nơi công cộng, đặc biệt khi có triệu chứng hoặc ở khu vực có nguy cơ lây nhiễm cao.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Giữ khoảng cách an toàn (ít nhất 2 mét) với người khác.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tiêm chủng đầy đủ các liều vắc-xin COVID-19 theo khuyến cáo của Bộ Y tế.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Hạn chế tụ tập đông người, tránh chạm tay vào mặt (mắt, mũi, miệng).</Typography>
        </>
      ),
      color: '#ffebee',
    },
    {
      icon: <LocalPharmacyIcon sx={{ fontSize: 60, color: '#4caf50' }} />,
      title: 'Phòng chống các bệnh cúm mùa',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tiêm vắc-xin cúm mùa hàng năm để tăng cường miễn dịch.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Giữ ấm cơ thể, đặc biệt vào mùa lạnh.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Ăn uống đủ chất, sinh hoạt điều độ để nâng cao sức đề kháng.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tránh tiếp xúc gần với người bị cúm.</Typography>
        </>
      ),
      color: '#e8f5e9',
    },
    {
      icon: <SickOutlinedIcon sx={{ fontSize: 60, color: '#d32f2f' }} />,
      title: 'Phòng chống bệnh hô hấp khác',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Thường xuyên vệ sinh mũi họng bằng nước muối sinh lý.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tránh tiếp xúc với khói bụi, ô nhiễm không khí.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Đảm bảo môi trường sống và học tập thông thoáng, sạch sẽ.</Typography>
        </>
      ),
      color: '#fff3e0',
    },
    {
      icon: <FastfoodOutlinedIcon sx={{ fontSize: 60, color: '#fbc02d' }} />,
      title: 'Phòng chống bệnh đường tiêu hóa',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Ăn chín, uống sôi, đảm bảo vệ sinh an toàn thực phẩm.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Rửa sạch rau sống và trái cây trước khi ăn.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Không ăn thức ăn ôi thiu, không rõ nguồn gốc.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Rửa tay trước khi ăn và sau khi đi vệ sinh.</Typography>
        </>
      ),
      color: '#f0f4c3',
    },
    {
      icon: <BugReportOutlinedIcon sx={{ fontSize: 60, color: '#673ab7' }} />,
      title: 'Phòng chống bệnh truyền nhiễm khác',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Diệt muỗi, lăng quăng/bọ gậy, dọn dẹp vật dụng chứa nước để phòng sốt xuất huyết.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tiêm chủng đầy đủ các vắc-xin cần thiết theo lịch tiêm chủng quốc gia.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tránh tiếp xúc với động vật hoang dã hoặc vật nuôi bị bệnh.</Typography>
        </>
      ),
      color: '#f3e5f5',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, py: 6, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#1976d2' }}>
          Phòng Chống Dịch Bệnh Học Đường
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Cùng nhau xây dựng môi trường học đường an toàn và khỏe mạnh. Dưới đây là các hướng dẫn và thông tin quan trọng giúp học sinh và giáo viên phòng chống dịch bệnh hiệu quả.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {preventionTopics.map((topic, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                borderRadius: 3,
                boxShadow: 6,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 10,
                },
                bgcolor: topic.color,
              }}
            >
              <CardContent>
                <Box mb={2}>{topic.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, color: '#3f51b5' }}>
                  {topic.title}
                </Typography>
                {topic.description}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" mt={6}>
        <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ py: 1.5, px: 4, fontSize: '1rem', fontWeight: 'bold' }}>
          Quay lại trang chủ
        </Button>
      </Box>
    </Container>
  );
};

export default DiseasePrevention;
