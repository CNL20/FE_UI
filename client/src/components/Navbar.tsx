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
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Hệ Thống Y Tế Học Đường
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate("/")}>
            Trang chủ
          </Button>
          <Button color="inherit" onClick={() => navigate("/news")}>
            Tin tức
          </Button>
          <Button color="inherit" onClick={() => navigate("/schedule")}>
            Lịch khám
          </Button>
          <Button color="inherit" onClick={() => navigate("/health-records")}>
            Hồ sơ sức khỏe
          </Button>
          <Button color="inherit" onClick={() => navigate("/guides")}>
            Hướng dẫn
          </Button>
          <Button color="inherit" onClick={() => navigate("/contact")}>
            Liên hệ
          </Button>
          {isHomePage && (
            <Button color="inherit" onClick={() => navigate("/login")}>
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
