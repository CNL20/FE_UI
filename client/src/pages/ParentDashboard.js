import React from "react";
import { Box, Container, Typography, Grid, Paper, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(3),
  background: "linear-gradient(135deg, #fdf6e3 0%, #f5f7fa 100%)",
}));

const InfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  borderRadius: 16,
  boxShadow: "0 4px 24px rgba(255, 193, 7, 0.08)",
  background: "#fff",
  transition: "transform 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ParentDashboard = () => {
  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={3} color="warning.main">
          Bảng Điều Khiển Phụ Huynh
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "success.main", mr: 2 }}>
                <LocalHospitalIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Thông Tin Sức Khỏe</Typography>
                <Typography variant="body2" color="text.secondary">
                  Xem thông tin sức khỏe và lịch sử khám bệnh của con
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "info.main", mr: 2 }}>
                <NotificationsActiveIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Thông Báo</Typography>
                <Typography variant="body2" color="text.secondary">
                  Nhận và xem các thông báo từ nhà trường
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <InfoCard>
              <Avatar sx={{ bgcolor: "warning.main", mr: 2 }}>
                <FamilyRestroomIcon />
              </Avatar>
              <Box>
                <Typography variant="h6">Liên Hệ</Typography>
                <Typography variant="body2" color="text.secondary">
                  Liên hệ với nhân viên y tế và nhà trường
                </Typography>
              </Box>
            </InfoCard>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  );
};

export default ParentDashboard;
