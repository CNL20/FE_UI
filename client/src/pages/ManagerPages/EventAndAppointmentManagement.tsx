import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const EventAndAppointmentManagement: React.FC = () => {
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
        Quản lý sự kiện & lịch hẹn
      </Typography>

      <Grid container spacing={3}>
        {/* Quản lý sự kiện */}
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
                Quản lý sự kiện
              </Typography>
              <Typography variant="body1" align="center">
                (Placeholder for event management details)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Quản lý lịch hẹn */}
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
                Quản lý lịch hẹn
              </Typography>
              <Typography variant="body1" align="center">
                (Placeholder for appointment management details)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Danh sách lịch hẹn khám sức khỏe tập trung/sự kiện y tế sắp tới */}
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
                Danh sách lịch hẹn khám sức khỏe tập trung/sự kiện y tế sắp tới
              </Typography>
              <Typography variant="body1" align="center">
                (Placeholder for upcoming health checkup schedules and events)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Thông báo lịch khám, lịch nhắc nhở cho phụ huynh/học sinh */}
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
                Thông báo lịch khám, lịch nhắc nhở cho phụ huynh/học sinh
              </Typography>
              <Typography variant="body1" align="center">
                (Placeholder for notifications and reminders for parents/students)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EventAndAppointmentManagement;