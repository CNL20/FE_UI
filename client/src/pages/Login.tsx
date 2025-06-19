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
  IconButton,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { SelectChangeEvent } from "@mui/material/Select";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

const roles = [
  { value: "admin", label: "Quản trị viên" },
  { value: "parent", label: "Phụ huynh" },
  { value: "manager", label: "Quản lý" },
  { value: "nurse", label: "Y tá trường học" },
];

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserRole: (userRole: string) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated, setUserRole }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    role: "",
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

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form Role:", form.role);

    if (!form.role) {
      alert("Vui lòng chọn vai trò trước khi đăng nhập.");
      return;
    }

    setIsAuthenticated(true);
    setUserRole(form.role);
    navigate(`/${form.role}`);
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
                  <IconButton onClick={() => setShowPassword((prev) => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Vai trò</InputLabel>
              <Select
                value={form.role}
                onChange={handleSelectChange}
                name="role"
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
            </Button>            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                borderColor: "#4285F4",
                color: "#4285F4", 
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "16px",
                py: 1,
                borderRadius: 2,
                transition: "all 0.3s",
                "&:hover": {
                  borderColor: "#4285F4",
                  backgroundColor: "rgba(66, 133, 244, 0.1)",
                  transform: "translateY(-2px)",
                },
              }}
              startIcon={<GoogleIcon sx={{ color: "#4285F4" }} />}
              onClick={() => console.log("Login with Google")}
            >
              Đăng nhập với Google
            </Button>            <Typography variant="body2" align="center" sx={{ mt: 3, mb: 1 }}>
              Chưa có tài khoản? <Link href="/register" sx={{ color: "#1976d2", fontWeight: "medium" }}>Đăng ký</Link>
            </Typography>
          </Box>
        </CardContent>
        </Card>
      </Box>
  );
};

export default Login;
