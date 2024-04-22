/**
 * File Name: ForgotPasswordPage.js
 * 
 * Description:
 * This component allows users to initiate a password reset process if they forget their password.
 * It provides a form for users to submit their email address to receive a reset link. The component uses Material UI for styling and Firebase Authentication for managing the reset process.
 * It includes input validation, error handling, and visual feedback based on the success or failure of the reset request.
 * 
 * Created by: Adam Jolles
 * Date Created: October 15, 2023
 * 
 * Revised History:
 * - October 23, 2023 - Sloan Stubler improved UI/UX design and implemented advanced error handling mechanisms.
 * 
 * Preconditions:
 * - Firebase project must be configured and linked to the application.
 * - Material UI must be installed and properly configured in the project environment.
 * 
 * Input Values:
 * - Email: String input that must be a valid email address to receive the password reset link.
 * 
 * Postconditions:
 * - Renders a form that users can use to request a password reset email.
 * 
 * Return Values:
 * - A React component displaying a form for password reset email requests.
 * 
 * Errors and Exceptions:
 * - Firebase-related errors will be displayed if the email is not in the correct format or if the email does not exist in the database.
 * 
 * Side Effects:
 * - Triggering the password reset sends a network request to Firebase, which may alter user data on the backend.
 * 
 * Invariants:
 * - The page structure and functionality remain consistent under the same input conditions.
 * 
 * Known Faults:
 * - Lack of real-time validation may lead users to submit incorrect data that only gets validated server-side.
 */

import React, { useState } from 'react';
// Importing various Material UI components for UI design
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
// Importing Firebase authentication methods
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Initialize Firebase Authentication
const auth = getAuth();

// StyledContainer: Custom styled container for the forgot password page
const StyledContainer = styled(Container)(({ theme }) => ({
  maxWidth: '400px',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 'fit-content',
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(5),
  textAlign: 'center',
  backgroundColor: '#2c3e50',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  color: 'white',
}));

// Styles for primary colored text
const primaryColorStyle = {
  color: '#6195CB',
};

// Styles for text fields
const textFieldStyle = {
  marginBottom: '10px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
};

// ForgotPasswordPage: Main component for the forgot password functionality
const ForgotPasswordPage = () => {
  // State variables for handling user input and feedback messages
  const [email, setEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const navigate = useNavigate();

  // handleResetPassword: Function to handle the password reset process
  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      // Handling success in password reset
      setResetSuccess('Check your email for a link to reset your password.');
    } catch (error) {
      // Handling errors in password reset
      setResetError(error.message);
    }
  };

  // JSX for rendering the password reset form
  return (
    <StyledContainer component={Paper} elevation={0}>
      <Box marginBottom={3}>
        <Typography variant='h4' style={primaryColorStyle}>
          Reset Password
        </Typography>
      </Box>
      <Typography variant='body1' style={{ color: 'white', marginBottom: '20px' }}>
        Enter your email address and we'll send you a link to reset your password.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <form onSubmit={handleResetPassword}>
          <TextField
            label='Email Address'
            margin='normal'
            required
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputLabelProps={{ style: primaryColorStyle }}
            InputProps={{ style: primaryColorStyle }}
            sx={textFieldStyle}
          />
          {resetError && (
            <Typography color='error' style={{ marginTop: '10px' }}>
              {resetError}
            </Typography>
          )}
          {resetSuccess && (
            <Typography style={{ color: 'lightgreen', marginTop: '10px' }}>
              {resetSuccess}
            </Typography>
          )}
          <Button
            variant='contained'
            color='primary'
            type='submit'
            fullWidth
            sx={{ marginTop: '20px' }}
          >
            Send Reset Link
          </Button>
        </form>
      </Box>
    </StyledContainer>
  );
};

export default ForgotPasswordPage;
