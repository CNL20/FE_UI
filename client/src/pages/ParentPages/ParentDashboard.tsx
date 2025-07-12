import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../../styles.css";
import { Box, Grid, Typography } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MedicationIcon from "@mui/icons-material/Medication";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import { ParentDashboardProps } from "../../types";
import { ROUTES } from "../../constants";

const ParentDashboard: React.FC<ParentDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  // Navigation handlers
  const handleNavigateToHome = () => {
    navigate(ROUTES.HOME);
  };
  const handleNavigateToNews = () => {
    navigate(ROUTES.HOME);
    setTimeout(() => {
      const el = document.getElementById("school-health-news");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };
  const handleNavigateToContact = () => {
    navigate(ROUTES.HOME);
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleMedicationFormNavigation = () => {
    navigate("/parent/medication-form");
  };
  const handleHealthProfileNavigation = () => {
    navigate("/parent/health-profile-form");
  };
  const handleHealthCheckNavigation = () => {
    navigate("/parent/health-check-dashboard");
  };
  // ĐÃ SỬA Ở ĐÂY: Chỉ chuyển tới dashboard sự kiện tiêm chủng (KHÔNG vào thẳng phiếu xác nhận)
  const handleVaccinationEventNavigation = () => {
    navigate("/parent/vaccination-event-dashboard");
  };

  // Feature cards array for easier mapping and icon usage
  const features = [
    {
      title: "Khai báo hồ sơ sức khỏe",
      desc: "Khai báo thông tin sức khỏe của học sinh.",
      icon: <AssignmentIcon sx={{ fontSize: 50, mb: 1 }} />,
      bg: "#9b59b6",
      handler: handleHealthProfileNavigation,
    },
    {
      title: "Sử dụng thuốc",
      desc: "Truy cập form gửi thuốc và gửi yêu cầu sử dụng thuốc.",
      icon: <MedicationIcon sx={{ fontSize: 50, mb: 1 }} />,
      bg: "#3498db",
      handler: handleMedicationFormNavigation,
    },
    {
      title: "Khám sức khỏe",
      desc: "Xem lịch khám và kết quả khám sức khỏe của con bạn.",
      icon: (
        <span>
          <CalendarMonthIcon sx={{ fontSize: 38, mb: -0.5, mr: 0.5 }} />
          <AssignmentIcon sx={{ fontSize: 38, mb: -0.5 }} />
        </span>
      ),
      bg: "#e67e22",
      handler: handleHealthCheckNavigation,
    },
    {
      title: "Sự kiện tiêm chủng",
      desc: "Xác nhận thông tin tiêm chủng của con bạn.",
      icon: <VaccinesIcon sx={{ fontSize: 50, mb: 1 }} />,
      bg: "#2ecc71",
      handler: handleVaccinationEventNavigation, // Đã sửa: chỉ vào dashboard sự kiện tiêm chủng
    },
  ];

  return (
    <>
      <Navbar
        onLogout={onLogout}
        onNavigateToHome={handleNavigateToHome}
        onNavigateToNews={handleNavigateToNews}
        onNavigateToContact={handleNavigateToContact}
      />
      <Box sx={{ height: 68 }} />
      <Box
        sx={{
          background: "linear-gradient(to bottom, #d4f1f4, #a3d8f4)",
          p: { xs: 2, md: 6 },
          borderRadius: "15px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(129, 183, 193, 0.5)",
            p: { xs: 2, md: 4 },
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            mb: 4,
            mt: { xs: 2, md: 8 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "rgba(12, 56, 63, 0.7)",
              textAlign: "center",
              fontWeight: 700,
              fontSize: { xs: 26, md: 32 },
            }}
          >
            Chào phụ huynh đến với hệ thống y tế học đường
          </Typography>
        </Box>
        <Grid
          container
          spacing={4}
          sx={{
            mt: 2,
            width: "100%",
            mx: "auto",
            maxWidth: 900,
          }}
        >
          {features.map((f) => (
            <Grid item xs={12} md={6} key={f.title}>
              <Box
                sx={{
                  backgroundColor: f.bg,
                  color: "white",
                  p: 4,
                  borderRadius: "10px",
                  textAlign: "center",
                  cursor: "pointer",
                  minHeight: 180,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "scale(1.035)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.16)",
                  },
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={f.handler}
                className="feature-card"
              >
                {f.icon}
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, mt: 1 }}>
                  {f.title}
                </Typography>
                <Typography>{f.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ParentDashboard;