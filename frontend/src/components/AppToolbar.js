/**
 * AppToolbar.js
 *
 * This component represents the application toolbar for navigation and user interaction.
 * It includes a logo, navigation buttons, and a logout button if the user is authenticated.
 * Navigation is handled using React Router, and authentication is managed through Firebase.
 *
 * Contributors:
 * - Tanner Helton - Initial design and functionality
 */

// Import necessary React and Material-UI components and hooks
import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { styled } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";

// Define the URL for the logo
const logoUrl = "/HH_Logo.png";

// Style the HeaderLogo component using MUI's styled API
const HeaderLogo = styled("img")({
  height: "40px",
  marginRight: (theme) => theme.spacing(2),
});

// Functional component for navigation buttons
const NavButton = ({ to, label }) => {
  const location = useLocation();
  const className =
    location.pathname === to ? "toolbarCurrent" : "toolbarOther";
  const navigate = useNavigate();

  return (
    <Button className={className} onClick={() => navigate(to)}>
      {label}
    </Button>
  );
};

// Main component for the application toolbar
export default function AppToolbar({ user }) {
  // Function to handle logout
  const handleLogout = () => {
    signOut(getAuth());
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        {/* Health Horizon AI Logo */}
        <HeaderLogo src={logoUrl} alt="Health Horizon AI Logo" />

        {/* Navigation buttons */}
        <NavButton to="/" label="Home" />
        <NavButton to="/about" label="About" />
        {user && <NavButton to="/profile" label="Profile" />}
        <NavButton
          to={user ? "/chatbot" : "/login"}
          label={user ? "Chatbot" : "Login"}
        />
        {user && <NavButton to="/upload" label="Upload" />}
        <NavButton to="/contactus" label="Contact" />

        {/* Logout button if user is authenticated */}
        {user && (
          <Button color="primary" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
