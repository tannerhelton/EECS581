/**
 * File Name: HomePage.js
 * 
 * Description:
 * The HomePage component serves as the main landing page for users who are not logged in to the Health Horizon AI platform.
 * It features the company's logo and a tagline promoting the mission of early detection for improved health outcomes. This component
 * uses Material UI for styling to ensure a clean, professional look that emphasizes simplicity and effective brand representation.
 * 
 * Created by: Adam Jolles
 * Date Created: October 8, 2023
 * 
 * Revised History:
 * - No revisions made to date.
 * 
 * Preconditions:
 * - Material UI must be installed and properly integrated within the project.
 * - Environment variables for image URLs must be set.
 * 
 * Input Values:
 * - None. This component does not handle user input directly.
 * 
 * Postconditions:
 * - Renders the homepage with the company logo and a concise tagline.
 * 
 * Return Values:
 * - A React component that displays the homepage of the Health Horizon AI platform.
 * 
 * Errors and Exceptions:
 * - If environment variables for the images are not set, the images will not load, leading to missing visuals.
 * 
 * Side Effects:
 * - None expected as the component primarily serves static content.
 * 
 * Invariants:
 * - The overall design and content of the homepage remain consistent across different viewing sessions.
 * 
 * Known Faults:
 * - Potential layout issues on varying screen sizes due to fixed styling properties if not responsive.
 */


//imports
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
