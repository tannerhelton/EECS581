// Importing required components and modules
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

// A reusable navigation button component
const NavButton = ({ to, label }) => (
  <Button color="inherit">
    {/* Use Link for client-side routing, apply common styling */}
    <Link to={to} style={{ textDecoration: "none", color: "white" }}>
      {label}
    </Link>
  </Button>
);

// Main App Toolbar component
export default function AppToolbar({ user }) {
  return (
    // AppBar for the app header
    <AppBar position="static">
      <Toolbar>
        {/* Title of the app */}
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Health Horizon AI
        </Typography>

        {/* Home button */}
        <NavButton to="/" label="Home" />

        {/* Conditional button: Shows "Chatbot" if user is logged in, otherwise "Login" */}
        <NavButton
          to={user ? "/chatbot" : "/login"}
          label={user ? "Chatbot" : "Login"}
        />
      </Toolbar>
    </AppBar>
  );
}
