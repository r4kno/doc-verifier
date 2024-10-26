import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AuthoritiesForm from "./authoritiesForm";
import FlexBetween from "components/FlexBetween";

// Authorities Login Page Component
const AuthoritiesLoginPage = () => {
  const theme = useTheme();

  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <FlexBetween
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
        justifyContent="center"
        position="relative"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary" sx={{ flexGrow: 1 }}>
          DocVerifier - Authorities
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="secondary"
          sx={{ position: "absolute", right: 0 }}
        >
          User Login
        </Button>
      </FlexBetween>
      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        {/* Show the message above the email and password */}
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to DocVerifier!
        </Typography>
        <AuthoritiesForm />
      </Box>
    </Box>
  );
};

export default AuthoritiesLoginPage;