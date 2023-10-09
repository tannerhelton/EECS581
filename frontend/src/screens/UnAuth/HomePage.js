import React from "react";
import { Typography, Paper, Container } from "@mui/material";
import { styled } from "@mui/system";

const logoUrl = "/HH_logo.png";

const StyledContainer = styled(Container)({
  padding: (theme) => theme.spacing(4),
  marginTop: (theme) => theme.spacing(4),
  textAlign: "center",
  backgroundColor: "transparent", // Making the Paper's background transparent
});

const LogoImage = styled("img")({
  maxWidth: "30%",
  marginBottom: (theme) => theme.spacing(3),
});

const HomePage = () => {
  return (
    <StyledContainer component={Paper} elevation={0}>
      {" "}
      {/* Removed shadow with elevation={0} */}
      <LogoImage src={logoUrl} alt="Health Horizon AI Logo" />
      <Typography variant="h2" color="primary">
        {" "}
        {/* Changed to h2 variant for larger text and specified color */}
        Early detection, better health.
      </Typography>
    </StyledContainer>
  );
};

export default HomePage;
