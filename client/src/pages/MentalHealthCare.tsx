import React from 'react';
import { Box, Typography, Container, Button, Card, CardContent, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import PsychologyIcon from '@mui/icons-material/Psychology';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HealingIcon from '@mui/icons-material/Healing';
import SpaIcon from '@mui/icons-material/Spa';

const MentalHealthCare: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  const mentalHealthTopics = [
    {
      icon: <SelfImprovementIcon sx={{ fontSize: 60, color: '#fbc02d' }} />,
      title: 'Nhận biết cảm xúc',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Giúp học sinh hiểu và gọi tên các cảm xúc của mình (vui, buồn, giận, sợ hãi).</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Dấu hiệu nhận biết khi bản thân hoặc bạn bè có vấn đề về sức khỏe tinh thần.</Typography>
        </>
      ),
      color: '#fff3e0',
    },
    {
      icon: <PsychologyIcon sx={{ fontSize: 60, color: '#1976d2' }} />,
      title: 'Kỹ năng đối phó stress',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Hướng dẫn các kỹ thuật thư giãn: hít thở sâu, thiền, nghe nhạc.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Quản lý thời gian hiệu quả, cân bằng học tập và giải trí.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tầm quan trọng của giấc ngủ đủ và chất lượng.</Typography>
        </>
      ),
      color: '#e3f2fd',
    },
    {
      icon: <FamilyRestroomIcon sx={{ fontSize: 60, color: '#4caf50' }} />,
      title: 'Xây dựng mối quan hệ lành mạnh',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Kỹ năng giao tiếp hiệu quả với gia đình và bạn bè.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tầm quan trọng của việc chia sẻ và lắng nghe.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Cách xây dựng mạng lưới hỗ trợ tích cực.</Typography>
        </>
      ),
      color: '#e8f5e9',
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 60, color: '#ff5722' }} />,
      title: 'Tìm kiếm sự giúp đỡ chuyên nghiệp',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Khi nào cần tìm gặp chuyên gia tâm lý, giáo viên tư vấn.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Thông tin về các dịch vụ tư vấn tâm lý học đường hoặc cộng đồng.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Khuyến khích học sinh và phụ huynh không ngần ngại tìm kiếm sự hỗ trợ.</Typography>
        </>
      ),
      color: '#fbe9e7',
    },
    {
      icon: <HealingIcon sx={{ fontSize: 60, color: '#9c27b0' }} />,
      title: 'Hoạt động nâng cao sức khỏe tinh thần',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tham gia các hoạt động ngoại khóa, thể thao, nghệ thuật.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Thực hành chánh niệm (mindfulness) và lòng biết ơn.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Tình nguyện và các hoạt động xã hội.</Typography>
        </>
      ),
      color: '#f3e5f5',
    },
    {
      icon: <SpaIcon sx={{ fontSize: 60, color: '#009688' }} />,
      title: 'Môi trường học đường an toàn',
      description: (
        <>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Xây dựng môi trường học tập không áp lực, thân thiện.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Phòng chống bạo lực học đường và phân biệt đối xử.</Typography>
          <Typography variant="body2" color="text.secondary" mb={0.5}>Vai trò của giáo viên, phụ huynh trong việc hỗ trợ sức khỏe tinh thần học sinh.</Typography>
        </>
      ),
      color: '#e0f2f1',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, py: 6, bgcolor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: '#673ab7' }}>
          Chăm Sóc Sức Khỏe Tinh Thần Học Đường
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Một tâm hồn khỏe mạnh là nền tảng cho sự phát triển toàn diện. Khám phá các phương pháp hỗ trợ sức khỏe tinh thần cho học sinh trong môi trường học đường.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {mentalHealthTopics.map((topic, index) => (
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

export default MentalHealthCare; 