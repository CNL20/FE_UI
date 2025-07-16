import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Container,
} from "@mui/material";
import { LocalHospital } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

interface HealthRecordsProps {
  onLogout?: () => void;
}

const HealthRecords: React.FC<HealthRecordsProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar {...(onLogout ? { onLogout } : {})} />
      <Box        sx={{
          minHeight: "100vh",
          background: `
            linear-gradient(135deg, 
              rgba(59, 130, 246, 1) 0%, 
              rgba(29, 78, 216, 1) 25%,
              rgba(37, 99, 235, 1) 50%,
              rgba(59, 130, 246, 1) 75%,
              rgba(96, 165, 250, 1) 100%
            )
          `,
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 100px,
                rgba(255, 255, 255, 0.02) 100px,
                rgba(255, 255, 255, 0.02) 101px
              ),
              repeating-linear-gradient(
                0deg,
                transparent,
                transparent 100px,
                rgba(255, 255, 255, 0.02) 100px,
                rgba(255, 255, 255, 0.02) 101px
              )
            `,
            pointerEvents: "none",
          },
        }}
      >
        <Container maxWidth="lg" sx={{ py: 6, position: "relative", zIndex: 1 }}>
          {/* Header Section */}
          <Box
            sx={{
              textAlign: "center",
              mb: 6,
              pt: 2,
            }}
          >
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)",
                backdropFilter: "blur(20px)",
                border: "2px solid rgba(255,255,255,0.3)",
                mb: 4,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                animation: "pulse 2s infinite",
              }}
            >
              <LocalHospital sx={{ fontSize: 50, color: "white" }} />
            </Box>
            
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "white",
                mb: 2,
                fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontSize: { xs: "2.5rem", md: "3rem" },
              }}
            >
              Quản lý hồ sơ y tế
            </Typography>
            
            <Typography
              variant="h6"
              sx={{
                color: "rgba(255,255,255,0.9)",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
                fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              Đây là trang quản lý hồ sơ y tế. Nội dung sẽ được cập nhật sau.
            </Typography>
          </Box>

          {/* Card Section */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
              <Card
                sx={{
                  borderRadius: 4,
                  background: `linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.95) 0%, 
                    rgba(255, 255, 255, 0.9) 100%
                  )`,
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                  transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  overflow: "hidden",
                  position: "relative",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 35px 70px rgba(0, 0, 0, 0.2)",
                    "& .card-icon": {
                      transform: "scale(1.1) rotate(5deg)",
                    },
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "4px",
                    background: "linear-gradient(90deg, #3B82F6 0%, #1D4ED8 50%, #2563EB 100%)",
                  },
                }}
              >
                <CardContent
                  sx={{
                    p: 4,
                    textAlign: "center",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    className="card-icon"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mb: 3,
                      transition: "all 0.4s ease",
                      boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    <LocalHospital sx={{ fontSize: 40, color: "white" }} />
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      color: "#1e293b",
                      mb: 2,
                      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    }}
                  >
                    Truy cập nhanh hồ sơ sức khỏe học sinh
                  </Typography>

                  <Button
                    variant="contained"
                    onClick={() => navigate("/manager/health-records/quick-access")}
                    sx={{
                      mt: 3,
                      background: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: 3,
                      textTransform: "none",
                      py: 1.5,
                      px: 4,
                      fontSize: "1rem",
                      fontFamily: "'Inter', 'Poppins', sans-serif",
                      boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 35px rgba(59, 130, 246, 0.4)",
                      },
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <style>
          {`
            @keyframes pulse {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
          `}
        </style>
      </Box>
    </>
  );
};

export default HealthRecords;
