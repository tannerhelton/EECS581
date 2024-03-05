// A response page to display to users when they submit a contact form

//imports
import React from 'react';
import { Typography, Paper, Container, Box } from '@mui/material';
import { styled } from '@mui/system';

// styling component
const StyledContainer = styled(Container)({
  maxWidth: '400px',
  padding: '20px',
  marginTop: '20vh',
  textAlign: 'center',
  backgroundColor: '#2c3e50',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '20px',
  color: 'white', // Adjust text color as needed
});

// ThankYouPage: Functional component for the thank you page
const ThankYouPage = () => {
  return (
    <StyledContainer component={Paper} elevation={0}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h4" color="primary" gutterBottom>
          Thank You!
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          We have received your message and will get back to you shortly.
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default ThankYouPage;
