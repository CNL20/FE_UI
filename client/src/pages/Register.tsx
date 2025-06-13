import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    phoneNumber: "",
    idCard: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }
    alert("Đăng ký thành công! Vui lòng đăng nhập.");
    navigate("/login");
  };

  return (    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#e3f2fd" // Màu xanh nhạt
      p={2}
    >      <Card sx={{ 
        maxWidth: 500, 
        boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        borderRadius: 2,
        overflow: "hidden"
      }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Đăng ký
          </Typography>
          <form onSubmit={handleRegister}>
            <Box display="flex" gap={2}>
              <TextField
                label="Họ"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Tên"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Box>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Tên đăng nhập"
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mật khẩu"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Số điện thoại"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Căn cước công dân"
              name="idCard"
              value={form.idCard}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  checked={form.agreeTerms}
                  onChange={handleChange}
                  required
                />
              }
              label="Tôi đồng ý với các điều khoản và điều kiện"
            />            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ 
                mt: 2, 
                py: 1.2, 
                fontSize: "1rem", 
                fontWeight: "bold",
                background: "linear-gradient(90deg, #1976d2 30%, #64b5f6 100%)",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 15px rgba(25, 118, 210, 0.3)",
                  background: "linear-gradient(90deg, #1565c0 30%, #42a5f5 100%)"
                }
              }}
            >
              Đăng ký
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
