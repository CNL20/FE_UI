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
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  isHomePage?: boolean;
  setIsAuthenticated?: (isAuthenticated: boolean) => void;
  setUserRole?: (userRole: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  isHomePage,
  setIsAuthenticated,
  setUserRole,
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    if (setIsAuthenticated) setIsAuthenticated(false);
    if (setUserRole) setUserRole("");
    navigate("/");
    handleMenuClose();
  };

  const handleProfile = () => {
    navigate("/profile");
    handleMenuClose();
  };

  return (
    <AppBar
      position="static"
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
          {isHomePage ? (
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
                onClick={() => {
                  const el = document.getElementById("school-health-news");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
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
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
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
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate("/news")}
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
                onClick={() => navigate("/contact")}
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
            </>
          )}

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
          {!isHomePage && (
            <IconButton onClick={handleMenuOpen} color="inherit">
              <AccountCircleIcon />
            </IconButton>
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleProfile}>Thông tin tài khoản</MenuItem>
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
