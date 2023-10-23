import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Container, Box } from "@mui/material";
import { styled } from "@mui/system";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const NarrowContainer = styled(Container)({
  maxWidth: '400px',
});

const logoUrl = process.env.PUBLIC_URL + "/HH_logo.png";

const LogoImage = styled("img")({
  maxWidth: "10%",
  marginBottom: (theme) => theme.spacing(3),
});

const StyledContainer = styled(NarrowContainer)({
  padding: '20px',
  marginTop: '20vh',
  textAlign: "center",
  backgroundColor: 'transparent',
  width: '50%',
  borderRadius: '20px',
  backgroundColor: '#2c3e50',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
});

const primaryLabelStyle = {
  color: '#6195CB'
};

const primaryBorderStyle = {
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/ProfilePage");
    } catch (error) {
      console.error("Login Failed:", error);
  
      switch (error.code) {
        case 'auth/wrong-password':
          setLoginError("Incorrect Username or Password");
          break;
        case 'auth/user-not-found':
          setLoginError("Incorrect Username or Password");
          break;
        case 'auth/invalid-email':
          setLoginError("Invalid Email Format");
          break;
        default:
          setLoginError(error.message); 
          break;
      }
    }
  };

  return (
    <StyledContainer component={Paper} elevation={0}>
      <Box marginBottom={3}>
        <LogoImage src={logoUrl} alt="Health Horizon AI Logo" /> 
        <Typography variant="h4" color="primary">Welcome Back</Typography>
      </Box>
      <Typography variant="h5" color="primary">Login</Typography>
      <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '10px' }}
          InputLabelProps={{ style: primaryLabelStyle }}
          InputProps={{ style: primaryLabelStyle }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...primaryBorderStyle, marginBottom: '10px' }}
          InputLabelProps={{ style: primaryLabelStyle }}
          InputProps={{ style: primaryLabelStyle }}
        />
        {loginError && <Typography color="error" style={{ marginTop: '10px' }}>{loginError}</Typography>}
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>
    </StyledContainer>
  );
};

export default LoginPage;
