import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { People, History, Search } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface AdminDashboardProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserRole: (userRole: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  setIsAuthenticated,
  setUserRole,
}) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");

  const handleThemeChange = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <Navbar
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />
      <Box
        sx={{
          p: 3,
          background:
            theme === "light"
              ? "linear-gradient(to right, #f5f5f5, #e0e0e0)"
              : "linear-gradient(to right, #333, #444)",
          color: theme === "light" ? "#000" : "#fff",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
                    color: theme === "light" ? "#000" : "#fff",
                  }}
                />
              ),
            }}
            sx={{
              backgroundColor: theme === "light" ? "#fff" : "#555",
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
                "&:hover": {
                  transform: "scale(1.05)",
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
                "&:hover": {
                  transform: "scale(1.05)",
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
                  onClick={() => navigate("/notifications")}
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
                "&:hover": {
                  transform: "scale(1.05)",
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
                      backgroundColor: "#3f51b5",
                      "&:hover": {
                        backgroundColor: "#303f9f",
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
                      backgroundColor: "#ff9800",
                      "&:hover": {
                        backgroundColor: "#f57c00",
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
                <Typography variant="h6">Lịch sử đăng nhập</Typography>
                <Box mt={2}>
                  <Typography variant="body2">
                    - 10:00 AM: Đăng nhập thành công
                  </Typography>
                  <Typography variant="body2">
                    - 9:45 AM: Đăng nhập thất bại
                  </Typography>
                  <Typography variant="body2">
                    - 9:30 AM: Đăng nhập thành công
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Tùy chỉnh giao diện */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Tùy chỉnh giao diện</Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={theme === "dark"}
                      onChange={handleThemeChange}
                    />
                  }
                  label="Chế độ tối"
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
