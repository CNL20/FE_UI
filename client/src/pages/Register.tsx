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
import { register } from "../services/apiClient";
import { ROUTES } from "../constants";
import { UserRole } from "../types";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    confirmPassword: string;
    agreeTerms: boolean;
    phone: string;
    cccd: string;
    role: UserRole;
  }>({
    firstName: "", // First name
    lastName: "",  // Last name
    username: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    phone: "", // Thêm trường `phone`
    cccd: "",  // Thêm trường `cccd`
    role: "parent", // Mặc định là parent khi đăng ký
  });
  const [error, setError] = useState<string | null>(null);

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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    if (!form.agreeTerms) {
      setError("Bạn phải đồng ý với điều khoản!");
      return;
    }

    try {
      await register({
        username: form.username,
        password: form.password,
        email: "",
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        cccd: form.cccd,
        role: form.role,
      });
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate(ROUTES.LOGIN);
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Đăng ký thất bại, vui lòng thử lại!");
      }
    }
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
        <CardContent>          <Box textAlign="center" mb={3}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{
                fontWeight: "bold",
                color: "#1976d2",
                position: "relative",
                pb: 1.5,
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "80px",
                  height: "4px",
                  background: "linear-gradient(90deg, #1976d2 0%, #64b5f6 100%)",
                  borderRadius: "2px"
                }
              }}
            >
              Đăng ký tài khoản
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Điền thông tin cá nhân để tạo tài khoản
            </Typography>
          </Box>
          <form onSubmit={handleRegister}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Họ"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
                margin="none"
                required
              />
              <TextField
                label="Tên"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
                margin="none"
                required
              />
            </Box>
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
              name="phone"
              value={form.phone}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Căn cước công dân"
              name="cccd"
              value={form.cccd}
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
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Button
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