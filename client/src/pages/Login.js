import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Alert,
  Divider,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff, School } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { login, getDashboardUrl, roles } from "../mockData";
import { GoogleLogin } from "@react-oauth/google";
import MenuItem from "@mui/material/MenuItem";

const LoginContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)",
  padding: theme.spacing(2),
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 450,
  width: "100%",
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  boxShadow: "0 4px 12px rgba(26, 115, 232, 0.2)",
}));

const LogoIcon = styled(School)(({ theme }) => ({
  fontSize: 40,
  color: "white",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "12px",
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(26, 115, 232, 0.2)",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(26, 115, 232, 0.3)",
  },
}));

const RegisterButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontSize: "0.9rem",
  fontWeight: 500,
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(3, 0),
  "&::before, &::after": {
    borderColor: theme.palette.divider,
  },
}));

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(
        formData.username,
        formData.password,
        formData.role
      );
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));

      const dashboardUrl = getDashboardUrl(response.user.role);
      navigate(dashboardUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Trong môi trường thực tế, bạn sẽ gửi credential này đến backend để xác thực
      console.log("Google Login Success:", credentialResponse);

      // Mock login với Google (trong thực tế sẽ xử lý khác)
      const mockGoogleUser = {
        id: "google-" + Math.random(),
        name: "Google User",
        email: "google@example.com",
        role: "student", // Mặc định role là student
      };

      const token = "mock-google-jwt-token-" + Math.random();

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(mockGoogleUser));

      navigate("/student-dashboard");
    } catch (err) {
      setError("Đăng nhập bằng Google thất bại");
    }
  };

  const handleGoogleError = () => {
    setError("Đăng nhập bằng Google thất bại");
  };

  return (
    <LoginContainer>
      <Container maxWidth="sm">
        <LoginPaper elevation={3}>
          <LogoContainer>
            <LogoIcon />
          </LogoContainer>

          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 3,
            }}
          >
            Đăng Nhập
          </Typography>

          {error && (
            <Alert
              severity="error"
              sx={{
                width: "100%",
                mb: 2,
                borderRadius: "12px",
                "& .MuiAlert-icon": {
                  alignItems: "center",
                },
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.palette.primary.main }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ mt: 2, mb: 1, fontWeight: 500 }}
            >
              Chọn vai trò
            </Typography>
            <StyledTextField
              required
              select
              fullWidth
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              sx={{ mb: 2 }}
              SelectProps={{
                displayEmpty: true,
                renderValue: (selected) =>
                  selected ? (
                    roles.find((role) => role.id === selected)?.name
                  ) : (
                    <span style={{ color: "#aaa" }}>-- Chọn vai trò --</span>
                  ),
              }}
            >
              <MenuItem value="" disabled>
                -- Chọn vai trò --
              </MenuItem>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.id}>
                  {role.name}
                </MenuItem>
              ))}
            </StyledTextField>
            <LoginButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </LoginButton>

            <StyledDivider>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  px: 2,
                  backgroundColor: "background.paper",
                }}
              >
                Hoặc
              </Typography>
            </StyledDivider>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
                "& .google-login-button": {
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  },
                },
              }}
            >
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_blue"
                text="signin_with"
                shape="rectangular"
                locale="vi"
                className="google-login-button"
              />
            </Box>

            <RegisterButton
              fullWidth
              variant="text"
              onClick={() => navigate("/register")}
              sx={{
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Chưa có tài khoản? Đăng ký ngay
            </RegisterButton>
          </Box>
        </LoginPaper>
      </Container>
    </LoginContainer>
  );
};

export default Login;
