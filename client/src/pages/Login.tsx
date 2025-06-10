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

const roles = [
  { value: "admin", label: "Quản trị viên" },
  { value: "parent", label: "Phụ huynh" },
  { value: "manager", label: "Quản lý" },
  { value: "nurse", label: "Y tá trường học" },
];

const Login: React.FC<{ onLogin: (role: string) => void }> = ({ onLogin }) => {
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

    onLogin(form.role);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
      p={2}
    >
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Đăng nhập
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Tên đăng nhập"
              name="username"
              value={form.username}
              onChange={handleInputChange}
              autoComplete="new-password"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mật khẩu"
              name="password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleInputChange}
              autoComplete="new-password"
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
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
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
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
