import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import { MedicalServices } from '@mui/icons-material';

const LogoContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '2.5rem',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5rem',
}));

const LogoCircle = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  height: '80px',
  marginBottom: 0,
  '& .circle': {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'white',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  '&:hover .circle': {
    transform: 'scale(1.05)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
  },
  '& .icon': {
    position: 'relative',
    zIndex: 2,
    fontSize: '2.8rem',
    background: 'linear-gradient(135deg, #1a73e8, #34a853)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
  },
  '& .ring': {
    position: 'absolute',
    width: '110%',
    height: '110%',
    border: '2px solid rgba(26, 115, 232, 0.3)',
    borderRadius: '50%',
    animation: 'rotate 10s linear infinite',
    '&:nth-of-type(2)': {
      width: '120%',
      height: '120%',
      borderColor: 'rgba(52, 168, 83, 0.3)',
      animationDuration: '15s',
      animationDirection: 'reverse',
    },
  },
}));

const LogoText = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  textAlign: 'left',
  '& .main-text': {
    fontSize: '1.8rem',
    fontWeight: 600,
    color: '#1a73e8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: 0,
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    lineHeight: 1,
  },
  '& .sub-text': {
    fontSize: '0.9rem',
    color: '#5f6368',
    fontWeight: 500,
    letterSpacing: '0.3px',
    position: 'relative',
    display: 'inline-block',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: -4,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '40px',
      height: '2px',
      background: 'linear-gradient(90deg, #1a73e8, #34a853)',
      borderRadius: '2px',
    },
  },
}));

const Logo = () => {
  return (
    <LogoContainer>
      <LogoCircle>
        <Box className="circle">
          <MedicalServices className="icon" />
        </Box>
        <Box className="ring" />
        <Box className="ring" />
      </LogoCircle>
      <LogoText>
        <Typography className="main-text">Hệ Thống Y Tế</Typography>
        <Typography className="sub-text">Học Đường</Typography>
      </LogoText>
    </LogoContainer>
  );
};

export default Logo; 