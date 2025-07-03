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

interface NavbarProps {
  onLogout?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToNews?: () => void;
  onNavigateToContact?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onLogout,
  onNavigateToHome,
  onNavigateToNews,
  onNavigateToContact,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // Kiểm tra nếu đang ở trang Manager, Admin, hoặc Nurse
  const isManager = location.pathname.startsWith(ROUTES.MANAGER.DASHBOARD);
  const isAdmin = location.pathname.startsWith(ROUTES.ADMIN.DASHBOARD);
  const isNurse = location.pathname.startsWith(ROUTES.NURSE.DASHBOARD);
  const isParent = location.pathname.startsWith(ROUTES.PARENT.DASHBOARD);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    if (onLogout) {
      onLogout();
    }
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleNavigateToHome = () => {
    if (onNavigateToHome) {
      onNavigateToHome();
    } else if (isAdmin) {
      navigate(ROUTES.ADMIN.DASHBOARD);
    } else if (isManager) {
      navigate(ROUTES.MANAGER.DASHBOARD);
    } else if (isNurse) {
      navigate(ROUTES.NURSE.DASHBOARD);
    } else {
      navigate(ROUTES.HOME);
    }
  };

  const handleNavigateToNews = () => {
    if (onNavigateToNews) {
      onNavigateToNews();
    } else {
      navigate(ROUTES.HOME);
      setTimeout(() => {
        const el = document.getElementById("school-health-news");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const handleNavigateToContact = () => {
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      navigate(ROUTES.HOME);
      setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const isHomePage = location.pathname === ROUTES.HOME;
  console.log("location.pathname:", location.pathname);
  console.log("ROUTES.NURSE.DASHBOARD:", ROUTES.NURSE.DASHBOARD);
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
        </Typography>
        <Box>
          {isManager || isAdmin || isNurse || isParent ? (
            <>
              <Button
                color="inherit"
                onClick={handleNavigateToHome}
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": {
                    background: "rgba(255,255,255,0.12)",
                    color: "#1976d2",
                    textDecoration: "underline",
                  },
                }}
              >
                Trang chủ
              </Button>
              <Button
                color="inherit"
                onClick={handleNavigateToNews}
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": {
                    background: "rgba(255,255,255,0.12)",
                    color: "#1976d2",
                    textDecoration: "underline",
                  },
                }}
              >
                Tin tức
              </Button>
              <Button
                color="inherit"
                onClick={handleNavigateToContact}
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": {
                    background: "rgba(255,255,255,0.12)",
                    color: "#1976d2",
                    textDecoration: "underline",
                  },
                }}
              >
                Liên hệ
              </Button>
              <IconButton onClick={handleMenu} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {isManager && (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate("/manager/health-records");
                        handleClose();
                      }}
                    >
                      Quản lý hồ sơ y tế
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/manager/medical-staff-management");
                        handleClose();
                      }}
                    >
                      Quản lý nhân sự y tế trường
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/manager/alerts-and-notifications");
                        handleClose();
                      }}
                    >
                      Cảnh báo & Thông báo
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/manager/event-and-appointment-management");
                        handleClose();
                      }}
                    >
                      Quản lý sự kiện & lịch hẹn
                    </MenuItem>
                  </>
                )}
                {isAdmin && (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate("/admin/manage-accounts");
                        handleClose();
                      }}
                    >
                      Quản lý tài khoản
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/admin/activity-logs");
                        handleClose();
                      }}
                    >
                      Nhật ký hoạt động
                    </MenuItem>
                  </>
                )}
                {isParent && (
                  <>
                    <MenuItem
                      onClick={() => {
                        navigate("/parent-pages/health-profile-form");
                        handleClose();
                      }}
                    >
                      Khai báo hồ sơ sức khỏe
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/parent-pages/medication-form");
                        handleClose();
                      }}
                    >
                      Sử dụng thuốc
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/parent-pages/health-check-dashboard");
                        handleClose();
                      }}
                    >
                      Khám sức khỏe
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        navigate("/parent-pages/vaccination-event-dashboard");
                        handleClose();
                      }}
                    >
                      Sự kiện tiêm chủng
                    </MenuItem>                  </>
                )}
                {isNurse && (
                  <>
                    {/* Nurse không có menu item riêng */}
                  </>
                )}
                {!isNurse && (
                  <MenuItem onClick={handleProfile}>Thông tin tài khoản</MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/")}
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": {
                    background: "rgba(255,255,255,0.12)",
                    color: "#1976d2",
                    textDecoration: "underline",
                  },
                }}
              >
                Trang chủ
              </Button>
              <Button
                color="inherit"
                onClick={handleNavigateToNews}
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": {
                    background: "rgba(255,255,255,0.12)",
                    color: "#1976d2",
                    textDecoration: "underline",
                  },
                }}
              >
                Tin tức
              </Button>
              <Button
                color="inherit"
                onClick={handleNavigateToContact}
                sx={{
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  mx: 1,
                  borderRadius: 2,
                  px: 2,
                  py: 1,
                  transition: "background 0.2s, color 0.2s",
                  "&:hover": {
                    background: "rgba(255,255,255,0.12)",
                    color: "#1976d2",
                    textDecoration: "underline",
                  },
                }}
              >
                Liên hệ
              </Button>
              {isHomePage && (
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  sx={{
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    mx: 1,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    transition: "background 0.2s, color 0.2s",
                    "&:hover": {
                      background: "rgba(255,255,255,0.12)",
                      color: "#1976d2",
                      textDecoration: "underline",
                    },
                  }}
                >
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
