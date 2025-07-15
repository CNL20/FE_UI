import React from "react";
import { Box, Card, CardContent, Typography, Button, Container, Grid, Paper } from "@mui/material";
import { keyframes } from "@mui/system";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  isAuthenticated?: boolean;
}

// Keyframes cho animations
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

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();

  const handleDiseasePreventionClick = () => {
    navigate("/disease-prevention");
  };

  const handleNutritionGuideClick = () => {
    navigate("/nutrition-guide");
  };

  const handleMentalHealthCareClick = () => {
    navigate("/mental-health-care");
  };
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><radialGradient id=\"a\" cx=\".5\" cy=\".5\" r=\".5\"><stop offset=\"0\" stop-color=\"%23fff\" stop-opacity=\".1\"/><stop offset=\"1\" stop-color=\"%23fff\" stop-opacity=\"0\"/></radialGradient></defs><circle cx=\"50\" cy=\"50\" r=\"25\" fill=\"url(%23a)\"/></svg>') 0 0/50px 50px",
            opacity: 0.3,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  animation: `${fadeInUp} 1s ease-out`,
                  color: "white",
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    background: "linear-gradient(45deg, #fff 30%, #e1f5fe 90%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 3,
                    textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  Hệ Thống Y Tế Học Đường
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 300,
                    mb: 4,
                    opacity: 0.95,
                    lineHeight: 1.6,
                    fontSize: { xs: "1.2rem", md: "1.5rem" }
                  }}
                >
                  Chăm sóc sức khỏe toàn diện cho học sinh với công nghệ hiện đại
                </Typography>                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/explore")}
                    sx={{
                      background: "linear-gradient(45deg, #ff6b6b 30%, #ee5a24 90%)",
                      color: "white",
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      boxShadow: "0 8px 32px rgba(255, 107, 107, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 40px rgba(255, 107, 107, 0.4)",
                        background: "linear-gradient(45deg, #ee5a24 30%, #ff6b6b 90%)",
                      }
                    }}
                  >
                    Khám Phá Ngay
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/learn-more")}
                    sx={{
                      color: "white",
                      borderColor: "white",
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      borderWidth: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderColor: "white",
                        transform: "translateY(-2px)",
                      }
                    }}
                  >
                    Tìm Hiểu Thêm
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  animation: `${float} 3s ease-in-out infinite`,
                }}
              >
                <Box
                  component="img"
                  src="https://img.icons8.com/color/300/health-checkup.png"
                  alt="Health Care"
                  sx={{
                    maxWidth: "100%",
                    height: "auto",
                    filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>      </Box>

      {/* Health News Section */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              Tin Tức Sức Khỏe Học Đường
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.9)",
                fontWeight: 400,
                maxWidth: 600,
                mx: "auto",
                animation: `${fadeInUp} 1s ease-out 0.4s both`,
              }}
            >
              Cập nhật những thông tin mới nhất về sức khỏe học đường
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              {
                title: "Phòng chống dịch bệnh học đường",
                description: "Cập nhật các biện pháp phòng ngừa dịch bệnh, bảo vệ sức khỏe cho học sinh trong mùa dịch.",
                icon: "https://img.icons8.com/color/60/health-book.png",
                color: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
                onClick: handleDiseasePreventionClick,
                delay: "0.6s"
              },
              {
                title: "Dinh dưỡng hợp lý cho học sinh",
                description: "Lời khuyên về chế độ ăn uống, thực đơn lành mạnh giúp học sinh phát triển toàn diện.",
                icon: "https://img.icons8.com/color/60/vegetarian-food-symbol.png",
                color: "linear-gradient(135deg, #f1f8e9 0%, #c8e6c9 100%)",
                onClick: handleNutritionGuideClick,
                delay: "0.8s"
              },
              {
                title: "Chăm sóc sức khỏe tinh thần",
                description: "Hướng dẫn nhận biết, phòng tránh và hỗ trợ tâm lý cho học sinh trong môi trường học đường.",
                icon: "https://img.icons8.com/color/60/mental-health.png",
                color: "linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)",
                onClick: handleMentalHealthCareClick,
                delay: "1s"
              }
            ].map((news, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  onClick={news.onClick}
                  sx={{
                    height: "100%",
                    p: 3,
                    borderRadius: 4,
                    background: news.color,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    animation: `${fadeInUp} 1s ease-out ${news.delay} both`,
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-10px) scale(1.02)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }
                  }}
                >
                  <CardContent sx={{ textAlign: "center", p: 0 }}>
                    <Box
                      component="img"
                      src={news.icon}
                      alt={news.title}
                      sx={{
                        width: 60,
                        height: 60,
                        mb: 2,
                        transition: "all 0.3s ease",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#2c3e50",
                        mb: 2,
                      }}
                    >
                      {news.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#6c757d",
                        lineHeight: 1.6,
                      }}
                    >
                      {news.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box
        sx={{
          py: 8,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          color: "white",
        }}
      >
        <Container maxWidth="md">
          <Box textAlign="center">
            <Box
              sx={{
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
                mb: 4,
              }}
            >
              <Box
                component="img"
                src="https://img.icons8.com/color/60/phone.png"
                alt="contact"
                sx={{
                  mb: 2,
                  filter: "brightness(1.2)",
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                }}
              >
                Liên Hệ Với Chúng Tôi
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  opacity: 0.9,
                  mb: 4,
                }}
              >
                Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi
              </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    textAlign: "center",
                    animation: `${fadeInUp} 1s ease-out 0.4s both`,
                  }}
                >
                  <Box
                    component="img"
                    src="https://img.icons8.com/color/40/new-post.png"
                    alt="email"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    support@schoolhealth.vn
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    textAlign: "center",
                    animation: `${fadeInUp} 1s ease-out 0.6s both`,
                  }}
                >
                  <Box
                    component="img"
                    src="https://img.icons8.com/color/40/phone.png"
                    alt="phone"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Điện thoại
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    0123 456 789
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "rgba(255,255,255,0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    textAlign: "center",
                    animation: `${fadeInUp} 1s ease-out 0.8s both`,
                  }}
                >
                  <Box
                    component="img"
                    src="https://img.icons8.com/color/40/address.png"
                    alt="address"
                    sx={{ mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    Địa chỉ
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Lô E2a-7, Đường D1, Long Thạnh Mỹ, TP. Thủ Đức, TP.HCM
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              href="mailto:support@schoolhealth.vn"
              sx={{
                background: "linear-gradient(45deg, #ff6b6b 30%, #ee5a24 90%)",
                color: "white",
                px: 6,
                py: 2,
                borderRadius: 3,
                fontWeight: 600,
                fontSize: "1.1rem",
                boxShadow: "0 8px 32px rgba(255, 107, 107, 0.3)",
                transition: "all 0.3s ease",
                animation: `${fadeInUp} 1s ease-out 1s both`,
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(255, 107, 107, 0.4)",
                  background: "linear-gradient(45deg, #ee5a24 30%, #ff6b6b 90%)",
                }
              }}
            >
              Gửi Email Ngay
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
