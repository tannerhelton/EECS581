// Importing required components and modules
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

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
  const auth = getAuth();

  // Function to handle logout
  const handleLogout = () => {
    signOut(auth);
  };

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

        {/* Profile button (only if user is logged in) */}
        {user && <NavButton to="/profile" label="Profile" />}

        {/* Chatbot or Login button based on user's login status */}
        <NavButton
          to={user ? "/chatbot" : "/login"}
          label={user ? "Chatbot" : "Login"}
        />

        {/* Logout button (only if user is logged in) */}
        {user && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
