import { createTheme } from '@mui/material/styles';

// Tạo theme tùy chỉnh với font phù hợp cho tiếng Việt
const theme = createTheme({
  typography: {
    fontFamily: [
      'Inter',
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 500,
    },
    h6: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 500,
    },
    body1: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    body2: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    button: {
      fontFamily: "'Inter', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      fontWeight: 500,
      textTransform: 'none', // Giữ nguyên case của text
    },
  },
  palette: {
    primary: {
      main: '#4299e1',
      dark: '#2b6cb0',
      light: '#63b3ed',
    },
    secondary: {
      main: '#718096',
      dark: '#4a5568',
      light: '#a0aec0',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
