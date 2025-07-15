import React from "react";
import { Box, Card, CardContent, Typography, Button, Container, Grid } from "@mui/material";
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
          backgroundImage: "url('https://images.unsplash.com/photo-1631173716529-fd1696a807b0?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(245, 250, 255, 0.6) 50%, rgba(237, 242, 247, 0.6) 100%)",
            zIndex: 1,
          }
        }}
      >        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  animation: `${fadeInUp} 1s ease-out`,
                  color: "white",
                }}
              >                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    color: "#1a202c",
                    mb: 3,
                    textShadow: "2px 2px 4px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.5)",
                    lineHeight: 1.2,
                  }}
                >
                  Hệ Thống Y Tế Học Đường
                </Typography>                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 500,
                    fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    mb: 4,
                    opacity: 0.9,
                    lineHeight: 1.6,
                    fontSize: { xs: "1.2rem", md: "1.5rem" },
                    color: "#2d3748",
                    textShadow: "1px 1px 2px rgba(255,255,255,0.8)"
                  }}
                >
                  Chăm sóc sức khỏe toàn diện cho học sinh với công nghệ hiện đại
                </Typography>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/explore")}
                    sx={{
                      background: "linear-gradient(45deg, #2b6cb0 30%, #3182ce 90%)",
                      color: "white",
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      fontFamily: "'Inter', 'Poppins', sans-serif",
                      boxShadow: "0 8px 32px rgba(43, 108, 176, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 40px rgba(43, 108, 176, 0.5)",
                        background: "linear-gradient(45deg, #3182ce 30%, #2b6cb0 90%)",
                      }
                    }}
                  >
                    Khám Phá Ngay
                  </Button>                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/learn-more")}
                    sx={{
                      color: "#2d3748",
                      borderColor: "#2d3748",
                      px: 4,
                      py: 1.5,
                      borderRadius: 3,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      fontFamily: "'Inter', 'Poppins', sans-serif",
                      borderWidth: 2,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(45, 55, 72, 0.1)",
                        borderColor: "#2d3748",
                        transform: "translateY(-2px)",
                      }
                    }}
                  >
                    Tìm Hiểu Thêm
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container></Box>      {/* Health News Section */}
      <Box
        sx={{
          py: 10,
          background: "linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%)",
          position: "relative",
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" mb={8}>            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                color: "#2d3748",
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              Tin Tức Sức Khỏe Học Đường
            </Typography>            <Typography
              variant="h6"
              sx={{
                color: "#4a5568",
                fontWeight: 400,
                fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                maxWidth: 600,
                mx: "auto",
                animation: `${fadeInUp} 1s ease-out 0.4s both`,
              }}
            >
              Cập nhật những thông tin mới nhất về sức khỏe học đường
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {[              {
                title: "Phòng chống dịch bệnh học đường",
                description: "Cập nhật các biện pháp phòng ngừa dịch bệnh, bảo vệ sức khỏe cho học sinh trong mùa dịch.",
                color: "linear-gradient(135deg, #e6fffa 0%, #b2f5ea 100%)",
                onClick: handleDiseasePreventionClick,
                delay: "0.6s"
              },
              {
                title: "Dinh dưỡng hợp lý cho học sinh",
                description: "Lời khuyên về chế độ ăn uống, thực đơn lành mạnh giúp học sinh phát triển toàn diện.",
                color: "linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)",
                onClick: handleNutritionGuideClick,
                delay: "0.8s"
              },
              {
                title: "Chăm sóc sức khỏe tinh thần",
                description: "Hướng dẫn nhận biết, phòng tránh và hỗ trợ tâm lý cho học sinh trong môi trường học đường.",
                color: "linear-gradient(135deg, #fefcbf 0%, #fed7aa 100%)",
                onClick: handleMentalHealthCareClick,
                delay: "1s"
              }
            ].map((news, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  onClick={news.onClick}
                  sx={{
                    height: "100%",
                    p: 3,                    borderRadius: 4,
                    background: news.color,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    animation: `${fadeInUp} 1s ease-out ${news.delay} both`,
                    cursor: "pointer",
                    "&:hover": {
                      transform: "translateY(-10px) scale(1.02)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    }
                  }}
                >                  <CardContent sx={{ textAlign: "center", p: 0 }}>                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                        color: "#2d3748",
                        mb: 2,
                        mt: 2,
                      }}
                    >
                      {news.title}
                    </Typography>                    <Typography
                      variant="body2"
                      sx={{
                        color: "#4a5568",
                        fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
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
      </Box>      {/* Contact Section */}
      <Box
        sx={{
          py: 12,
          background: "linear-gradient(135deg, #1a202c 0%, #2d3748 30%, #4a5568 70%, #718096 100%)",
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
            background: "radial-gradient(circle at 20% 80%, rgba(66, 153, 225, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(72, 187, 120, 0.1) 0%, transparent 50%)",
            zIndex: 1,
          }
        }}
      >        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Box textAlign="center">
            <Box
              sx={{
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
                mb: 6,
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4299e1 0%, #3182ce 100%)",
                  mb: 3,
                  boxShadow: "0 10px 30px rgba(66, 153, 225, 0.3)",
                }}
              >
                <Box
                  component="img"
                  src="https://img.icons8.com/fluency/48/phone.png"
                  alt="contact"
                  sx={{
                    width: 40,
                    height: 40,
                    filter: "brightness(1.1)",
                  }}
                />
              </Box>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  mb: 3,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  background: "linear-gradient(135deg, #fff 0%, #e2e8f0 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Liên Hệ Với Chúng Tôi
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 400,
                  fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  opacity: 0.9,
                  mb: 4,
                  fontSize: { xs: "1.1rem", md: "1.3rem" },
                  maxWidth: 600,
                  mx: "auto",
                  lineHeight: 1.6,
                }}
              >
                Nếu bạn có bất kỳ câu hỏi hoặc cần hỗ trợ, vui lòng liên hệ với chúng tôi
              </Typography>
            </Box>            <Grid container spacing={4} sx={{ mb: 6 }}>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    textAlign: "center",
                    animation: `${fadeInUp} 1s ease-out 0.4s both`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 100%)",
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)",
                      mb: 3,
                      boxShadow: "0 8px 25px rgba(229, 62, 62, 0.3)",
                    }}
                  >
                    <Box
                      component="img"
                      src="https://img.icons8.com/fluency/32/new-post.png"
                      alt="email"
                      sx={{ width: 28, height: 28 }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontFamily: "'Inter', 'Poppins', sans-serif" }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontFamily: "'Inter', 'Poppins', sans-serif", fontSize: "0.95rem" }}>
                    support@schoolhealth.vn
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    textAlign: "center",
                    animation: `${fadeInUp} 1s ease-out 0.6s both`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 100%)",
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #38a169 0%, #2f855a 100%)",
                      mb: 3,
                      boxShadow: "0 8px 25px rgba(56, 161, 105, 0.3)",
                    }}
                  >
                    <Box
                      component="img"
                      src="https://img.icons8.com/fluency/32/phone.png"
                      alt="phone"
                      sx={{ width: 28, height: 28 }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontFamily: "'Inter', 'Poppins', sans-serif" }}>
                    Điện thoại
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontFamily: "'Inter', 'Poppins', sans-serif", fontSize: "0.95rem" }}>
                    0123 456 789
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    textAlign: "center",
                    animation: `${fadeInUp} 1s ease-out 0.8s both`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                      background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 100%)",
                    }
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #d69e2e 0%, #b7791f 100%)",
                      mb: 3,
                      boxShadow: "0 8px 25px rgba(214, 158, 46, 0.3)",
                    }}
                  >
                    <Box
                      component="img"
                      src="https://img.icons8.com/fluency/32/address.png"
                      alt="address"
                      sx={{ width: 28, height: 28 }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontFamily: "'Inter', 'Poppins', sans-serif" }}>
                    Địa chỉ
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontFamily: "'Inter', 'Poppins', sans-serif", fontSize: "0.95rem" }}>
                    Lô E2a-7, Đường D1, Long Thạnh Mỹ, TP. Thủ Đức, TP.HCM
                  </Typography>
                </Card>
              </Grid>
            </Grid>            <Button
              variant="contained"
              size="large"
              href="mailto:support@schoolhealth.vn"
              sx={{
                background: "linear-gradient(135deg, #4299e1 0%, #3182ce 50%, #2c5282 100%)",
                color: "white",
                px: 8,
                py: 3,
                borderRadius: 4,
                fontWeight: 700,
                fontSize: "1.2rem",
                fontFamily: "'Inter', 'Poppins', sans-serif",
                boxShadow: "0 12px 40px rgba(66, 153, 225, 0.4)",
                transition: "all 0.4s ease",
                animation: `${fadeInUp} 1s ease-out 1s both`,
                textTransform: "none",
                "&:hover": {
                  transform: "translateY(-4px) scale(1.02)",
                  boxShadow: "0 20px 50px rgba(66, 153, 225, 0.6)",
                  background: "linear-gradient(135deg, #3182ce 0%, #2c5282 50%, #2a4d7c 100%)",
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