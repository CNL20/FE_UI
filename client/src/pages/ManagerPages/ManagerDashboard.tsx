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
  IconButton,
  Button,
} from "@mui/material";
import { Search, Assignment, Menu as MenuIcon, HealthAndSafety } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { ROUTES } from "../../constants";

const ManagerDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
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

  const handleNavigateToVaccinationCampaigns = () => {
    navigate("/manager/vaccination-campaigns");
  };
  
  const handleNavigateToHealthCampaigns = () => {
    navigate("/manager/health-campaigns");
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
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
    {
      text: "Quản lý chiến dịch tiêm chủng",
      onClick: handleNavigateToVaccinationCampaigns,
    },
    {
      text: "Quản lý chiến dịch khám sức khỏe",
      onClick: handleNavigateToHealthCampaigns,
    },
  ];

  return (
    <>
      <Navbar
        {...(onLogout ? { onLogout: handleLogout } : {})}
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
          <IconButton
            edge="start"
            sx={{ mr: 2, color: "#007BFF", background: "#fff" }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
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

          {/* Health Campaign Card */}
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                backgroundColor: "#E1F5FE", // Light blue background
                color: "#000", // Black text for contrast
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "#B3E5FC",
                },
              }}
              onClick={handleNavigateToHealthCampaigns}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="center" mb={1}>
                  <HealthAndSafety color="primary" fontSize="large" />
                </Box>
                <Typography variant="h6" align="center">
                  Quản lý chiến dịch khám sức khỏe
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigateToHealthCampaigns();
                  }}
                >
                  Tạo chiến dịch mới
                </Button>
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

          {/* Health Campaign Feature Section */}
          <Grid item xs={12} mt={3}>
            <Typography variant="h5" gutterBottom>
              Chiến dịch khám sức khỏe
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                padding: 2,
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                  <Box display="flex" alignItems="center">
                    <HealthAndSafety color="primary" fontSize="large" sx={{ mr: 2 }} />
                    <Typography variant="h6">
                      Quản lý chiến dịch khám sức khỏe định kỳ
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<HealthAndSafety />}
                    onClick={handleNavigateToHealthCampaigns}
                  >
                    Tạo chiến dịch mới
                  </Button>
                </Box>
                
                <Typography variant="body1" paragraph>
                  Tạo và quản lý chiến dịch khám sức khỏe định kỳ cho học sinh. Các chức năng bao gồm:
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#f0f7ff', height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold">Tạo chiến dịch mới</Typography>
                        <Typography variant="body2">
                          Thiết lập thông tin chiến dịch khám sức khỏe, thời gian bắt đầu và kết thúc.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#f0f7ff', height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold">Bổ nhiệm y tá</Typography>
                        <Typography variant="body2">
                          Chỉ định y tá tham gia chiến dịch khám sức khỏe.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card sx={{ backgroundColor: '#f0f7ff', height: '100%' }}>
                      <CardContent>
                        <Typography variant="subtitle1" fontWeight="bold">Gửi kết quả khám</Typography>
                        <Typography variant="body2">
                          Thông báo kết quả khám sức khỏe đến phụ huynh.
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ManagerDashboard;