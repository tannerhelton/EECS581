// Import the necessary components and modules
import React from "react";
import { Button, TextField, Typography } from "@mui/material";

// Define the ChatbotPage component
const ChatbotPage = () => {
  return (
    // Main div container for the component
    <div>
      {/* Display the Chatbot title using Typography with "h1" variant */}
      <Typography variant="h1">Chatbot</Typography>

      {/* Display a greeting message using Typography with "body1" variant */}
      <Typography variant="body1">
        Hi, I'm your AI assistant. How can I help you today?
      </Typography>

      {/* Text field for the user to type their symptoms */}
      <TextField label="Type your symptoms..." variant="outlined" />

      {/* Button to submit the user's input */}
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
    </div>
  );
};

// Export the ChatbotPage component for use in other parts of the app
export default ChatbotPage;
