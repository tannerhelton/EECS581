const { getAllFilesFromUser } = require("./getAllFilesFromUser");

// Assuming you have express installed
const express = require("express");
const app = express();
const port = 3001; // Ensure this port does not conflict with your React app's port
const cors = require("cors");
app.use(cors());
// Your existing AWS S3 setup and getAllFilesFromUser function here

app.get("/api/files", async (req, res) => {
	const bucketName = "health-horizon-bucket";
	const userPrefix = "temp123/";

	try {
		const filesList = await getAllFilesFromUser(bucketName, userPrefix); // Modify this function to return file URLs
		console.log(filesList);
		res.json(filesList);
	} catch (error) {
		console.error("Failed to get files", error);
		res.status(500).json({ error: "Failed to get files" });
	}
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
