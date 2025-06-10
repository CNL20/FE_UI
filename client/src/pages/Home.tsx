import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";

interface HomeProps {
  onLogin?: (role: string) => void;
}

const Home: React.FC<HomeProps> = ({ onLogin }) => {
  return (
    <>
      <Navbar isHomePage={true} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={4}
      >
        <Box textAlign="center" mb={6} maxWidth="800px">
          <Typography variant="h4" gutterBottom>
            Về Chúng Tôi
          </Typography>
          <Typography variant="body1" paragraph>
            Hệ thống Y tế Học đường của chúng tôi cam kết cung cấp dịch vụ chăm
            sóc sức khỏe chất lượng cao cho toàn bộ học sinh và nhân viên. Chúng
            tôi tập trung vào việc phòng ngừa, phát hiện sớm và can thiệp kịp
            thời các vấn đề sức khỏe, tạo ra một môi trường học đường an toàn và
            lành mạnh.
          </Typography>
          <Typography variant="body1" paragraph>
            Với đội ngũ y tá chuyên nghiệp và hệ thống quản lý hiện đại, chúng
            tôi đảm bảo mỗi học sinh đều nhận được sự quan tâm và chăm sóc y tế
            tốt nhất, giúp các em phát triển toàn diện cả về thể chất và tinh
            thần.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onLogin && onLogin("nurse")}
            sx={{ mt: 2 }}
          >
            Tìm Hiểu Thêm
          </Button>
        </Box>

        <Box textAlign="center" mt={8}>
          <Typography variant="h4" gutterBottom>
            Tính Năng Chính
          </Typography>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            gap={4}
            mt={4}
          >
            <Card sx={{ width: 250, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">Quản lý sức khỏe</Typography>
                <Typography variant="body2">
                  Theo dõi và quản lý sức khỏe học sinh toàn diện
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 250, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">Lịch tiêm chủng</Typography>
                <Typography variant="body2">
                  Lên lịch và theo dõi tiêm chủng cho học sinh
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 250, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">Thông báo y tế</Typography>
                <Typography variant="body2">
                  Nhận thông báo về các vấn đề sức khỏe quan trọng
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 250, textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">Tư vấn y tế</Typography>
                <Typography variant="body2">
                  Nhận tư vấn từ đội ngũ y tế học đường
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
