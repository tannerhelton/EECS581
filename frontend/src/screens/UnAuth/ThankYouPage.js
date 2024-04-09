/**
 * ThankYouPage.js
 * 
 * This component serves as a response page to users who have submitted a contact form, 
 * thanking them for their inquiry. It provides a simple, clear message of acknowledgment 
 * in a styled, centered container. The design follows the site's aesthetic, using Material 
 * UI components for consistency and responsiveness.
 * 
 * Contributors:
 * - Adam Jolles - Created the thank you message and page design
 */

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
