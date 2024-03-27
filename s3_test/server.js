require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { uploadUserFile } = require("./postUserFile");
const { deleteUserFile } = require("./deleteUserFile");
const { getAllFilesFromUser } = require("./getAllFilesFromUser");

const app = express();
const port = 3002;
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to upload a file
app.post("/api/upload", upload.single("file"), async (req, res) => {
	const bucketName = "health-horizon-bucket";
	const userPrefix = "temp123"; // Example userPrefix
	const { path: filePath, originalname: fileName } = req.file;

	try {
		const uploadedFileUrl = await uploadUserFile(
			bucketName,
			userPrefix,
			filePath,
			fileName
		);
		fs.unlinkSync(filePath); // Cleanup: delete the temporary file
		res
			.status(201)
			.json({ message: "File uploaded successfully", url: uploadedFileUrl });
	} catch (error) {
		console.error("Error uploading file:", error);
		res.status(500).json({ message: "Failed to upload the file" });
	}
});

// Endpoint to delete a file
app.delete("/api/files/:fileName", async (req, res) => {
	const bucketName = "health-horizon-bucket";
	const userPrefix = "temp123"; // Example userPrefix
	const fileName = req.params.fileName;

	try {
		const resultMessage = await deleteUserFile(
			bucketName,
			userPrefix,
			fileName
		);
		res.json({ message: resultMessage });
	} catch (error) {
		console.error("Error deleting file:", error);
		res.status(500).json({ message: "Failed to delete the file" });
	}
});

// Endpoint to list files for a specific user
app.get("/api/files", async (req, res) => {
	const bucketName = "health-horizon-bucket";
	const userPrefix = "temp123"; // Example userPrefix

	try {
		const filesList = await getAllFilesFromUser(bucketName, userPrefix);
		res.json(filesList);
	} catch (error) {
		console.error("Failed to get files", error);
		res.status(500).json({ error: "Failed to get files" });
	}
});

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
