import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import {
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
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

  const sections = [
    {
      title: "Quản lý tài khoản",
      icon: <PeopleIcon color="primary" fontSize="large" />,
      onClick: () => navigate("/manage-accounts"),
    },
    {
      title: "Thông báo",
      icon: <NotificationsIcon color="primary" fontSize="large" />,
      onClick: () => navigate("/notifications"),
    },
    {
      title: "Nhật ký",
      icon: <SecurityIcon color="primary" fontSize="large" />,
      onClick: () => navigate("/activity-logs"),
    },
    {
      title: "Cài đặt",
      icon: <SettingsIcon color="primary" fontSize="large" />,
      onClick: () => navigate("/settings"),
    },
  ];

  return (
    <>
      <Navbar
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Box
          sx={{
            width: "300px",
            p: 2,
            backgroundColor: "#ffffff",
            boxShadow: 3,
          }}
        >
          {sections.map((section, index) => (
            <Box
              key={index}
              sx={{
                mb: 2,
                cursor: "pointer",
                transition: "box-shadow 0.3s, background-color 0.3s",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 123, 255, 0.3)",
                },
                "&:active": {
                  backgroundColor: "#007bff",
                  color: "white",
                },
              }}
              onClick={section.onClick}
            >
              <Box display="flex" alignItems="center" mb={1}>
                {section.icon}
                <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                  {section.title}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
