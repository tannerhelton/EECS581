import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import {
  getAuth,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

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
    <div>
      <Typography variant="h1">Login</Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>

      <div id="recaptcha-container"></div>
      <TextField
        label="Phone Number"
        variant="outlined"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handlePhoneLogin}>
        Login with Phone
      </Button>
      {confirmationResult && (
        <div>
          <TextField
            label="Verification Code"
            variant="outlined"
            onChange={(e) => confirmCode(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default LoginPage;
