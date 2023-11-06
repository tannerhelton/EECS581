// Import the necessary components and modules
import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import "./css/ChatbotPage.css"; // Import the CSS file

// Define the ChatbotPage component
const ChatbotPage = () => {
    return (<>
        <div id="chatbotCard">
            <Typography variant="h3"><b>Chatbot</b></Typography>

            <Typography variant="body1">
                Powered by OpenAI's GPT-4 model, our chatbot can help you with any questions you may have about your health.
            </Typography><br/>

            {/* Multiline not updating properly: bug from https://github.com/mui/material-ui/issues/7465 */}
            {/* Caused by TextField being controlled. Says closed but they're lying.  */}
            <TextField label="Type your symptoms..." id="ChatbotTextField" variant="standard" autoComplete="off" autoFocus={true} multiline={true} maxRows={8}
                /* styles the input component */
                inputProps={{
                    id: "chatbotInput",
                    style: { 
                        whiteSpace: 'pre-line',
                        color: "white"
                    }
                }}
            /><br/>

            <Button variant="contained" color="primary" id="chatbotSendButton" onClick={() => handleQuery()}>Send</Button>
        </div>
        <div id="chatbotCard2">
            <div id="chatBotInit">
                Hi, I'm your AI assistant. How can I help you today?<br/>
                Please include as much detail as possible so I can better assist you.<br/>
                Waiting for your inquiry...
            </div>
        </div>
    </>);
}

// Export the ChatbotPage component for use in other parts of the app
export default ChatbotPage;

let queryLock = false; // Lock to elegantly prevent spam queries
function handleQuery() {
    if (queryLock) return;
    const query = document.getElementById("chatbotInput").value;
    if (!query) return;
    queryLock = true;
    document.getElementById("chatbotInput").value = "";
    sendForm(query);
    document.getElementById("chatbotSendButton").innerText = "Thinking...";
    document.getElementById("chatBotInit").style.display = "none";
    const container = document.getElementById("chatbotCard2");
    const div = document.createElement("div");
    div.className = "chatbotQuery";
    div.innerHTML = query;
    container.appendChild(div);
}

let responseLock = false; // Lock when responding to one query. Unlock when ready to respond to another query
/**
* @param {string} chunk - A piece of the response stream, usually a single character. Can also be the entire response.
* @param {boolean} isLastChunk - Whether this is the last character of the response.
* @description This function should be called repeatedly as the response stream comes in. It can also be called once with the entire response.
* If the chunk is the entire response, isLastChunk should be true.
*/
function queryResponseChunk(chunk, isLastChunk=false) {
    const container = document.getElementById("chatbotCard2");
    // new query response
    if (!responseLock) {
        responseLock = true;
        const div = document.createElement("div");
        div.className = "chatbotResponse";
        container.appendChild(div);
    }
    container.lastChild.innerHTML += chunk;
    if (isLastChunk) {
        queryLock    = false;
        responseLock = false;
        document.getElementById("chatbotSendButton").innerText = "SEND";
    }
}

// ====================================================================================================
// FOR GPT API PEOPLE: this is the function that will need to be replaced with your API call
// use the above function queryResponseChunk to send the response stream to the frontend
// ====================================================================================================

//send form to GPT API here
async function sendForm(query) {
    // ATTENTION: this entire function is a simulation of the GPT API
    console.log("Query sent: " + query);
    // query sent. Wait for response...
    await new Promise(r => setTimeout(r, 700));
    // response as a stream of letters.
    const responseChunks = "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    for (let i = 0; i < responseChunks.length; i++) {
        await new Promise(r => setTimeout(r, Math.random() * Math.random() * 150));
        queryResponseChunk(responseChunks[i], i == responseChunks.length - 1);
    }
}