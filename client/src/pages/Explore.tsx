import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent, Button, Paper } from "@mui/material";
import { keyframes } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Animation keyframes
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Explore: React.FC = () => {
  const navigate = useNavigate();
  const features = [    {
      title: "Quản lý Hồ sơ Sức khỏe",
      description: "Lưu trữ và quản lý thông tin sức khỏe học sinh một cách toàn diện và an toàn",
      icon: "https://img.icons8.com/color/80/health-book.png",
      color: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
      details: ["Hồ sơ điện tử", "Lịch sử bệnh án", "Thông tin tiêm chủng", "Dữ liệu biometric"]
    },
    {
      title: "Chiến dịch Khám sức khỏe",
      description: "Tổ chức và theo dõi các chiến dịch khám sức khỏe định kỳ cho học sinh",
      icon: "https://img.icons8.com/color/80/stethoscope.png",
      color: "linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)",
      details: ["Lên lịch khám", "Bổ nhiệm nhân viên", "Theo dõi kết quả", "Thông báo phụ huynh"]
    },
    {
      title: "Quản lý Tiêm chủng",
      description: "Theo dõi lịch tiêm chủng và đảm bảo học sinh được tiêm đầy đủ",
      icon: "https://img.icons8.com/color/80/syringe.png",
      color: "linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)",
      details: ["Lịch tiêm chủng", "Quản lý vaccine", "Thông báo nhắc nhở", "Báo cáo tiến độ"]
    },
    {
      title: "Hệ thống Thông báo",
      description: "Gửi thông báo kịp thời về tình hình sức khỏe và các sự kiện y tế",
      icon: "https://img.icons8.com/color/80/bell.png",
      color: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
      details: ["Thông báo tức thì", "Email tự động", "SMS nhắc nhở", "Cảnh báo khẩn cấp"]
    },
    {
      title: "Báo cáo và Thống kê",
      description: "Tạo báo cáo chi tiết và thống kê về tình hình sức khỏe học đường",
      icon: "https://img.icons8.com/color/80/bar-chart.png",
      color: "linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)",
      details: ["Dashboard tổng quan", "Báo cáo chi tiết", "Biểu đồ thống kê", "Xuất dữ liệu"]
    },
    {
      title: "Tư vấn Y tế",
      description: "Kết nối với đội ngũ y tế chuyên nghiệp để được tư vấn và hỗ trợ",
      icon: "https://img.icons8.com/color/80/doctor-male.png",
      color: "linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)",
      details: ["Tư vấn trực tuyến", "Đặt lịch hẹn", "Hỗ trợ 24/7", "Chuyên gia đầu ngành"]
    }
  ];

  const benefits = [
    {
      title: "Hiệu quả cao",
      description: "Tăng 90% hiệu quả quản lý sức khỏe học sinh",
      icon: "📈"
    },
    {
      title: "An toàn tuyệt đối", 
      description: "Bảo mật thông tin theo tiêu chuẩn quốc tế",
      icon: "🔒"
    },
    {
      title: "Tiết kiệm thời gian",
      description: "Giảm 70% thời gian xử lý hồ sơ giấy tờ",
      icon: "⏰"
    },
    {
      title: "Dễ sử dụng",
      description: "Giao diện thân thiện, dễ học và sử dụng",
      icon: "😊"
    }
  ];

  return (
    <>
      <Navbar />      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          py: 8,
          mt: 8,
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box textAlign="center">            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                animation: `${fadeInUp} 1s ease-out`,
                fontSize: { xs: "2rem", md: "3rem" }
              }}
            >
              Khám Phá Hệ Thống Y Tế Học Đường
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 300,
                mb: 4,
                opacity: 0.9,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
                maxWidth: 800,
                mx: "auto"
              }}
            >
              Trải nghiệm công nghệ quản lý y tế hiện đại nhất dành cho trường học
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Main Features Section */}
      <Box sx={{ py: 8, background: "linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#2c3e50",
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.4s both`,
              }}
            >
              🎯 Tính Năng Chính
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    background: feature.color,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    animation: `${fadeInUp} 1s ease-out ${0.6 + index * 0.1}s both`,
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-10px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      "& .feature-icon": {
                        animation: `${pulse} 1s ease-in-out infinite`,
                      }
                    }
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Box
                      component="img"
                      src={feature.icon}
                      alt={feature.title}
                      className="feature-icon"
                      sx={{
                        width: 80,
                        height: 80,
                        mb: 3,
                        transition: "all 0.3s ease",
                      }}
                    />
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 600,
                        color: "#2c3e50",
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#6c757d",
                        lineHeight: 1.6,
                        mb: 3
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <Box sx={{ textAlign: "left" }}>
                      {feature.details.map((detail, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          sx={{
                            color: "#495057",
                            mb: 1,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Box
                            component="span"
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              backgroundColor: "#28a745",
                              mr: 2,
                              flexShrink: 0
                            }}
                          />
                          {detail}
                        </Typography>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Benefits Section */}
      <Box sx={{ py: 8, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              ✨ Lợi Ích Vượt Trội
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    transition: "all 0.3s ease",
                    animation: `${fadeInUp} 1s ease-out ${0.4 + index * 0.1}s both`,
                    "&:hover": {
                      transform: "translateY(-5px)",
                      background: "rgba(255,255,255,0.15)",
                    }
                  }}
                >
                  <Typography variant="h2" sx={{ mb: 2 }}>
                    {benefit.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {benefit.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {benefit.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{ py: 8, background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
        <Container maxWidth="md">
          <Box textAlign="center" sx={{ color: "white" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              🎉 Sẵn sàng bắt đầu?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 300,
                mb: 4,
                opacity: 0.9,
                animation: `${fadeInUp} 1s ease-out 0.4s both`,
              }}
            >
              Hãy liên hệ với chúng tôi để được tư vấn và demo hệ thống miễn phí
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                justifyContent: "center",
                flexWrap: "wrap",
                animation: `${fadeInUp} 1s ease-out 0.6s both`,
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/login")}
                sx={{
                  background: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255,255,255,0.3)",
                    transform: "translateY(-2px)",
                  }
                }}
              >
                🚀 Bắt Đầu Ngay
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/")}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.5)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderColor: "white",
                    transform: "translateY(-2px)",
                  }
                }}
              >
                🏠 Về Trang Chủ
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Explore;