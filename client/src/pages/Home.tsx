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
        sx={{
          backgroundImage: "url('https://i.pinimg.com/736x/10/c3/85/10c385aa71ae13c44beb7d59137811b2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box textAlign="center" mb={6} maxWidth="850px" sx={{ color: "rgb(0, 0, 0)" }}>
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
      {/* Section: Tin tức về sức khỏe học đường */}
      <Box id="school-health-news" textAlign="center" mt={12} mb={8}>
        <Typography
          variant="h4"
          gutterBottom
          color="primary"
          sx={{ fontWeight: 700, mb: 4 }}
        >
          Tin tức về sức khỏe học đường
        </Typography>
        <Box display="flex" justifyContent="center" gap={4} flexWrap="wrap">
          {/* Card tin tức 1 */}
          <Card
            sx={{
              width: 320,
              p: 2,
              borderRadius: 4,
              boxShadow: 6,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-8px) scale(1.03)",
                boxShadow: 12,
              },
              background: "linear-gradient(135deg, #e3f2fd 60%, #bbdefb 100%)",
              animation: "fadeInUp 1s",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src="https://img.icons8.com/color/48/000000/health-book.png"
                  alt="icon"
                />
              </Box>
              <Typography variant="h6" fontWeight={600} color="primary.main">
                Phòng chống dịch bệnh học đường
              </Typography>
              <Typography variant="body2" mt={1} color="text.secondary">
                Cập nhật các biện pháp phòng ngừa dịch bệnh, bảo vệ sức khỏe cho
                học sinh trong mùa dịch.
              </Typography>
            </CardContent>
          </Card>
          {/* Card tin tức 2 */}
          <Card
            sx={{
              width: 320,
              p: 2,
              borderRadius: 4,
              boxShadow: 6,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-8px) scale(1.03)",
                boxShadow: 12,
              },
              background: "linear-gradient(135deg, #f1f8e9 60%, #c8e6c9 100%)",
              animation: "fadeInUp 1.2s",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src="https://img.icons8.com/color/48/000000/vegetarian-food-symbol.png"
                  alt="icon"
                />
              </Box>
              <Typography variant="h6" fontWeight={600} color="success.main">
                Dinh dưỡng hợp lý cho học sinh
              </Typography>
              <Typography variant="body2" mt={1} color="text.secondary">
                Lời khuyên về chế độ ăn uống, thực đơn lành mạnh giúp học sinh
                phát triển toàn diện.
              </Typography>
            </CardContent>
          </Card>
          {/* Card tin tức 3 */}
          <Card
            sx={{
              width: 320,
              p: 2,
              borderRadius: 4,
              boxShadow: 6,
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-8px) scale(1.03)",
                boxShadow: 12,
              },
              background: "linear-gradient(135deg, #fff3e0 60%, #ffe0b2 100%)",
              animation: "fadeInUp 1.4s",
            }}
          >
            <CardContent>
              <Box display="flex" justifyContent="center" mb={2}>
                <img
                  src="https://img.icons8.com/color/48/000000/mental-health.png"
                  alt="icon"
                />
              </Box>
              <Typography variant="h6" fontWeight={600} color="#ff9800">
                Chăm sóc sức khỏe tinh thần
              </Typography>
              <Typography variant="body2" mt={1} color="text.secondary">
                Hướng dẫn nhận biết, phòng tránh và hỗ trợ tâm lý cho học sinh
                trong môi trường học đường.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* Section: Liên hệ */}
      <Box
        id="contact"
        width="100%"
        minHeight="150px"
        py={3}
        px={1}
        sx={{
          background: "linear-gradient(135deg, #e3f2fd 60%, #fce4ec 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          animation: "fadeInUp 1.6s",
        }}
      >
        <Box maxWidth={340} width="100%" textAlign="center">
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <img
              src="https://img.icons8.com/color/40/000000/phone-disconnected.png"
              alt="contact-icon"
              style={{ marginBottom: 6 }}
            />
            <Typography
              variant="h5"
              gutterBottom
              color="primary"
              fontWeight={700}
            >
              Liên hệ
            </Typography>
          </Box>
          <Typography
            variant="body2"
            paragraph
            color="text.secondary"
            fontSize={15}
          >
            Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với
            chúng tôi qua các thông tin sau:
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            gap={0.5}
            mb={2}
            mx="auto"
            maxWidth={320}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <img
                src="https://img.icons8.com/color/18/000000/new-post.png"
                alt="email"
              />
              <Typography variant="body2" fontSize={14}>
                Email:{" "}
                <a
                  href="mailto:support@schoolhealth.vn"
                  style={{ color: "#1976d2", textDecoration: "underline" }}
                >
                  support@schoolhealth.vn
                </a>
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <img
                src="https://img.icons8.com/color/18/000000/phone.png"
                alt="phone"
              />
              <Typography variant="body2" fontSize={14}>
                Điện thoại: 0123 456 789
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <img
                src="https://img.icons8.com/color/18/000000/address.png"
                alt="address"
              />
              <Typography variant="body2" fontSize={14}>
                Địa chỉ: 123 Đường Sức Khỏe, Quận Học Đường, TP. Giáo Dục
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              href="mailto:support@schoolhealth.vn"
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1,
                fontWeight: 600,
                fontSize: 15,
                boxShadow: 3,
                transition: "background 0.3s, transform 0.2s",
                background: "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #1565c0 60%, #1976d2 100%)",
                  transform: "scale(1.05)",
                },
              }}
              startIcon={
                <img
                  src="https://img.icons8.com/ios-filled/18/ffffff/new-post.png"
                  alt="send"
                />
              }
            >
              Gửi Email
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
