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
