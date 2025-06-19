import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { People, History, Search } from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { AdminDashboardProps } from "../../types";
import { ROUTES } from "../../constants";

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();

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
          background: "linear-gradient(to right, #f5f5f5, #e0e0e0)",
          color: "#000",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          border: "1px solid red", // Thêm border để kiểm tra hiển thị
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, textAlign: "center" }}>
          Admin Dashboard
        </Typography>
        {/* Search Bar */}
        <Box mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Tìm kiếm tài khoản, nhật ký, thông báo..."
            InputProps={{
              startAdornment: (
                <Search
                  sx={{
                    mr: 1,
                    color: "#000",
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

        <Grid container spacing={3}>
          {/* Tổng quan */}
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
                "&:hover": {
                  transform: "scale(1.05)",
                  background: "linear-gradient(to right, #bbdefb, #90caf9)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  Số tài khoản
                </Typography>
                <Typography variant="h3" color="primary" align="center">
                  120
                </Typography>
                <Typography variant="body2" align="center">
                  Phụ huynh: 50, Nurse: 30, Manager: 30
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
                "&:hover": {
                  transform: "scale(1.05)",
                  background: "linear-gradient(to right, #bbdefb, #90caf9)",
                },
                padding: "16px",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <Typography variant="h6">Thông báo chưa đọc</Typography>
                <Typography variant="h3" color="secondary">
                  15
                </Typography>
                <Button
                  size="small"
                  onClick={() => navigate("/admin/activity-logs")}
                  sx={{
                    mt: 2,
                    backgroundColor: "#ff4081",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#e91e63",
                    },
                  }}
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Card
              sx={{
                height: "150px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.2s",
                background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
                "&:hover": {
                  transform: "scale(1.05)",
                  background: "linear-gradient(to right, #bbdefb, #90caf9)",
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  Trạng thái hệ thống
                </Typography>
                <Typography variant="body1" color="success" align="center">
                  Server: Online, Database: Online, API: Online
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Truy cập nhanh */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            >
              <CardContent>
                <Typography variant="h6">Truy cập nhanh</Typography>
                <Box display="flex" gap={2} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<People />}
                    onClick={() => navigate("/admin/manage-accounts")}
                    sx={{
                      background: "linear-gradient(to right, #3f51b5, #5c6bc0)",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      padding: "10px 20px",
                      transition: "transform 0.2s, background 0.3s",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #303f9f, #3949ab)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Tạo tài khoản
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<History />}
                    onClick={() => navigate("/admin/activity-logs")}
                    sx={{
                      background: "linear-gradient(to right, #ff9800, #ffc107)",
                      color: "#fff",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      padding: "10px 20px",
                      transition: "transform 0.2s, background 0.3s",
                      "&:hover": {
                        background:
                          "linear-gradient(to right, #f57c00, #ffa000)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Xem nhật ký
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Lịch sử đăng nhập */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#3f51b5" }}
                >
                  Lịch sử đăng nhập
                </Typography>
                <Box
                  mt={2}
                  sx={{
                    background: "linear-gradient(to right, #e3f2fd, #bbdefb)",
                    borderRadius: "8px",
                    padding: "16px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", fontWeight: "bold" }}
                  >
                    - 10:00 AM: Đăng nhập thành công
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", fontWeight: "bold" }}
                  >
                    - 9:45 AM: Đăng nhập thất bại
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "#333", fontWeight: "bold" }}
                  >
                    - 9:30 AM: Đăng nhập thành công
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
