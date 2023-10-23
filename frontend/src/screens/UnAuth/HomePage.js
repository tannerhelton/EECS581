import React from "react";
import { Typography, Grid, Paper, Container, Avatar } from "@mui/material";
import { styled } from "@mui/system";

const logoUrl = process.env.PUBLIC_URL + "/HH_logo.png";
const neuralUrl = process.env.PUBLIC_URL + "/neural.png";

const StyledContainer = styled(Container)({
  padding: (theme) => theme.spacing(4),
  marginTop: (theme) => theme.spacing(4),
  textAlign: "center",

  backgroundColor: 'transparent',
});

const LogoImage = styled("img")({
  maxWidth: "30%",
  marginBottom: (theme) => theme.spacing(3),
});

const FeatureBlock = ({ icon, title, description }) => (
  <Grid item xs={12} sm={4}>
    <Avatar variant="rounded" style={{ margin: '0 auto', marginBottom: '20px', backgroundColor: 'transparent'}}>
      {icon}
    </Avatar>
    <Typography variant="h5" color="primary">{title}</Typography>
    <Typography variant="body1" style={{ color: '#FFFFFF' }}>{description}</Typography>
  </Grid>
);

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
