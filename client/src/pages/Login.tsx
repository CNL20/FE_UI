import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Link,
  Container,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import GoogleIcon from "@mui/icons-material/Google";
import { SelectChangeEvent } from "@mui/material/Select";
import { login } from "../services/apiClient";
import { LoginProps, UserRole } from "../types";

// Roles với value dạng chữ thường cho backend
const roles = [
  { value: "admin" as UserRole, label: "Quản trị viên" },
  { value: "parent" as UserRole, label: "Phụ huynh" },
  { value: "manager" as UserRole, label: "Quản lý" },
  { value: "nurse" as UserRole, label: "Y tá trường học" },
];

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<{
    role: UserRole;
    username: string;
    password: string;
    remember: boolean;
  }>({
    role: "parent",
    username: "",
    password: "",
    remember: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSelectChange = (e: SelectChangeEvent<UserRole>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name || "role"]: value as UserRole,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.role) {
      alert("Vui lòng chọn vai trò trước khi đăng nhập.");
      return;
    }

    try {
      await login(form.username, form.password, form.role);
      onLogin(form.role);
    } catch (error) {
      alert("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = () => {
    // Chuyển hướng sang backend để khởi tạo quá trình Google OAuth
    window.location.href = 'https://localhost:5001/signin-google';
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
              value={form.username}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Vai trò</InputLabel>
              <Select
                labelId="role-label"
                value={form.role}
                onChange={handleSelectChange}
                name="role"
                label="Vai trò"
                required
              >
                <MenuItem value="" disabled>
                  -- Chọn vai trò --
                </MenuItem>
                {roles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  checked={form.remember}
                  onChange={handleInputChange}
                />
              }
              label="Ghi nhớ mật khẩu"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                borderColor: "#4285F4",
                color: "#4285F4",
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#f1f1f1",
                },
              }}
              startIcon={<GoogleIcon sx={{ color: "#4285F4" }} />}
              onClick={handleGoogleLogin}
            >
              Đăng nhập bằng Google
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;