import React from "react";
import { Button, TextField, Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <div>
      <Typography variant="h1">Login</Typography>
      <form>
        <TextField label="Username" variant="outlined" />
        <TextField label="Password" variant="outlined" type="password" />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
