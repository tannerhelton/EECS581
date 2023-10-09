import React from "react";
import { Typography, Paper, Container } from "@mui/material";
import { styled } from "@mui/system";

// Reusing the styles from HomePage to maintain consistency
const StyledContainer = styled(Container)({
  padding: (theme) => theme.spacing(4),
  marginTop: '25vh',
  textAlign: "center",
  backgroundColor: 'transparent',
});

const AboutPage = () => {
  return (
    <StyledContainer component={Paper} elevation={0}>
      <Typography variant="h2" color="primary">About Health Horizon AI</Typography>
      <Typography variant="h6" color="primary" style={{ marginTop: '20px' }}>
        At Health Horizon AI, we are dedicated to leveraging the power of
        machine learning to advance healthcare. Our mission is to pioneer
        early detection technologies for various medical conditions, including
        but not limited to heart disease, diabetes, and more.
      </Typography>
    </StyledContainer>
  );
};

export default AboutPage;
