/**
 * File Name: ThankYouPage.js
 * 
 * Description:
 * The ThankYouPage component is displayed after a user submits a contact form. It thanks the user for their inquiry
 * with a simple and clear message. The component uses Material UI for styling to ensure consistency with the site's
 * aesthetic and to maintain responsiveness. The layout is centered and designed to provide a positive user experience
 * by acknowledging user interaction in a visually appealing manner.
 * 
 * Created by: Adam Jolles
 * Date Created: October 15, 2023
 * 
 * Revised History:
 * - No revisions made to date.
 * 
 * Preconditions:
 * - Material UI library must be installed and properly integrated within the project.
 * 
 * Input Values:
 * - None. This component displays static content and does not process user input.
 * 
 * Postconditions:
 * - Renders a message thanking the user for their inquiry, positioned centrally on the page.
 * 
 * Return Values:
 * - A React component that provides a visual response to user submissions.
 * 
 * Errors and Exceptions:
 * - No direct errors or exceptions are handled by this component as it does not involve data processing.
 * 
 * Side Effects:
 * - None. The component is purely informational and does not modify any state or data.
 * 
 * Invariants:
 * - The content and styling of the thank you message are maintained unless explicitly modified in the code.
 * 
 * Known Faults:
 * - None identified, given the static nature of the content.
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
