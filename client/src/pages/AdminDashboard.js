import React from "react";
import { Box, Container, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(3),
  background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
}));

const DashboardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: "center",
  borderRadius: 16,
  boxShadow: "0 4px 24px rgba(26, 115, 232, 0.08)",
  background: "#fff",
}));

const COLORS = ["#1976d2", "#00bcd4", "#ff9800", "#e91e63"];

const dataBar = [
  { name: "Lớp 1", value: 120 },
  { name: "Lớp 2", value: 98 },
  { name: "Lớp 3", value: 150 },
];

const dataPie = [
  { name: "Nam", value: 300 },
  { name: "Nữ", value: 200 },
];

const AdminDashboard = () => {
  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <Typography variant="h4" fontWeight={700} mb={3} color="primary">
          Bảng Điều Khiển Quản Trị
        </Typography>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={4}>
            <StatCard>
              <Typography variant="subtitle1">Tổng số học sinh</Typography>
              <Typography variant="h3" color="primary">
                500
              </Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard>
              <Typography variant="subtitle1">Tổng số giáo viên</Typography>
              <Typography variant="h3" color="secondary">
                40
              </Typography>
            </StatCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard>
              <Typography variant="subtitle1">Tổng số phụ huynh</Typography>
              <Typography variant="h3" color="success.main">
                300
              </Typography>
            </StatCard>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 4 }}>
              <Typography variant="subtitle1" mb={2}>
                Số lượng học sinh theo lớp
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={dataBar}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1976d2" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, borderRadius: 4 }}>
              <Typography variant="subtitle1" mb={2}>
                Tỉ lệ giới tính học sinh
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={dataPie}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {dataPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DashboardContainer>
  );
};

export default AdminDashboard;
