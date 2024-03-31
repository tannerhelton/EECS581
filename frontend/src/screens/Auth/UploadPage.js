// This file contains the Upload page, which is a screen that allows users to upload images of skin conditions for diagnosis by ML model.
//The user can upload images, view previously uploaded images, delete them, and view the results of the diagnosis.
//The page is divided into three sections: the image uploader, the upload results, and the image storage.
//Results include the diagnosis as a graph and a description of the condition, and its likelihood.

//imports
import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import "./css/UploadPage.css";
import ImagesDisplay from "../../components/ImagesDisplay";

const UploadPage = () => {
	const [imageListVersion, setImageListVersion] = useState(0);
	const [fileIdentifier, setFileIdentifier] = useState(""); // State to store the file identifier
	const [predictionResult, setPredictionResult] = useState("");
	const [heatmapImage, setHeatmapImage] = useState("");
	const [superimposedImage, setSuperimposedImage] = useState("");

	const uploadFile = (event) => {
		event.preventDefault();
		const fileInput = document.getElementById("file");
		if (!fileInput.files[0] || fileInput.files[0].size > 50 * 1024 * 1024) {
			alert("File is too big or not selected!");
			return;
		}
		const formData = new FormData();
		formData.append("file", fileInput.files[0]);

		const uploadRequest = new XMLHttpRequest();
		uploadRequest.upload.addEventListener("progress", (event) => {
			if (event.lengthComputable) {
				const percent = (event.loaded / event.total) * 100;
				document.getElementById(
					"progressNumber"
				).innerText = `${percent.toFixed(2)}%`;
			}
		});

		uploadRequest.addEventListener("load", () => {
			setImageListVersion((prevVersion) => prevVersion + 1);
			document.getElementById("progressNumber").innerText = "Upload Complete!";
			const response = JSON.parse(uploadRequest.response);
			console.log(response);
			// Assuming the response contains a property "fileIdentifier"

			setFileIdentifier(response.url); // Save the file identifier for later use
		});

		uploadRequest.addEventListener("error", () =>
			alert("Error uploading file!")
		);
		uploadRequest.open("POST", "http://localhost:3002/api/upload");
		uploadRequest.send(formData);
	};

	useEffect(() => {
		console.log(fileIdentifier);
		// Fetch prediction only if fileIdentifier is set
		if (fileIdentifier) {
			fetchPrediction(fileIdentifier);
		}
	}, [fileIdentifier]); // Dependency array ensures this runs only when fileIdentifier changes

	const fetchPrediction = (identifier) => {
		console.log("Fetching prediction for identifier:", identifier);
		fetch("/api/predict", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ fileIdentifier: identifier }),
		})
			.then((response) => response.json())
			.then((data) => {
				// Assuming the response structure is as mentioned and correct
				setHeatmapImage(`data:image/jpeg;base64,${data.prediction.heatmap}`);
				setSuperimposedImage(
					`data:image/jpeg;base64,${data.prediction.superimposed_img}`
				);
			})
			.catch((error) => {
				alert("Error fetching prediction!");
				console.error("Prediction error:", error);
			});
	};

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
				<input type="file" id="file" name="file" style={{ display: "none" }} />
				<label htmlFor="file" className="custom-file-upload">
					SELECT AN IMAGE
				</label>
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
				<div id="uploadResults">
					{heatmapImage && (
						<img
							src={heatmapImage}
							alt="Heatmap Visualization"
							style={{ margin: "10px" }}
						/>
					)}
					{superimposedImage && (
						<img
							src={superimposedImage}
							alt="Superimposed Visualization"
							style={{ margin: "10px" }}
						/>
					)}
				</div>
				<div>
					The Early Detection System is for informational purposes only and not
					a substitute for professional medical advice, diagnosis, or treatment.
					Always consult with a healthcare professional for any health concerns
					or before making any medical decisions.
				</div>
			</div>
			<div id="imageStorageCard">
				<div id="imageStoragePre">
					Your previous uploads will be stored here. To improve accuracy, our
					model will use them to track how your skin changes over time.
				</div>
				<br></br>
				<ImagesDisplay key={imageListVersion} />
			</div>
		</>
	);
};

export default UploadPage;
