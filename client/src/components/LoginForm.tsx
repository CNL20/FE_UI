import React, { useState } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onCancel?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    onLogin(username, password);
  };

  return (
    <Box>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        fullWidth
      >
        Login
      </Button>
      {onCancel && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancel}
          fullWidth
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
      )}
    </Box>
  );
};

export default LoginForm;
