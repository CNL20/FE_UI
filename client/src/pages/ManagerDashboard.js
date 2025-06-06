import React from "react";
import { Box, Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupIcon from "@mui/icons-material/Group";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(3),
  background: "linear-gradient(135deg, #e0f7fa 0%, #f5f7fa 100%)",
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  borderRadius: 16,
  boxShadow: "0 4px 24px rgba(0, 188, 212, 0.08)",
  background: "#fff",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ManagerDashboard = () => {
  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={3} color="info.main">
          Bảng Điều Khiển Quản Lý
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "info.main", mr: 2 }}>
                <GroupIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Quản Lý Nhân Viên</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quản lý thông tin và phân quyền nhân viên y tế
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                <AssessmentIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Báo Cáo Thống Kê</Typography>
                <Typography variant="body2" color="text.secondary">
                  Xem và phân tích các báo cáo thống kê y tế
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "warning.main", mr: 2 }}>
                <SettingsIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Cài Đặt Hệ Thống</Typography>
                <Typography variant="body2" color="text.secondary">
                  Cấu hình và quản lý các thiết lập hệ thống
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  );
};

export default ManagerDashboard;
