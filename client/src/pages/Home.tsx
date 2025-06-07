import React, { useState } from "react";
import { mockUsers } from "../mockData";
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
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Navbar from "../components/Navbar";

const roles = [
  { value: "admin", label: "Admin" },
  { value: "parent", label: "Parent" },
  { value: "manager", label: "Manager" },
  { value: "nurse", label: "School Nurse" },
];

interface HomeProps {
  onLogin: (role: string) => void;
}

const Home: React.FC<HomeProps> = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    role: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const user = mockUsers.find(
      (u) =>
        u.username === form.username &&
        u.password === form.password &&
        u.role === form.role
    );

    if (user) {
      onLogin(user.role);
    } else {
      alert("Invalid username, password, or role.");
    }
  };

  return (
    <>
      <Navbar isHomePage={true} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={2}
      >
        {showLogin && (
          <Card sx={{ maxWidth: 400, mt: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Đăng nhập
              </Typography>
              <form onSubmit={handleLogin}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Vai trò</InputLabel>
                  <Select
                    name="role"
                    value={form.role}
                    onChange={handleSelectChange}
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
                <TextField
                  fullWidth
                  margin="normal"
                  label="Tên đăng nhập"
                  name="username"
                  value={form.username}
                  onChange={handleInputChange}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Mật khẩu"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
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
                  type="button"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => setShowLogin(false)}
                >
                  Quay lại
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </Box>
    </>
  );
};

export default Home;
