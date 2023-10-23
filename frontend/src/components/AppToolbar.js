import React from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { styled } from "@mui/system";

const logoUrl = "/HH_Logo.png";

const HeaderLogo = styled("img")({
  height: "40px",
  marginRight: (theme) => theme.spacing(2),
});

const NavButton = ({ to, label }) => (
  <Button color="primary">
    {" "}
    {/* This makes the button use the primary color */}
    <Link to={to} style={{ textDecoration: "none", color: "inherit" }}>
      {label}
    </Link>
  </Button>
);

export default function AppToolbar({ user }) {
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        {/* Replacing title with logo */}
        <HeaderLogo src={logoUrl} alt="Health Horizon AI Logo" />

        <NavButton to="/" label="Home" />
        <NavButton to="/about" label="About" />

        {user && <NavButton to="/profile" label="Profile" />}
        <NavButton
          to={user ? "/chatbot" : "/login"}
          label={user ? "Chatbot" : "Login"}
        />
        {user && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
