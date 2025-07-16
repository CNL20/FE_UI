import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Assignment, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const ManagerDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleNavigateToHealthRecords = () => {
    navigate("/manager/health-records");
  };
  const handleNavigateToVaccinationCampaigns = () => {
    navigate("/manager/vaccination-campaigns");
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
      text: "Quản lý chiến dịch tiêm chủng",
      onClick: handleNavigateToVaccinationCampaigns,
    },
  ];

  return (
    <>      <Navbar
        {...(onLogout ? { onLogout: handleLogout } : {})}
      /><Box
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}      >        {/* Menu Button */}
        <Box mb={3} display="flex" justifyContent="flex-start">
          <IconButton
            edge="start"
            sx={{ 
              color: "#fff", 
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              "&:hover": {
                background: "rgba(255, 255, 255, 0.3)",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >            <List>
              {menuItems.map((item, index) => (
                <ListItem 
                  button 
                  key={index} 
                  onClick={item.onClick}
                  sx={{
                    borderRadius: "12px",
                    mb: 1,
                    mx: 1,
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.1)",
                      transform: "translateX(8px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ListItemIcon sx={{ color: "#fff" }}>
                    <Assignment />
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontWeight: 500,
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Overview Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
                color: "#333",
                boxShadow: "0 10px 30px rgba(255, 154, 158, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(255, 154, 158, 0.4)",
                },
              }}
            >              <CardContent sx={{ textAlign: "center" }}>
                <Typography 
                  variant="h6" 
                  align="center"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)" 
                  }}
                >
                  Học sinh hiện tại
                </Typography>
                <Typography 
                  variant="h3" 
                  color="primary" 
                  align="center"
                  sx={{ 
                    fontWeight: 700,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)" 
                  }}
                >
                  500
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                color: "#333",
                boxShadow: "0 10px 30px rgba(168, 237, 234, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(168, 237, 234, 0.4)",
                },
              }}
            >              <CardContent sx={{ textAlign: "center" }}>
                <Typography 
                  variant="h6" 
                  align="center"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)" 
                  }}
                >
                  Yêu cầu gần đây
                </Typography>
                <Typography 
                  variant="h3" 
                  color="secondary" 
                  align="center"
                  sx={{ 
                    fontWeight: 700,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)" 
                  }}
                >
                  12
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
                color: "#333",
                boxShadow: "0 10px 30px rgba(252, 182, 159, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(252, 182, 159, 0.4)",
                },
              }}
            >              <CardContent sx={{ textAlign: "center" }}>
                <Typography 
                  variant="h6" 
                  align="center"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)" 
                  }}
                >
                  Khám sức khỏe đã thực hiện
                </Typography>
                <Typography 
                  variant="h3" 
                  color="info" 
                  align="center"
                  sx={{ 
                    fontWeight: 700,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)" 
                  }}
                >
                  130
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "20px",
                background: "linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%)",
                color: "#fff",
                boxShadow: "0 10px 30px rgba(255, 107, 107, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px) scale(1.02)",
                  boxShadow: "0 20px 40px rgba(255, 107, 107, 0.4)",
                },
              }}
            >              <CardContent sx={{ textAlign: "center" }}>
                <Typography 
                  variant="h6" 
                  align="center"
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)" 
                  }}
                >
                  Cảnh báo cần xử lý gấp
                </Typography>
                <Typography 
                  variant="h3" 
                  color="error" 
                  align="center"
                  sx={{ 
                    fontWeight: 700,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)" 
                  }}
                >
                  5
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={3}>          {/* Báo cáo & Thống kê */}
          <Grid item xs={12}>
            <Typography 
              variant="h5" 
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: "center",
                background: "linear-gradient(45deg, #fff, #f0f0f0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                mb: 3,
              }}
            >
              Báo cáo & Thống kê
            </Typography>
          </Grid>          <Grid item xs={12} md={6} lg={6}>
            <Card
              sx={{
                height: "300px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 2,
                  }}
                >
                  Biểu đồ số ca bệnh theo thời gian
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
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
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 2,
                  }}
                >
                  Phân loại các loại bệnh phổ biến
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
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
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 2,
                  }}
                >
                  Báo cáo tỷ lệ hoàn thành khám sức khỏe định kỳ
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
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
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 2,
                  }}
                >
                  Báo cáo tỷ lệ học sinh tiêm chủng/khám sức khỏe định kỳ
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
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