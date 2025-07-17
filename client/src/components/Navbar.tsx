import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { AccountCircle as AccountCircleIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../constants";

export interface NavbarProps {
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Nhận diện vai trò
  const isManager = location.pathname.startsWith(ROUTES.MANAGER.DASHBOARD);
  const isAdmin = location.pathname.startsWith(ROUTES.ADMIN.DASHBOARD);
  const isNurse = location.pathname.startsWith(ROUTES.NURSE.DASHBOARD);
  const isParent =
    location.pathname.startsWith(ROUTES.PARENT.DASHBOARD) ||
    location.pathname.startsWith("/parent-pages") ||
    location.pathname.startsWith("/parent/");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  const handleLogout = () => {
    handleClose();
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      navigate(ROUTES.HOME);
    }
  };

  const isHomePage = location.pathname === ROUTES.HOME;

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{
        boxShadow: "0 2px 12px 0 rgba(25, 118, 210, 0.10)",
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
        background: "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
        minHeight: 68,
      }}
    >
      <Toolbar sx={{ minHeight: 68, px: 4 }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            fontSize: 26,
            letterSpacing: 2,
            color: "#fff",
            textShadow: "0 2px 8px rgba(25,118,210,0.10)",
          }}
        >
          Hệ Thống Y Tế Học Đường
        </Typography>        <Box>
          {isManager || isAdmin || isNurse || isParent ? (
            <>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>                {isManager && (
                  <>
                    <MenuItem onClick={() => { navigate("/manager/health-records"); handleClose(); }}>Quản lý hồ sơ y tế</MenuItem>
                    <MenuItem onClick={() => { navigate("/manager/health-check-campaigns"); handleClose(); }}>Quản lý chiến dịch khám sức khỏe</MenuItem>
                    <MenuItem onClick={() => { navigate("/manager/vaccination-campaigns"); handleClose(); }}>Quản lý chiến dịch tiêm chủng</MenuItem>
                  </>
                )}
                {isAdmin && (
                  <>
                    <MenuItem onClick={() => { navigate("/admin/manage-accounts"); handleClose(); }}>Quản lý tài khoản</MenuItem>
                    <MenuItem onClick={() => { navigate("/admin/activity-logs"); handleClose(); }}>Nhật ký hoạt động</MenuItem>
                  </>
                )}                {isParent && (
                  <>
                    <MenuItem onClick={() => { navigate("/parent/notification"); handleClose(); }}>Thông báo</MenuItem>
                  </>                )}
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>          ) : (
            <>
              {isHomePage && (
                <Button color="inherit" onClick={() => navigate("/login")} sx={{ fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, mx: 1, borderRadius: 2, px: 2, py: 1, transition: "background 0.2s, color 0.2s", "&:hover": { background: "rgba(255,255,255,0.12)", color: "#1976d2", textDecoration: "underline" } }}>
                  Đăng nhập
                </Button>
              )}
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;