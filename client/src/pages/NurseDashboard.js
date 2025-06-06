import React from "react";
import { Box, Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import ReportIcon from "@mui/icons-material/Report";
import EmergencyIcon from "@mui/icons-material/WarningAmber";

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

const NurseDashboard = () => {
  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={3} color="info.main">
          Bảng Điều Khiển Y Tá
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                <MedicalServicesIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Khám Sức Khỏe</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quản lý lịch khám sức khỏe và hồ sơ y tế của học sinh
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "info.main", mr: 2 }}>
                <ReportIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Báo Cáo Y Tế</Typography>
                <Typography variant="body2" color="text.secondary">
                  Tạo và quản lý các báo cáo y tế học đường
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "error.main", mr: 2 }}>
                <EmergencyIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Thông Báo Khẩn Cấp</Typography>
                <Typography variant="body2" color="text.secondary">
                  Gửi thông báo khẩn cấp đến phụ huynh và nhà trường
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  );
};

export default NurseDashboard;
