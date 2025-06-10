import React from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import {
  People as PeopleIcon,
  BarChart as BarChartIcon,
  MedicalServices as MedicalServicesIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Support as SupportIcon,
} from "@mui/icons-material";

interface AdminDashboardProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserRole: (userRole: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  setIsAuthenticated,
  setUserRole,
}) => {
  const sections = [
    {
      title: "Thống kê tổng quan",
      icon: <BarChartIcon color="primary" fontSize="large" />,
      details: [
        "Tổng số học sinh: 500",
        "Tổng số phụ huynh: 300",
        "Tổng số nhân viên y tế: 20",
        "Tổng số giáo viên: 50",
      ],
    },
    {
      title: "Quản lý người dùng",
      icon: <PeopleIcon color="primary" fontSize="large" />,
      details: ["Thêm tài khoản", "Phân quyền"],
    },
    {
      title: "Quản lý dữ liệu y tế",
      icon: <MedicalServicesIcon color="primary" fontSize="large" />,
      details: [
        "Hồ sơ sức khỏe học sinh",
        "Lịch sử tiêm chủng",
        "Sự kiện y tế",
      ],
    },
    {
      title: "Quản lý thông báo & tin tức",
      icon: <NotificationsIcon color="primary" fontSize="large" />,
      details: ["Đăng tin tức mới", "Quản lý bài viết"],
    },
    {
      title: "Quản lý báo cáo & thống kê",
      icon: <BarChartIcon color="primary" fontSize="large" />,
      details: ["Xuất báo cáo sức khỏe", "Thống kê bệnh tật"],
    },
    {
      title: "Quản lý cấu hình hệ thống",
      icon: <SettingsIcon color="primary" fontSize="large" />,
      details: ["Cấu hình thông tin trường", "Cài đặt hệ thống"],
    },
    {
      title: "Nhật ký hoạt động & bảo mật",
      icon: <SecurityIcon color="primary" fontSize="large" />,
      details: ["Xem nhật ký thao tác", "Kiểm soát an ninh"],
    },
    {
      title: "Hỗ trợ / Liên hệ",
      icon: <SupportIcon color="primary" fontSize="large" />,
      details: ["Quản lý phản hồi", "Hỗ trợ kỹ thuật"],
    },
  ];

  return (
    <>
      <Navbar
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />
      <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Bảng Điều Khiển Quản Trị
        </Typography>
        <Grid container spacing={3}>
          {sections.map((section, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    {section.icon}
                    <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
                      {section.title}
                    </Typography>
                  </Box>
                  {section.details.map((detail, idx) => (
                    <Typography variant="body2" key={idx}>
                      {detail}
                    </Typography>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default AdminDashboard;
