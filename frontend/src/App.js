import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import HomePage from "./screens/HomePage";
import LoginPage from "./screens/LoginPage";
import ChatbotPage from "./screens/ChatbotPage";

function App() {
  return (
    <Router>
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
          <Button color="inherit">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              to="/chatbot"
              style={{ textDecoration: "none", color: "white" }}
            >
              Chatbot
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chatbot" element={<ChatbotPage />} />
      </Routes>
    </Router>
  );
}

export default App;
