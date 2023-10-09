import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Container } from "@mui/material";
import { styled } from "@mui/system";
import {
  getAuth,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

// Reusing the styles from HomePage and AboutPage
const StyledContainer = styled(Container)({
  padding: (theme) => theme.spacing(4),
  marginTop: '25vh',
  textAlign: "center",
  backgroundColor: 'transparent',
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Navigate to another page or whatever you want
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handlePhoneLogin = async () => {
    const auth = getAuth();
    const recaptchaVerifier = new RecaptchaVerifier("recaptcha-container");

    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      // Then, ask the user to enter the verification code
    } catch (error) {
      console.error("Phone Login Failed:", error);
    }
  };

  const confirmCode = async (code) => {
    try {
      await confirmationResult.confirm(code);
      // Navigate to another page or whatever you want
    } catch (error) {
      console.error("Code confirmation Failed:", error);
    }
  };

  return (
    <StyledContainer component={Paper} elevation={0}>
      <Typography variant="h2" color="primary">Login</Typography>
      <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>

      <div id="recaptcha-container"></div>
      <TextField
        label="Phone Number"
        variant="outlined"
        fullWidth
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ marginTop: '20px', marginBottom: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handlePhoneLogin} fullWidth>
        Login with Phone
      </Button>
      {confirmationResult && (
        <div style={{ marginTop: '20px' }}>
          <TextField
            label="Verification Code"
            variant="outlined"
            fullWidth
            onChange={(e) => confirmCode(e.target.value)}
          />
        </div>
      )}
    </StyledContainer>
  );
};

export default LoginPage;