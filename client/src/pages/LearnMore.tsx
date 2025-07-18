import React from "react";
import { Box, Typography, Container, Grid, Card, CardContent, Button, Paper, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

const LearnMore: React.FC = () => {
  const navigate = useNavigate();
  const serviceDetails = [
    {
      category: "Dịch vụ Y tế Cơ bản",
      services: [
        {
          title: "Khám sức khỏe định kỳ",
          description: "Thực hiện khám sức khỏe tổng quát cho học sinh theo quy định của Bộ Y tế",
          features: ["Đo chiều cao, cân nặng", "Kiểm tra thị lực, thính lực", "Khám nội khoa, ngoại khoa", "Đánh giá tình trạng dinh dưỡng"]
        },
        {
          title: "Chăm sóc y tế hàng ngày",
          description: "Xử lý các tình huống y tế phát sinh trong quá trình học tập",
          features: ["Sơ cứu tai nạn thương tích", "Chăm sóc học sinh ốm", "Theo dõi học sinh có bệnh lý", "Tư vấn sức khỏe cá nhân"]
        },
        {
          title: "Quản lý bệnh mãn tính",
          description: "Theo dõi và hỗ trợ học sinh có các bệnh lý mãn tính",
          features: ["Quản lý bệnh hen suyễn", "Theo dõi tiểu đường", "Chăm sóc bệnh tim mạch", "Hỗ trợ rối loạn tâm lý"]
        }
      ]
    },    {
      category: "Chương trình Tiêm chủng", 
      services: [
        {
          title: "Tiêm chủng mở rộng",
          description: "Thực hiện tiêm chủng theo chương trình quốc gia và khuyến cáo",
          features: ["Vaccine phòng bệnh truyền nhiễm", "Tiêm nhắc lại theo lịch", "Quản lý tác dụng phụ", "Báo cáo tiến độ tiêm chủng"]
        },
        {
          title: "Tiêm chủng bổ sung",
          description: "Các vaccine khuyến cáo bổ sung theo từng độ tuổi",
          features: ["Vaccine cúm mùa", "Vaccine viêm gan B", "Vaccine HPV", "Vaccine phòng ung thư cổ tử cung"]
        }
      ]
    },    {
      category: "Hệ thống Quản lý",
      services: [
        {
          title: "Quản lý hồ sơ điện tử",
          description: "Lưu trữ và quản lý thông tin sức khỏe học sinh một cách bảo mật",
          features: ["Hồ sơ y tế cá nhân", "Lịch sử khám chữa bệnh", "Kết quả xét nghiệm", "Hình ảnh y học"]
        },
        {
          title: "Báo cáo và thống kê",
          description: "Tạo các báo cáo chi tiết về tình hình sức khỏe học đường",
          features: ["Dashboard tổng quan", "Báo cáo bệnh tật", "Thống kê tiêm chủng", "Phân tích xu hướng"]
        }
      ]
    }
  ];
  const technologies = [
    {
      name: "Trí tuệ nhân tạo (AI)",
      description: "Sử dụng AI để phân tích dữ liệu sức khỏe và đưa ra khuyến nghị"
    },
    {
      name: "Blockchain",
      description: "Bảo mật thông tin y tế với công nghệ blockchain tiên tiến"
    },
    {
      name: "IoT & Wearables",
      description: "Kết nối với các thiết bị đeo theo dõi sức khỏe"
    },
    {
      name: "Cloud Computing",
      description: "Lưu trữ đám mây an toàn, truy cập mọi lúc mọi nơi"
    }  ];

  const faqs = [
    {
      question: "Hệ thống có tuân thủ quy định về bảo mật thông tin y tế không?",
      answer: "Có, chúng tôi tuân thủ nghiêm ngặt các quy định về bảo mật thông tin y tế theo luật pháp Việt Nam và các tiêu chuẩn quốc tế như HIPAA, ISO 27001."
    },
    {
      question: "Thời gian triển khai hệ thống mất bao lâu?",
      answer: "Thời gian triển khai phụ thuộc vào quy mô trường học. Thông thường từ 2-4 tuần cho trường nhỏ và 1-3 tháng cho hệ thống lớn, bao gồm cả đào tạo nhân viên."
    },
    {
      question: "Có hỗ trợ đào tạo sử dụng hệ thống không?",
      answer: "Có, chúng tôi cung cấp đào tạo toàn diện cho tất cả người dùng, bao gồm tài liệu hướng dẫn, video tutorial và đào tạo trực tiếp tại trường."
    },
    {
      question: "Hệ thống có thể tích hợp với các phần mềm khác không?",
      answer: "Có, hệ thống của chúng tôi hỗ trợ tích hợp với nhiều phần mềm quản lý trường học, hệ thống bệnh viện và các dịch vụ y tế khác thông qua API."
    },
    {
      question: "Hệ thống có hoàn toàn miễn phí không?",
      answer: "Có, hệ thống Y tế Học đường của chúng tôi hoàn toàn miễn phí cho tất cả các trường học. Chúng tôi cam kết cung cấp dịch vụ chăm sóc sức khỏe học sinh mà không tính bất kỳ khoản phí nào."
    }
  ];

  return (
    <>
      <Navbar />        {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: "url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          pt: 12,
          pb: 8,
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
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12}>
              <Box
                sx={{
                  animation: `${fadeInUp} 1s ease-out`,
                  textAlign: "center"
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: "2rem", md: "3rem" },
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)"
                  }}
                >
                  Tìm Hiểu Chi Tiết
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 300,
                    mb: 4,
                    opacity: 0.9,
                    lineHeight: 1.6,
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)"
                  }}
                >
                  Khám phá toàn bộ dịch vụ và giải pháp y tế học đường toàn diện của chúng tôi
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>      {/* Services Detail Section */}
      <Box sx={{ py: 8, background: "linear-gradient(180deg, #e3f2fd 0%, #bbdefb 100%)" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#1565c0",
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              Dịch Vụ Chi Tiết
            </Typography>
          </Box>

          {serviceDetails.map((category, categoryIndex) => (
            <Box key={categoryIndex} mb={6}>              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: "#1976d2",
                  mb: 4,
                  textAlign: "center"
                }}
              >
                {category.category}
              </Typography>
              <Grid container spacing={4}>
                {category.services.map((service, serviceIndex) => (
                  <Grid item xs={12} md={6} lg={4} key={serviceIndex}>
                    <Card
                      sx={{
                        height: "100%",
                        borderRadius: 4,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        transition: "all 0.3s ease",
                        animation: `${fadeInUp} 1s ease-out ${0.4 + serviceIndex * 0.1}s both`,
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 600,
                            color: "#0d47a1",
                            mb: 2,
                          }}
                        >
                          {service.title}
                        </Typography>                        <Typography
                          variant="body1"
                          sx={{
                            color: "#424242",
                            mb: 3,
                            lineHeight: 1.6
                          }}
                        >
                          {service.description}
                        </Typography>
                        <Box>
                          {service.features.map((feature, idx) => (
                            <Typography
                              key={idx}
                              variant="body2"                              sx={{
                                color: "#1976d2",
                                mb: 1,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Box
                                component="span"
                                sx={{                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor: "#2196f3",
                                  mr: 2,
                                  flexShrink: 0
                                }}
                              />
                              {feature}
                            </Typography>
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Container>
      </Box>      {/* Technology Section */}
      <Box sx={{ py: 8, background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              Công Nghệ Tiên Tiến
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {technologies.map((tech, index) => (
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
                >                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {tech.name}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    {tech.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>      {/* Free Service Highlight Section */}
      <Box sx={{ py: 8, background: "linear-gradient(135deg, #1e88e5 0%, #1976d2 100%)" }}>
        <Container maxWidth="lg">
          <Box textAlign="center">            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              Hoàn Toàn Miễn Phí
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 300,
                color: "white",
                mb: 4,
                opacity: 0.9,
                animation: `${fadeInUp} 1s ease-out 0.4s both`,
              }}
            >
              Chúng tôi cam kết cung cấp dịch vụ Y tế Học đường hoàn toàn miễn phí cho tất cả các trường học
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    animation: `${fadeInUp} 1s ease-out 0.6s both`,
                  }}
                >                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Không Chi Phí
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Không có bất kỳ khoản phí ẩn nào
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    animation: `${fadeInUp} 1s ease-out 0.8s both`,
                  }}
                >                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Đầy Đủ Tính Năng
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Tất cả tính năng đều có sẵn
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: "center",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "white",
                    animation: `${fadeInUp} 1s ease-out 1s both`,
                  }}
                >                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Hỗ Trợ 24/7
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Đội ngũ hỗ trợ luôn sẵn sàng
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>      {/* FAQ Section */}
      <Box sx={{ py: 8, background: "linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)" }}>
        <Container maxWidth="md">
          <Box textAlign="center" mb={6}>            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              Câu Hỏi Thường Gặp
            </Typography>
          </Box>

          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 2,
                borderRadius: 2,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
                animation: `${fadeInUp} 1s ease-out ${0.4 + index * 0.1}s both`,
                "&:before": {
                  display: "none",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                sx={{
                  "& .MuiAccordionSummary-content": {
                    margin: "16px 0",
                  }
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.6 }}>
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </Box>      {/* Call to Action Section */}
      <Box sx={{ py: 8, background: "linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)" }}>
        <Container maxWidth="md">
          <Box textAlign="center" sx={{ color: "white" }}>            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                animation: `${fadeInUp} 1s ease-out 0.2s both`,
              }}
            >
              Bắt Đầu Hành Trình
            </Typography><Typography
              variant="h6"
              sx={{
                fontWeight: 300,
                mb: 4,
                opacity: 0.9,
                animation: `${fadeInUp} 1s ease-out 0.4s both`,
              }}
            >
              Liên hệ với chúng tôi ngay hôm nay để bắt đầu sử dụng hệ thống Y tế Học đường miễn phí
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
                href="mailto:support@schoolhealth.vn"                sx={{
                  background: "linear-gradient(45deg, #1976d2 30%, #0d47a1 90%)",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  fontSize: "1.1rem",
                  boxShadow: "0 8px 32px rgba(25, 118, 210, 0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 40px rgba(25, 118, 210, 0.4)",
                  }
                }}>
                Liên Hệ Ngay
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
                }}              >
                Về Trang Chủ
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default LearnMore;