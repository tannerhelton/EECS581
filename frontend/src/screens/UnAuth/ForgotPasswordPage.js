// ForgotPassword.js
import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

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

const primaryColorStyle = {
  color: '#6195CB',
};

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

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [resetError, setResetError] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');

  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSuccess('Check your email for a link to reset your password.');
    } catch (error) {
      setResetError(error.message);
    }
  };

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
