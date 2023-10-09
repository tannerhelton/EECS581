import axios from "axios";

// Replace these with our env, just havent set up yet.
const apiKey = "YOUR_OPENAI_API_KEY";
const endpoint = "https://api.openai.com/v1/engines/davinci/completions";

// Usage example:
// const handleSubmit = async () => {
//     const response = await sendMessageToGPT(userInput);
//     setChatHistory([...chatHistory, { type: "user", text: userInput }]);
//     setChatHistory([...chatHistory, { type: "bot", text: response }]);
//     setUserInput("");
//   };

const sendMessageToGPT = async (userMessage) => {
	try {
		const response = await axios.post(
			endpoint,
			{
				prompt: userMessage,
				max_tokens: 50, // Adjust the number of tokens as needed
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiKey}`,
				},
			}
		);

		return response.data.choices[0].text;
	} catch (error) {
		console.error("Error sending message to GPT:", error);
		return "An error occurred while processing your request.";
	}
};

export default sendMessageToGPT;
