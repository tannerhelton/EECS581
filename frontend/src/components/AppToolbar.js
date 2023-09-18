import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function AppToolbar({ user }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Health Horizon AI
        </Typography>
        <Button color="inherit">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            Home
          </Link>
        </Button>
        {user ? (
          <Button color="inherit">
            <Link
              to="/chatbot"
              style={{ textDecoration: "none", color: "white" }}
            >
              Chatbot
            </Link>
          </Button>
        ) : (
          <Button color="inherit">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
