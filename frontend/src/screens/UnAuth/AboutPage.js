import React from "react";
import { Typography, Grid, Paper, Container, Avatar } from "@mui/material";
import { styled } from "@mui/system";

const logoUrl = process.env.PUBLIC_URL + "/HH_logo.png";
const neuralUrl = process.env.PUBLIC_URL + "/neural.png";

const NarrowContainer = styled(Container)({
  maxWidth: '400px',
});

// Reusing the styles from HomePage to maintain consistency
const StyledContainer = styled(Container)({
  padding: (theme) => theme.spacing(4),
  marginTop: '25vh',
  textAlign: "center",
  backgroundColor: 'transparent',
});

const UnstyledContainer = styled(NarrowContainer)({
  padding: '20px',
  marginTop: '20vh',
  textAlign: "center",
  backgroundColor: 'transparent',
  width: '50%',
  borderRadius: '20px',
  backgroundColor: '#2c3e50',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
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

const AboutPage = () => {
  return (
    <StyledContainer component={Paper} elevation={0}>
      <Typography variant="h2" color="primary">About Health Horizon AI</Typography>
      <Typography variant="h6" color="primary" style={{ marginTop: '20px' }}>
        At Health Horizon AI, we are dedicated to leveraging the power of
        machine learning to advance healthcare. Our mission is to pioneer
        early detection technologies for various medical conditions, including
       heart disease, cancer, diabetes, and more.
      </Typography>
      <div style={{ height: '300px', overflowY: 'scroll' }}></div>
        <Grid container spacing={6}>
          <FeatureBlock 
            src={logoUrl}
            title="Heart Disease" 
            description="We leverage linear regression algorithms to detect early heart disease in patients." 
          />
          <FeatureBlock 
            src={logoUrl} 
            title="Cancer" 
            description="Our neural networks are meticulously trained to accurately detect cancer symptoms." 
          />
          <FeatureBlock 
            src={logoUrl} 
            title="Diabetes" 
            description="Our trained data models and sophisticated AI algorithms allow us to create catered medical plans for diabetic patients.." 
          />
        </Grid>
    </StyledContainer>
  );
};

export default AboutPage;
