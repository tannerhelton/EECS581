import React, { useState } from 'react';
// Importing various Material UI components for UI design
import {
  Button, TextField, Typography, Paper, Container, Box, Grid, Link,
  FormControlLabel, Checkbox
} from '@mui/material';
import { styled } from '@mui/system';
// Importing Firebase authentication methods
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

// Initialize Firebase Authentication
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

// StyledContainer: Custom styled container for the login page
const StyledContainer = styled(Container)(({ theme }) => ({
  width: 'fit-content',
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

// LogoImage: Custom styled component for displaying a logo image
const LogoImage = styled('img')({
  width: '50px', // Adjust the logo size as needed
  marginBottom: '20px',
});

// PrimaryText: Custom styled typography for primary text in the login page
const PrimaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(2),
}));

// SignInButton: Custom styled button for sign-in actions
const SignInButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.getContrastText(theme.palette.background.paper),
  borderColor: theme.palette.getContrastText(theme.palette.background.paper),
  '&:hover': {
    backgroundColor: theme.palette.getContrastText(theme.palette.background.paper, 0.08),
  },
  textTransform: 'none',
}));

// CustomGoogleIcon: Custom styled Google icon with specific color
const CustomGoogleIcon = styled(GoogleIcon)({
  color: 'red', 
});

// CustomTextField: Custom styled text field for input fields like email and password
const CustomTextField = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  marginBottom: theme.spacing(2),
}));

// LoginPage: The main component for the login page
const LoginPage = () => {
  // State hooks for managing user input and login errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  // handleLogin: Function to handle login with email and password
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setLoginError(error.message);
    }
  };

  // signInWithGoogle: Function to handle Google sign-in
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setLoginError(error.message);
    }
  };

  // Render method returning JSX for the LoginPage
  return (
    <StyledContainer component={Paper} elevation={0}>
      <LogoImage src={process.env.PUBLIC_URL + '/HH_Logo.png'} alt='Health Horizon AI Logo' />
      <PrimaryText variant='h4'>
        Welcome Back
      </PrimaryText>
      <PrimaryText variant='h5'>
        Login
      </PrimaryText>
      <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
        <CustomTextField
          label='Email'
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <CustomTextField
          label='Password'
          required
          type='password'
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loginError && (
          <Typography color='error' sx={{ mt: 2 }}>
            {loginError}
          </Typography>
        )}
        <Button
          variant='contained'
          color='primary'
          type='submit'
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
        <Grid container justifyContent="space-between" sx={{ mt: 2 }}>
          <Grid item>
            <Link href="/forgotpassword" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
        <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
            sx={{ mt: 2, color: 'primary.main' }}
        />
        <SignInButton
          variant="outlined"
          startIcon={<GoogleIcon sx={{ '&:hover': { color: 'primary.main !important' } }} />}
        onClick={signInWithGoogle}
        sx={{
            '&:hover': {
              backgroundColor: 'transparent',
              '& .MuiSvgIcon-root': { 
                color: 'primary.main !important',
              }
            }
          }}
        >
          Sign in with Google
        </SignInButton>
      </Box>
    </StyledContainer>
  );
};

export default LoginPage;
