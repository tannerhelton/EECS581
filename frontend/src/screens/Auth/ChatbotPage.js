/**
 * File Name: ChatbotPage.js
 * 
 * Description:
 * This component serves as the chat interface for authenticated users to interact with a health-focused 
 * chatbot powered by OpenAI's GPT-4 Turbo model. Users can ask questions about health issues, and the chatbot 
 * responds in real-time. The page includes a text input field for queries and a display area for the chat 
 * conversation. Custom styling is applied for a user-friendly experience, and advanced async functions handle 
 * the communication with OpenAI's API, ensuring responsive and accurate chatbot replies.
 * 
 * Created by: Tanner Helton
 * Date Created: October 14, 2024
 * 
 * Revised History:
 * - Sloan Stubler revised the frontend to be React component-based on April 14, 2024.
 * 
 * Preconditions:
 * - Users must be authenticated, and their authentication state must be managed and accessible via the `auth` prop.
 * - Material UI and React Router must be properly configured within the project.
 * 
 * Input Values:
 * - None.
 * 
 * Postconditions:
 * - Renders a chatbot interface for authenticated users to interact with a health-focused AI assistant.
 * 
 * Return Values:
 * - A React component that displays the chatbot page.
 * 
 * Errors and Exceptions:
 * - Chatbot will tell the user what went wrong in a normal chat message.
 * 
 * Side Effects:
 * - None.
 * 
 * Invariants:
 * - The visual layout and elements remain consistent unless explicitly modified.
 * 
 * Known Faults:
 * - None.
 */

// Import the necessary components and modules
import {React, useState} from "react";
import { Button, TextField, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import "./css/ChatbotPage.css"; // Import the CSS file

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
});

const thread = await openai.beta.threads.create();



const ChatbotConversationCard = ({conversationArray}) => {
    const starterMessage = {owner: "bot", text: "Hi, I'm your AI assistant. How can I help you today? Please include as much detail as possible so I can better assist you. Waiting for your inquiry..."};
    const localConversationArray = [...conversationArray];
    if (localConversationArray.length === 0) localConversationArray.push(starterMessage);

    return (
        <div id="ChatbotConversationCard">
            {localConversationArray.map(({owner, text}, index) => {
                return (
                    <ChatbotConversationMessage
                        key={index}
                        owner={owner}
                        text={text}
                    />
                )
            })}
        </div>
    )
};

const ChatbotConversationMessage = ({ owner, text }) => {
    const className = owner === "user" ? "chatbotConversationMessageUser" : "chatbotConversationMessageBot";
    const imgSrc    = owner === "user" ? "/default-user-icon.png" : "/HH_Logo.png";
    return (
        <div className={className}>
            <img src={process.env.PUBLIC_URL + imgSrc} className="chatbotImg"></img>
            <ReactMarkdown
                className={"chatbotText"}
                children={text}
            />
        </div>
    )
};

// Define the ChatbotPage component
const ChatbotPage = () => {
    const [ conversationArray, setConversationArray ] = useState([]);
    return (
        <div className="ChatbotPage">
            <div id="chatbotCard">
                <Typography variant="h3">
                    <b>Chatbot</b>
                </Typography>

                <Typography variant="body1">
                    Powered by OpenAI's GPT-4 Turbo model, our chatbot can help you with any
                    questions you may have about your health.
                </Typography>
                <br />

                <TextField
                    label="Type your symptoms..."
                    id="ChatbotTextField"
                    variant="standard"
                    autoComplete="off"
                    autoFocus={true}
                    multiline={true}
                    maxRows={8}
                    inputProps={{
                        id: "chatbotInput",
                        style: { color: "white" },
                    }}
                    onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault(); // Prevent default to avoid newline in TextField
                            handleQuery(conversationArray, setConversationArray);
                        }
                    }}
                    // give nicer scrollbar
                    sx={{
                        "& .MuiInputBase-input": {
                            scrollbarColor: "#6195CB #294C7B",
                            "&::-webkit-scrollbar": {
                                width: "0.7em",
                            },
                            "&::-webkit-scrollbar-track": {
                                backgroundColor: "rgba(0,0,0,0.5)",
                                borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#6195CB",
                                borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "whitesmoke",
                            },
                        },
                    }}
                />
                <br />

                <Button
                    variant="contained"
                    color="primary"
                    id="chatbotSendButton"
                    onClick={() => handleQuery(conversationArray, setConversationArray)}
                >
                    Send
                </Button>
            </div>
            <ChatbotConversationCard conversationArray={conversationArray} />
        </div>
    );
};

