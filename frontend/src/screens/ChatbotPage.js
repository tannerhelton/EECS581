import React from "react";
import { Button, TextField, Typography } from "@mui/material";

const ChatbotPage = () => {
  return (
    <div>
      <Typography variant="h1">Chatbot</Typography>
      <Typography variant="body1">
        Hi, I'm your AI assistant. How can I help you today?
      </Typography>
      <TextField label="Type your symptoms..." variant="outlined" />
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    </div>
  );
};

export default ChatbotPage;
