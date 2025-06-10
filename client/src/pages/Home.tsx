import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import Login from "../pages/Login";

interface HomeProps {
  onLogin: (role: string) => void;
}

const Home: React.FC<HomeProps> = ({ onLogin }) => {
  return (
    <>
      <Navbar isHomePage={true} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={2}
      ></Box>
    </>
  );
};

export default Home;