// Export the ChatbotPage component for use in other parts of the app
export default ChatbotPage;

let queryLock = false; // Lock to elegantly prevent spam queries
// this function is called when the user clicks the send button
// it gets the query from the text field and sends it to the backend
const THINKING_TEXT = "&ZeroWidthSpace;Thinking...";
function handleQuery(conversationArray, setConversationArray) {
    if (queryLock) return;
    const query = document.getElementById("chatbotInput").value;
    if (!query) return;
    queryLock = true;
    document.getElementById("chatbotInput").value = "";
    document.getElementById("chatbotInput").focus();
    const localConversationArray = [...conversationArray, {owner: "user", text: query}, {owner: "bot", text: THINKING_TEXT}];
    setConversationArray(localConversationArray);
    sendForm(query, localConversationArray, setConversationArray);
    document.getElementById("chatbotSendButton").innerText = "Please wait...";
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, 50);
}

/**
 * @param {string} chunk - A piece of the response stream, usually a single character. Can also be the entire response.
 * @param {boolean} isLastChunk - Whether this is the last chunk of the response.
 * @description This function should be called repeatedly as the response stream comes in. It can also be called once with the entire response.
 * If the chunk is the entire response, isLastChunk should be true.
 */
function queryResponseChunk(chunk, conversationArray, setConversationArray, isLastChunk = false) {
    const localConversationArray = [...conversationArray];
    const lastMessage = localConversationArray[localConversationArray.length - 1];
    if (lastMessage.text == THINKING_TEXT) lastMessage.text = "";
    lastMessage.text += chunk;
    setConversationArray(localConversationArray);
    // response stream is done, prepare for next query
    if (isLastChunk) {
        queryLock = false;
        document.getElementById("chatbotSendButton").innerText = "SEND";
    }
    // scroll to bottom of entire document
    window.scrollTo(0, document.body.scrollHeight);
}

// ====================================================================================================
// FOR GPT API PEOPLE: this is the function that will need to be replaced with your API call
// use the above function queryResponseChunk to send the response stream to the frontend
// ====================================================================================================

//send form to GPT API here
async function sendForm(query, conversationArray, setConversationArray) {
    await openai.beta.threads.messages.create(thread.id, { content: query, role: "user" });

    const assistant_id = process.env.REACT_APP_ASSISTANT_ID;
    const run = openai.beta.threads.runs.createAndStream(thread.id, {
        assistant_id,
        model: "gpt-4-turbo-preview",
        instructions: "You are a heath assistant helping a patient with their health concerns. When generating styling for lists, headers, etc, please use the markdown style."
    });

    const stream = run.toReadableStream();
    const reader = stream.getReader();

    const codes = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const decoder = new TextDecoder();
        const response = JSON.parse(decoder.decode(value));
        codes.push(response.event);

        const chunk = response.data.delta?.content[0].text.value;
        if (chunk && response.event == "thread.message.delta") queryResponseChunk(chunk, conversationArray, setConversationArray);
        else if (response.event == "thread.message.completed") queryResponseChunk("", conversationArray, setConversationArray, true)
    }

    codes.forEach(code => {
        const response = (() => {
            switch (code) {
                case "thread.run.failed":
                    return " I failed to process your message. Please try sending it again.";
                case "error":
                    return " A general error occured. Please try sending your message again.";
                case "thread.run.expired":
                    return " This session has expired. Please refresh the page and start a new conversation.";
                case "thread.message.incomplete":
                    return " Something has interrupted my response. Please try sending your message again.";
            }
        })();
        if (response) queryResponseChunk(response, true);
    });
}
