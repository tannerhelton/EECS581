// The page where users can create an account with HHai

//imports
import React, { useState } from 'react';
// Importing various Material UI components for UI design
import { Button, TextField, Typography, Paper, Container, Box, Stack } from '@mui/material';
import { styled } from '@mui/system';
// Importing Firebase authentication methods
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Initialize Firebase Authentication
const auth = getAuth();

// StyledContainer: Custom styled container for the sign-up page
const StyledContainer = styled(Container)(({ theme }) => ({
  width: '500px', 
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

// LogoImage: Custom styled component for displaying a logo
const LogoImage = styled('img')({
  maxWidth: '10%',
  marginBottom: '20px',
});

// CSS styles for primary colored text
const primaryColorStyle = {
  color: '#6195CB',
};

// CSS styles for text fields
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

// URL for logo image, fetched from environment variable
const logoUrl = process.env.PUBLIC_URL + '/HH_Logo.png';

// SignUpPage: The main component for the sign-up page
const SignUpPage = () => {
  // State variables for user input
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [signUpError, setSignUpError] = useState('');

  const navigate = useNavigate();

  // handleSignUp: Function to handle the sign-up process
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Additional logic after successful sign up
      // Navigate to home or another page on success
      navigate('/');
    } catch (error) {
      // Handle sign-up error
      setSignUpError(error.message);
    }
  };

  // JSX for rendering the sign-up form
  return (
    <StyledContainer component={Paper} elevation={0}>
      <Stack spacing={3} justifyContent="center" alignItems="center">
        <Box marginBottom={3}>
          <LogoImage src={logoUrl} alt='Health Horizon AI Logo' />
          <Typography variant='h4' style={primaryColorStyle} marginBottom='20px'>
            Sign Up
          </Typography>
          <Typography variant='body1' style={{ color: 'white', marginBottom: '10px' }}>
          Sign up here to explore new horizons of health and AI technology
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <form onSubmit={handleSignUp}>
            <TextField
              label='Full Name'
              margin='normal'
              required
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ style: primaryColorStyle }}
              InputProps={{ style: primaryColorStyle }}
              sx={textFieldStyle}
            />
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
            <TextField
              label='Password'
              margin='normal'
              required
              fullWidth
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: primaryColorStyle }}
              InputProps={{ style: primaryColorStyle }}
              sx={textFieldStyle}
            />
            <TextField
              label='Phone Number'
              margin='normal'
              required
              fullWidth
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              InputLabelProps={{ style: primaryColorStyle }}
              InputProps={{ style: primaryColorStyle }}
              sx={textFieldStyle}
            />
            {signUpError && (
              <Typography color='error' style={{ marginTop: '10px' }}>
                {signUpError}
              </Typography>
            )}
            <Button
              variant='contained'
              color='primary'
              type='submit'
              fullWidth
              sx={{ marginTop: '20px' }}
            >
              Sign Up
            </Button>
          </form>
        </Box>
      </Stack>
    </StyledContainer>
  );
};

export default SignUpPage;
