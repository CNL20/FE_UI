import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { LoginProps, UserRole } from "../types";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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
    onLogin(form.role);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#e3f2fd" // Màu xanh nhạt
      p={2}
    >        <Card sx={{ 
          maxWidth: 500, 
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          borderRadius: 2,
          overflow: "hidden",
          width: "100%"
        }}>
        <CardContent>
          <Box textAlign="center" mb={3}>
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
              Đăng nhập hệ thống
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Vui lòng nhập thông tin đăng nhập của bạn
            </Typography>
          </Box>
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
              Đăng nhập
            </Button>
          </Box>
        </CardContent>
        </Card>
      </Box>
  );
};

export default Login;