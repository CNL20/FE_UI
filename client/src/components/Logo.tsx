import React from "react";
import { Typography, Box } from "@mui/material";

const Logo: React.FC = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" p={2}>
      <img
        src="/logo.png"
        alt="School Healthcare System Logo"
        style={{ width: 50, height: 50, marginRight: 10 }}
      />
      <Typography variant="h6" color="primary">
        Hệ Thống Y Tế Học Đường
      </Typography>
    </Box>
  );
};

export default Logo;
