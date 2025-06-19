import React from "react";
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const HealthCheckSchedule: React.FC = () => {
  const navigate = useNavigate();

  const mockScheduleData = [
    {
      date: "2025-06-15",
      time: "10:00 AM",
      studentName: "Nguyễn Văn A",
      content: "Khám tổng quát sức khỏe",
    },
    {
      date: "2025-06-16",
      time: "2:00 PM",
      studentName: "Trần Thị B",
      content: "Khám mắt và tai",
    },
    {
      date: "2025-06-17",
      time: "9:00 AM",
      studentName: "Lê Văn C",
      content: "Khám tim mạch",
    },
  ];

  return (
    <>
      <Navbar
        setIsAuthenticated={() => {}}
        setUserRole={() => {}}
        onLogout={() => {}}
        onNavigateToHome={() => navigate("/")}
        onNavigateToNews={() => navigate("/")}
        onNavigateToContact={() => navigate("/")}
      />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
          Lịch Khám Sức Khỏe
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ngày</TableCell>
                <TableCell>Giờ</TableCell>
                <TableCell>Họ Tên Học Sinh</TableCell>
                <TableCell>Nội Dung Khám</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockScheduleData.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>{schedule.date}</TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.studentName}</TableCell>
                  <TableCell>{schedule.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default HealthCheckSchedule;
