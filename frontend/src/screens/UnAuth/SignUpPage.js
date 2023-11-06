import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Container, Box } from '@mui/material';
import { styled } from '@mui/system';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const auth = getAuth();

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

const LogoImage = styled('img')({
  maxWidth: '10%',
  marginBottom: '20px',
});

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

const logoUrl = process.env.PUBLIC_URL + '/HH_Logo.png';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [signUpError, setSignUpError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Here you might want to update the user profile or store the additional fields in your database
      navigate('/'); // Navigate to the home page or other page on successful sign up
    } catch (error) {
      setSignUpError(error.message);
    }
  };

  return (
    <StyledContainer component={Paper} elevation={0}>
      <Box marginBottom={3}>
        <LogoImage src={logoUrl} alt='Health Horizon AI Logo' />
        <Typography variant='h4' style={primaryColorStyle}>
          Sign Up
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
    </StyledContainer>
  );
};

export default SignUpPage;
