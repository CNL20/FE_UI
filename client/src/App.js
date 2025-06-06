import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import ParentDashboard from "./pages/ParentDashboard";
import NurseDashboard from "./pages/NurseDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";

const GOOGLE_CLIENT_ID =
  "1022260188227-3gnpj7tg2jii28e93np6c3hhvbjpbs29.apps.googleusercontent.com"; // Thay thế bằng Client ID thực của bạn

const apiUrl = process.env.REACT_APP_API_URL || "https://localhost:5001";

// Thêm cấu hình fetch để bỏ qua lỗi SSL trong môi trường development
const fetchConfig = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  // Bỏ qua lỗi SSL trong môi trường development
  ...(process.env.NODE_ENV === "development" && {
    // Chỉ sử dụng trong môi trường development
    // KHÔNG sử dụng trong production
    rejectUnauthorized: false,
  }),
};

fetch(`${apiUrl}/api/ten-controller`, fetchConfig)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    console.log(data);
    // xử lý data ở đây
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
    // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
  });

const theme = createTheme({
  palette: {
    primary: {
      main: "#1a73e8",
    },
    secondary: {
      main: "#34a853",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

const App = () => {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/admin-dashboard"
              element={
                <PrivateRoute>
                  <RoleBasedRoute allowedRoles={["admin"]}>
                    <AdminDashboard />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/parent-dashboard"
              element={
                <PrivateRoute>
                  <RoleBasedRoute allowedRoles={["parent"]}>
                    <ParentDashboard />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/nurse-dashboard"
              element={
                <PrivateRoute>
                  <RoleBasedRoute allowedRoles={["nurse"]}>
                    <NurseDashboard />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/manager-dashboard"
              element={
                <PrivateRoute>
                  <RoleBasedRoute allowedRoles={["manager"]}>
                    <ManagerDashboard />
                  </RoleBasedRoute>
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
