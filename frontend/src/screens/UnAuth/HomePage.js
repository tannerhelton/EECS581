import React from "react";
// Importing various Material UI components for UI design
import { Typography, Grid, Paper, Container, Avatar } from "@mui/material";
import { styled } from "@mui/system";

// URLs for logo and neural images, fetched from environment variables
const logoUrl = process.env.PUBLIC_URL + "/HH_Logo.png";
const neuralUrl = process.env.PUBLIC_URL + "/neural.png";

// StyledContainer: Custom styled container for the home page
const StyledContainer = styled(Container)({
  padding: '20px',
  marginTop: (theme) => theme.spacing(4),
  textAlign: "center",
  backgroundColor: 'transparent',
});

// LogoImage: A custom styled image component for displaying logos
const LogoImage = styled("img")({
  maxWidth: "30%",
  marginBottom: (theme) => theme.spacing(3),
});

// FeatureBlock: A functional component representing a single feature block
// It takes icon, title, and description as props to display a feature
const FeatureBlock = ({ icon, title, description }) => (
  <Grid item xs={12} sm={4}>
    <Avatar variant="rounded" style={{ margin: '0 auto', marginBottom: '20px', backgroundColor: 'transparent'}}>
      {icon}
    </Avatar>
    <Typography variant="h5" color="primary">{title}</Typography>
    <Typography variant="body1" style={{ color: '#FFFFFF' }}>{description}</Typography>
  </Grid>
);

// HomePage: The main component for the home page
const HomePage = () => {
  return (
    <StyledContainer component={Paper} elevation={0}>
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
