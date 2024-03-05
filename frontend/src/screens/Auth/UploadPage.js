// This file contains the Upload page, which is a screen that allows users to upload images of skin conditions for diagnosis by ML model.
//The user can upload images, view previously uploaded images, delete them, and view the results of the diagnosis.
//The page is divided into three sections: the image uploader, the upload results, and the image storage.
//Results include the diagnosis as a graph and a description of the condition, and its likelihood.

//imports
import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import "./css/UploadPage.css"; // Ensure the path is correct based on your project structure
import ImagesDisplay from "../../components/ImagesDisplay"; // Adjust the import path as necessary

// UploadPage component
const UploadPage = () => {
	// State to trigger re-render of ImagesDisplay component after file upload
	const [imageListVersion, setImageListVersion] = useState(0);

	const uploadFile = (event) => {
		event.preventDefault();
		const fileInput = document.getElementById("file");
		if (!fileInput.files[0] || fileInput.files[0].size > 50 * 1024 * 1024) {
			alert("File is too big or not selected!");
			return;
		}
		const formData = new FormData();
		formData.append("file", fileInput.files[0]);

		// Create a new XMLHttpRequest
		const request = new XMLHttpRequest();
		request.upload.addEventListener("progress", (event) => {
			if (event.lengthComputable) {
				const percent = (event.loaded / event.total) * 100;
				document.getElementById(
					"progressNumber"
				).innerText = `${percent.toFixed(2)}%`;
			}
		});

		// Handle the server response after the file is uploaded
		request.addEventListener("load", () => {
			setImageListVersion((prevVersion) => prevVersion + 1); // Trigger ImagesDisplay update
			document.getElementById("progressNumber").innerText = "Upload Complete!";
			document.getElementById("uploadResults").innerText = request.response;
		});

		// Handle any errors that occur during the upload
		request.addEventListener("error", () => alert("Error uploading file!"));
		request.open("POST", "http://localhost:3001/api/upload"); // Adjust the URL/port as necessary
		request.send(formData);
	};

	// Return html for the UploadPage component
	return (
		<>
			<div id="chatbotCard">
				<Typography variant="h3">
					<b>Image Uploader</b>
				</Typography>
				<Typography variant="body1">
					Upload an image of a rash, mole, or other skin condition to receive a
					diagnosis powered by artificial intelligence.
				</Typography>
				<Typography variant="body1">Upload limit: 50MB</Typography>
				<br />
				<input type="file" id="file" name="file" style={{ color: "white" }} />
				<Button variant="contained" color="primary" onClick={uploadFile}>
					Upload!
				</Button>
				<div id="data">
					<div id="progressNumber">ready...</div>
				</div>
			</div>
			<div id="uploadResultsCard">
				<div id="uploadResultsPre">
					Results will appear shortly after your image is uploaded.
				</div>
				<div id="uploadResults"></div>
			</div>
			<div id="imageStorageCard">
				<div id="imageStoragePre">
					Your previous uploads will be stored here. To improve accuracy, our
					model will use them to track how your skin changes over time.
					<ImagesDisplay key={imageListVersion} />
				</div>
				<div id="storageContainer"></div>
			</div>
		</>
	);
};

export default UploadPage;
