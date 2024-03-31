// Logic for the chatbot page. This page is only accessible to authenticated users.
// Users can ask the chatbot questions about their health and the chatbot will respond with an answer.

// Import the necessary components and modules
import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./css/ChatbotPage.css"; // Import the CSS file

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
    dangerouslyAllowBrowser: true,
});

const thread = await openai.beta.threads.create();

// Define the ChatbotPage component
const ChatbotPage = () => {
    return (
        <>
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
                            handleQuery();
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
                    onClick={handleQuery}
                >
                    Send
                </Button>
            </div>
            {/* chat history between user and chatbot */}
            <div id="chatbotCard2">
                <div id="chatBotInit" className="chatbotResponse">
                    <img
                        src={process.env.PUBLIC_URL + "/HH_Logo.png"}
                        className="chatbotImg"
                    ></img>
                    <div className="chatbotText">
                        Hi, I'm your AI assistant. How can I help you today?
                        <br />
                        Please include as much detail as possible so I can better assist
                        you.
                        <br />
                        Waiting for your inquiry...
                    </div>
                </div>
            </div>
        </>
    );
};

// Export the ChatbotPage component for use in other parts of the app
export default ChatbotPage;

let queryLock = false; // Lock to elegantly prevent spam queries
// this function is called when the user clicks the send button
// it gets the query from the text field and sends it to the backend
function handleQuery() {
    if (queryLock) return;
    const query = document.getElementById("chatbotInput").value;
    if (!query) return;
    queryLock = true;
    document.getElementById("chatbotInput").value = "";
    document.getElementById("chatbotInput").focus();
    //send users query
    sendForm(query);
    // show users query in the chat log
    document.getElementById("chatbotSendButton").innerText = "Thinking...";
    document.getElementById("chatBotInit").style.display = "none";
    const container = document.getElementById("chatbotCard2");
    const main = document.createElement("div");
    main.className = "chatbotQuery";
    const img = document.createElement("img");
    img.className = "chatbotImg";
    img.src = process.env.PUBLIC_URL + "/default-user-icon.png";
    main.appendChild(img);
    const text = document.createElement("div");
    text.className = "chatbotText";
    text.innerHTML = query;
    main.appendChild(text);
    container.appendChild(main);
}

let responseLock = false; // Lock when responding to one query. Unlock when ready to respond to another query
/**
 * @param {string} chunk - A piece of the response stream, usually a single character. Can also be the entire response.
 * @param {boolean} isLastChunk - Whether this is the last chunk of the response.
 * @description This function should be called repeatedly as the response stream comes in. It can also be called once with the entire response.
 * If the chunk is the entire response, isLastChunk should be true.
 */
function queryResponseChunk(chunk, isLastChunk = false) {
    const container = document.getElementById("chatbotCard2");
    // display new bot query response
    if (!responseLock) {
        responseLock = true;
        const main = document.createElement("div");
        main.className = "chatbotResponse";
        const img = document.createElement("img");
        img.className = "chatbotImg";
        img.src = process.env.PUBLIC_URL + "/HH_Logo.png";
        main.appendChild(img);
        const text = document.createElement("div");
        text.className = "chatbotText";
        main.appendChild(text);
        container.appendChild(main);
    }
    container.lastChild.lastChild.innerHTML += chunk;
    // response stream is done, prepare for next query
    if (isLastChunk) {
        queryLock = false;
        responseLock = false;
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
async function sendForm(query) {
    await openai.beta.threads.messages.create(thread.id, { content: query, role: "user" });

    const assistant_id = process.env.REACT_APP_ASSISTANT_ID;
    const run = openai.beta.threads.runs.createAndStream(thread.id, { assistant_id, model: "gpt-4-turbo-preview"});

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
        if (chunk && response.event == "thread.message.delta") queryResponseChunk(chunk);
        else if (response.event == "thread.message.completed") queryResponseChunk("", true)
    }

    codes.forEach(code => {
        const response = (() => {switch (code) {
            case "thread.run.failed":
                return " I failed to process your message. Please try sending it again.";
            case "error":
                return " A general error occured. Please try sending your message again.";
            case "thread.run.expired":
                return " This session has expired. Please refresh the page and start a new conversation.";
            case "thread.message.incomplete":
                return " Something has interrupted my response. Please try sending your message again.";
        }})();
        if (response) queryResponseChunk(response, true);
    });
}
