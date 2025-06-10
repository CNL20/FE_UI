import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const AlertsAndNotifications: React.FC = () => {
  return (
    <Box
      sx={{
        p: 3,
        backgroundColor: "#007BFF", // Blue background to match ManagerDashboard
        color: "#fff", // White text for contrast
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Cảnh báo & Thông báo
      </Typography>

      <Grid container spacing={3}>
        {/* Cảnh báo */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff", // White background for cards
              color: "#007BFF", // Blue text for contrast
              "&:hover": {
                backgroundColor: "#e3f2fd", // Light blue on hover
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Cảnh báo
              </Typography>
              <Typography variant="body1" align="center">
                (Placeholder for alerts details)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Thông báo */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff", // White background for cards
              color: "#007BFF", // Blue text for contrast
              "&:hover": {
                backgroundColor: "#e3f2fd", // Light blue on hover
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Thông báo
              </Typography>
              <Typography variant="body1" align="center">
                (Placeholder for notifications details)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Các cảnh báo y tế khẩn cấp (dịch bệnh, ca bệnh đặc biệt) */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff", // White background for cards
              color: "#007BFF", // Blue text for contrast
              "&:hover": {
                backgroundColor: "#e3f2fd", // Light blue on hover
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Các cảnh báo y tế khẩn cấp (dịch bệnh, ca bệnh đặc biệt)
              </Typography>
              <Typography variant="body1" align="center">
                (Placeholder for emergency medical alerts)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Danh sách các yêu cầu hỗ trợ khẩn cấp từ giáo viên/phụ huynh */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              backgroundColor: "#fff", // White background for cards
              color: "#007BFF", // Blue text for contrast
              "&:hover": {
                backgroundColor: "#e3f2fd", // Light blue on hover
              },
            }}
          >
            <CardContent>
              <Typography variant="h6" align="center">
                Danh sách các yêu cầu hỗ trợ khẩn cấp từ giáo viên/phụ huynh
              </Typography>
              <Typography variant="body1" align="center">
                (Placeholder for urgent support requests)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AlertsAndNotifications;
