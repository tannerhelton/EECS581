// Import the necessary components and modules
import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./css/ChatbotPage.css"; // Import the CSS file

// Define the ChatbotPage component
const ChatbotPage = () => {
    return (<>
        {/* Main div container for the component */}
        <div id="chatbotCard">
            {/* Display the Chatbot title using Typography with "h1" variant */}
            <Typography variant="h3"><b>Chatbot</b></Typography>

            {/* Display a greeting message using Typography with "body1" variant */}
            <Typography variant="body1">
                Hi, I'm your AI assistant. How can I help you today?
            </Typography><br />

            {/* Text field for the user to type their symptoms */}
            <TextField label="Type your symptoms..." variant="outlined" id="chatbotTextfield" /><br />

            {/* Button to submit the user's input */}
            <Button variant="contained" color="primary" type="submit">
                Send
            </Button>
        </div>
        <div id="chatbotCard2">
            {/* a field where the ai responds */}
            <Typography variant="body1">
                Waiting for your question...
            </Typography>
        </div>
    </>);
}

// Export the ChatbotPage component for use in other parts of the app
export default ChatbotPage;