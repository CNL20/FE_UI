import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

const HealthCheckRegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parentName: "",
    studentName: "",
    class: "",
    healthCheckRound: "",
    reason: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    alert("Thông tin đăng ký đã được gửi thành công!");
  };

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
          Đăng Ký Khám Sức Khỏe
        </Typography>
        <h1 style={{ textAlign: "center", color: "rgba(8, 26, 74, 0.5)", marginBottom: "20px" }}>
          Đơn Đăng Kí Khám Sức Khỏe
        </h1>
        <Paper sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
          <TextField
            fullWidth
            label="Tên Phụ Huynh"
            name="parentName"
            value={formData.parentName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Tên Học Sinh"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Lớp"
            name="class"
            value={formData.class}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <div
            style={{
              backgroundColor: "#87CEEB", // Changed to light blue color
              color: "white",
              padding: "20px",
              borderRadius: "10px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <h3>Khám đợt:</h3>
            <select
              id="healthCheckRound"
              name="healthCheckRound"
              style={{
                marginTop: "10px",
                padding: "10px",
                borderRadius: "6px",
                width: "100%",
                border: "none",
                outline: "none",
              }}
              onChange={handleSelectChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <TextField
            fullWidth
            label="Lý Do Đăng Ký"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Gửi
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/parent/health-check-dashboard")}
            >
              Quay Về
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default HealthCheckRegistrationForm;
