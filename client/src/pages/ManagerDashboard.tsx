import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const ManagerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state (if any) and redirect to login
    navigate("/login");
  };

  return (
    <>
      <Navbar setIsAuthenticated={() => {}} setUserRole={() => {}} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={2}
      >
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Bảng điều khiển Quản lý
            </Typography>
            <Typography variant="body1">
              Chào mừng đến với bảng điều khiển quản lý. Đây là một phần giữ chỗ
              sẽ được triển khai sau.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 2 }}
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ManagerDashboard;
