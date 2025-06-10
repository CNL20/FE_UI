import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Navbar from "../../components/Navbar";

const MedicalStaffManagement: React.FC = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: 3,
          backgroundColor: "#007BFF", // Blue background to match ManagerDashboard
          color: "#fff", // White text for contrast
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Quản lý nhân sự y tế trường
        </Typography>

        <Grid container spacing={3}>
          {/* Thống kê số lượng nhân viên y tế */}
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
                  Số lượng nhân viên y tế
                </Typography>
                <Typography variant="h3" color="primary" align="center">
                  15
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Lịch trực của nhân viên y tế */}
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
                  Lịch trực của nhân viên y tế
                </Typography>
                <Typography variant="body1" align="center">
                  (Placeholder for medical staff schedule)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MedicalStaffManagement;
