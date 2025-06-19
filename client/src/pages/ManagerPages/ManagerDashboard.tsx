// Manager Dashboard Page
import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Search, Assignment } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ManagerDashboardProps } from "../../types";
import { ROUTES } from "../../constants";

const ManagerDashboard: React.FC<ManagerDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigateToHealthRecords = () => {
    navigate("/manager/health-records");
  };

  const handleNavigateToMedicalStaffManagement = () => {
    navigate("/manager/medical-staff-management");
  };

  const handleNavigateToAlertsAndNotifications = () => {
    navigate("/manager/alerts-and-notifications");
  };

  const handleNavigateToEventAndAppointmentManagement = () => {
    navigate("/manager/event-and-appointment-management");
  };

  const menuItems = [
    {
      text: "Quản lý hồ sơ y tế",
      onClick: handleNavigateToHealthRecords,
    },
    {
      text: "Quản lý nhân sự y tế trường",
      onClick: handleNavigateToMedicalStaffManagement,
    },
    {
      text: "Cảnh báo & Thông báo",
      onClick: handleNavigateToAlertsAndNotifications,
    },
    {
      text: "Quản lý sự kiện & lịch hẹn",
      onClick: handleNavigateToEventAndAppointmentManagement,
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
      <Box
        sx={{
          p: 3,
          backgroundColor: "#007BFF", // Blue background for the dashboard
          color: "#fff", // White text for contrast
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Menu Button next to Search Bar */}
        <Box mb={3} display="flex" alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm ..."
            InputProps={{
              startAdornment: (
                <Search
                  sx={{
                    mr: 1,
                    color: "#0a3d62",
                  }}
                />
              ),
            }}
            sx={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#007BFF", // Blue background for the drawer
              color: "#fff", // White text for contrast
            },
          }}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              {menuItems.map((item, index) => (
                <ListItem button key={index} onClick={item.onClick}>
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {" "}
                    {/* White icons */}
                    <Assignment />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Overview Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                backgroundColor: "#FFD1DC", // Light pink background
                color: "#000", // Black text for contrast
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  Học sinh hiện tại
                </Typography>
                <Typography variant="h3" color="primary" align="center">
                  500
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                backgroundColor: "#E6E6FA", // Light purple background
                color: "#000", // Black text for contrast
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  Yêu cầu gần đây
                </Typography>
                <Typography variant="h3" color="secondary" align="center">
                  12
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                backgroundColor: "#FFE4B5", // Light orange background
                color: "#000", // Black text for contrast
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  Khám sức khỏe đã thực hiện
                </Typography>
                <Typography variant="h3" color="info" align="center">
                  130
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                backgroundColor: "#FFFFFF", // White background
                color: "#000", // Black text for contrast
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  Cảnh báo cần xử lý gấp
                </Typography>
                <Typography variant="h3" color="error" align="center">
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3}>
          {/* Báo cáo & Thống kê */}
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Báo cáo & Thống kê
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card
              sx={{
                height: "300px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Biểu đồ số ca bệnh theo thời gian
                </Typography>
                <Typography variant="body2">
                  (Placeholder for a chart displaying cases over
                  days/months/quarters)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card
              sx={{
                height: "300px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Phân loại các loại bệnh phổ biến
                </Typography>
                <Typography variant="body2">
                  (Placeholder for a chart showing common illnesses in the
                  school)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card
              sx={{
                height: "300px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Báo cáo tỷ lệ hoàn thành khám sức khỏe định kỳ
                </Typography>
                <Typography variant="body2">
                  (Placeholder for a report on health check completion rates by
                  class/grade)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <Card
              sx={{
                height: "300px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Báo cáo tỷ lệ học sinh tiêm chủng/khám sức khỏe định kỳ
                </Typography>
                <Typography variant="body2">
                  (Placeholder for a report on vaccination/health check rates)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ManagerDashboard;
