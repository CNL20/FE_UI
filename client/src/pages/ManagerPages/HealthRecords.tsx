import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

interface HealthRecordsProps {
  onLogout?: () => void;
}

const HealthRecords: React.FC<HealthRecordsProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar {...(onLogout ? { onLogout } : {})} />
      <Box
        sx={{
          p: 3,
          backgroundColor: "#007BFF", // Blue background to match ManagerDashboard
          color: "#fff", // White text for contrast
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Quản lý hồ sơ y tế
        </Typography>
        <Typography variant="body1">
          Đây là trang quản lý hồ sơ y tế. Nội dung sẽ được cập nhật sau.
        </Typography>        <Grid container spacing={3} mt={3}>
          <Grid item xs={12} md={6} lg={6}>
            <Card
              sx={{
                height: "150px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff", // White background for cards
                color: "#007BFF", // Blue text for contrast
                "&:hover": {
                  backgroundColor: "#e3f2fd", // Light blue on hover
                },
              }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  Truy cập nhanh hồ sơ sức khỏe học sinh
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    navigate("/manager/health-records/quick-access")
                  }
                  sx={{ mt: 2 }}
                >
                  Xem chi tiết
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HealthRecords;
