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
  Container,
  Paper,
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
              onClick={() => console.log("Login with Google")}
            >
              Google
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
