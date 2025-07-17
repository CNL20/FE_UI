import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../../styles.css";
import { Box, Grid, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MedicationIcon from "@mui/icons-material/Medication";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { ParentDashboardProps } from "../../types";

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const handleMedicationFormNavigation = () => {
    navigate("/parent/medication-form");
  };
  const handleHealthProfileNavigation = () => {
    navigate("/parent/health-profile-form");
  };  // ĐÃ SỬA Ở ĐÂY: Chuyển thẳng tới trang xác nhận tiêm chủng
  const handleVaccinationEventNavigation = () => {
    navigate("/parent/vaccination-event-dashboard/consent");
  };// Feature cards array for easier mapping and icon usage
  const features = [
    {
      title: "Khai báo hồ sơ sức khỏe",
      desc: "Khai báo thông tin sức khỏe của học sinh.",
      icon: <AssignmentIcon sx={{ fontSize: 60, mb: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }} />,
      bg: "#8B5CF6",
      handler: handleHealthProfileNavigation,
    },
    {
      title: "Sử dụng thuốc",
      desc: "Truy cập form gửi thuốc và gửi yêu cầu sử dụng thuốc.",
      icon: <MedicationIcon sx={{ fontSize: 60, mb: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }} />,
      bg: "#06B6D4",
      handler: handleMedicationFormNavigation,
    },    {
      title: "Sự kiện tiêm chủng",
      desc: "Xác nhận tiêm chủng cho con của bạn.",
      icon: <VaccinesIcon sx={{ fontSize: 60, mb: 1, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }} />,
      bg: "#10B981",
      handler: handleVaccinationEventNavigation, // Đã sửa: đi thẳng vào trang xác nhận tiêm chủng
    },
  ];
  return (
    <>
      <Navbar
        onLogout={onLogout}
      />
      <Box sx={{ height: 68 }} />      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          p: { xs: 2, md: 6 },
          borderRadius: "20px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
            pointerEvents: "none",
          },
        }}
      >        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            p: { xs: 3, md: 5 },
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            mb: 5,
            mt: { xs: 2, md: 8 },
            position: "relative",
            zIndex: 1,
          }}
        >          <Typography
            variant="h4"
            sx={{
              color: "white",
              textAlign: "center",
              fontWeight: 800,
              fontSize: { xs: 28, md: 36 },
              textShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
              background: "linear-gradient(45deg, #fff 30%, #f0f9ff 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: 1,
            }}
          >
            Chào phụ huynh đến với hệ thống y tế học đường
          </Typography>
        </Box>        <Grid
          container
          spacing={4}
          sx={{
            mt: 3,
            width: "100%",
            mx: "auto",
            maxWidth: 1200,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* First row - Two smaller cards */}
          {features[0] && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${features[0].bg} 0%, ${features[0].bg}dd 100%)`,
                  color: "white",
                  p: 4,
                  borderRadius: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  minHeight: 180,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.25)",
                    filter: "brightness(1.1)",
                  },
                  "&:active": {
                    transform: "translateY(-4px) scale(1.01)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transition: "left 0.6s ease-in-out",
                  },
                  "&:hover::before": {
                    left: "100%",
                  },
                }}
                onClick={features[0].handler}
                className="feature-card"
              >
                {features[0].icon}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 2, 
                    mt: 2,
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  {features[0].title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.9rem", md: "0.95rem" },
                    opacity: 0.95,
                    lineHeight: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {features[0].desc}
                </Typography>
              </Box>
            </Grid>
          )}

          {features[1] && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${features[1].bg} 0%, ${features[1].bg}dd 100%)`,
                  color: "white",
                  p: 4,
                  borderRadius: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  minHeight: 180,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.02)",
                    boxShadow: "0 16px 48px rgba(0, 0, 0, 0.25)",
                    filter: "brightness(1.1)",
                  },
                  "&:active": {
                    transform: "translateY(-4px) scale(1.01)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                    transition: "left 0.6s ease-in-out",
                  },
                  "&:hover::before": {
                    left: "100%",
                  },
                }}
                onClick={features[1].handler}
                className="feature-card"
              >
                {features[1].icon}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 800, 
                    mb: 2, 
                    mt: 2,
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    fontSize: { xs: "1.1rem", md: "1.2rem" },
                    letterSpacing: 0.5,
                  }}
                >
                  {features[1].title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "0.9rem", md: "0.95rem" },
                    opacity: 0.95,
                    lineHeight: 1.5,
                    fontWeight: 500,
                  }}
                >
                  {features[1].desc}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* Second row - Featured card (larger) */}
          {features[2] && (
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${features[2].bg} 0%, ${features[2].bg}dd 100%)`,
                  color: "white",
                  p: 5,
                  borderRadius: "24px",
                  textAlign: "center",
                  cursor: "pointer",
                  minHeight: 220,
                  maxWidth: 500,
                  width: "100%",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
                  border: "2px solid rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(15px)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-12px) scale(1.03)",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
                    filter: "brightness(1.15)",
                  },
                  "&:active": {
                    transform: "translateY(-6px) scale(1.02)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transition: "left 0.6s ease-in-out",
                  },
                  "&:hover::before": {
                    left: "100%",
                  },
                }}
                onClick={features[2].handler}
                className="feature-card featured"
              >
                <VaccinesIcon sx={{ fontSize: 80, mb: 2, filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.4))" }} />
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 900, 
                    mb: 3, 
                    textShadow: "0 3px 12px rgba(0, 0, 0, 0.4)",
                    fontSize: { xs: "1.4rem", md: "1.6rem" },
                    letterSpacing: 1,
                  }}
                >
                  {features[2].title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    opacity: 0.95,
                    lineHeight: 1.6,
                    fontWeight: 500,
                    maxWidth: 400,
                  }}
                >
                  {features[2].desc}
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ParentDashboard;