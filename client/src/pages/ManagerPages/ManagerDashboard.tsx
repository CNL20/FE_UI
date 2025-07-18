import React, { useState, useEffect } from "react";
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
import axios from "axios";
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, BarChart, Bar, ResponsiveContainer
} from 'recharts';

const ManagerDashboard: React.FC<{ onLogout?: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // State for stats from BE
  const [stats, setStats] = useState({
    studentCount: 0,
    healthCheckCampaignCount: 0,
    vaccinationCampaignCount: 0,
  });

  // State for charts
  const [casesOverTime, setCasesOverTime] = useState<any[]>([]);
  const [illnessTypes, setIllnessTypes] = useState<any[]>([]);
  const [healthCheckCompletion, setHealthCheckCompletion] = useState<any[]>([]);
  const [vaccinationCompletion, setVaccinationCompletion] = useState<any[]>([]);

  useEffect(() => {
    // Lấy token đúng key
    const token =
      localStorage.getItem("auth_token") ||
      localStorage.getItem("token");

    // 1. Lấy số liệu dashboard tổng quát
    axios
      .get(
        `${process.env['REACT_APP_API_BASE_URL']}/manager/dashboard-statistics`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setStats(res.data))
      .catch(() =>
        setStats({
          studentCount: 0,
          healthCheckCampaignCount: 0,
          vaccinationCampaignCount: 0,
        })
      );

    // 2. Lấy dữ liệu biểu đồ số ca bệnh theo thời gian
    axios
      .get(
        `${process.env['REACT_APP_API_BASE_URL']}/manager/statistics/cases-over-time`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setCasesOverTime(res.data))
      .catch(() => setCasesOverTime([]));

    // 3. Lấy dữ liệu phân loại bệnh phổ biến
    axios
      .get(
        `${process.env['REACT_APP_API_BASE_URL']}/manager/statistics/common-illnesses`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setIllnessTypes(res.data))
      .catch(() => setIllnessTypes([]));

    // 4. Lấy dữ liệu tỷ lệ hoàn thành khám sức khỏe
    axios
      .get(
        `${process.env['REACT_APP_API_BASE_URL']}/manager/statistics/healthcheck-completion`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setHealthCheckCompletion(res.data))
      .catch(() => setHealthCheckCompletion([]));

    // 5. Lấy dữ liệu tỷ lệ tiêm chủng/khám sức khỏe
    axios
      .get(
        `${process.env['REACT_APP_API_BASE_URL']}/manager/statistics/vaccination-completion`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => setVaccinationCompletion(res.data))
      .catch(() => setVaccinationCompletion([]));
  }, []);

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

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#b39ddb', '#4dd0e1', '#ffd54f'];

  return (
    <>
      <Navbar {...(onLogout ? { onLogout: handleLogout } : {})} />
      <Box
        sx={{
          p: 3,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Menu Button */}
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
          >
            <List>
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
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Overview Section */}
        <Grid container spacing={3}>
          {/* Box 1: Số học sinh */}
          <Grid item xs={12} md={4}>
            <Card
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
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
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
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {stats.studentCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Box 2: Số chiến dịch khám sức khỏe */}
          <Grid item xs={12} md={4}>
            <Card
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
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Số chiến dịch khám sức khỏe
                </Typography>
                <Typography
                  variant="h3"
                  color="info"
                  align="center"
                  sx={{
                    fontWeight: 700,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {stats.healthCheckCampaignCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Box 3: Số chiến dịch tiêm chủng */}
          <Grid item xs={12} md={4}>
            <Card
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
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{
                    fontWeight: 600,
                    mb: 1,
                    textShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                >
                  Số chiến dịch tiêm chủng
                </Typography>
                <Typography
                  variant="h3"
                  color="secondary"
                  align="center"
                  sx={{
                    fontWeight: 700,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {stats.vaccinationCampaignCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Báo cáo & Thống kê */}
        <Grid container spacing={3} mt={3}>
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
          </Grid>

          {/* Biểu đồ số ca bệnh theo thời gian */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "350px", borderRadius: "20px" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  Biểu đồ số ca bệnh theo thời gian
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={casesOverTime}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cases" stroke="#8884d8" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          {/* Phân loại các loại bệnh phổ biến */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "350px", borderRadius: "20px" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  Phân loại các loại bệnh phổ biến
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={illnessTypes}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      label
                    >
                      {illnessTypes.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          {/* Báo cáo tỷ lệ hoàn thành khám sức khỏe định kỳ */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "350px", borderRadius: "20px" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  Báo cáo tỷ lệ hoàn thành khám sức khỏe định kỳ
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={healthCheckCompletion}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="class" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          {/* Báo cáo tỷ lệ học sinh tiêm chủng/khám sức khỏe định kỳ */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "350px", borderRadius: "20px" }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                  Báo cáo tỷ lệ học sinh tiêm chủng/khám sức khỏe định kỳ
                </Typography>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={vaccinationCompletion}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="class" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="rate" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ManagerDashboard;