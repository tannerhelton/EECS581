/**
 * File Name: UploadPage.js
 * 
 * Description:
 * This component facilitates the upload of skin condition images for analysis by a machine learning model. 
 * Users can upload images, view, and delete previously uploaded images, and check the results of the analysis. 
 * The page consists of three sections: an image uploader, the display of upload results including diagnosis 
 * and probability graphs, and a storage area for past images. Results include visual representations like 
 * heatmaps and superimposed images to provide insights into the model's diagnosis process.
 * 
 * Created by: Thomas Gansner
 * Date Created: October 24, 2024
 * 
 * Revised History:
 * - Adam Jolles - Styling and interactivity enhancements on March 27, 2024
 * 
 * Preconditions:
 * - Users must be authenticated, and their authentication state must be managed and accessible via the `auth` prop.
 * - Material UI and React Router must be properly configured within the project.
 * 
 * Input Values:
 * - None.
 * 
 * Postconditions:
 * - The UploadPage component will display the image uploader, upload results, and image storage sections, as well as display the results of the machine learning model analysis.
 * 
 * Return Values:
 * - A React component that displays the UploadPage.
 * 
 * Errors and Exceptions:
 * - If the user's image fails to upload or the prediction fails to fetch, an error message will be displayed to the user.
 * 
 * Side Effects:
 * - None
 * 
 * Invariants:
 * - The visual layout and elements remain consistent unless explicitly modified.
 * 
 * Known Faults:
 * - None.
 */

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
				if (data.text) {
					setPredictionResult(data.text);
				}
			})
			.catch((error) => {
				alert("Error fetching prediction!");
				console.error("Prediction error:", error);
			});
	};

	const [showImages, setShowImages] = useState(false); // State to toggle image display
	const toggleImagesDisplay = () => {
		setShowImages(!showImages);
	};
	useEffect(() => {
		const zoomImage = document.querySelector(".hover-zoom");
		if (zoomImage) {
			zoomImage.addEventListener("click", function () {
				this.classList.toggle("enlarged");
			});
		}

		// Return a cleanup function to remove the event listener when the component unmounts
		return () => {
			if (zoomImage) {
				zoomImage.removeEventListener("click", function () {
					this.classList.toggle("enlarged");
				});
			}
		};
	}, []); // Empty dependency array means this runs once on mount

	const [isEnlarged, setIsEnlarged] = useState(false);

	// Toggle function
	const toggleEnlarge = () => setIsEnlarged(!isEnlarged);

	// Adjusted closeImage function to use state
	const closeImage = () => setIsEnlarged(false);

	return (
		<>
			<div id="chatbotCard">
				<div className="upload-title">
					<Typography variant="h3">
						<b>Image Uploader</b>
					</Typography>
				</div>

				<Typography variant="body1">
					Upload an image of a rash, mole, or other skin condition to receive a
					diagnosis powered by artificial intelligence.
				</Typography>
				<br />
				<input type="file" id="file" name="file" style={{ display: "none" }} />
				<div className="upload-btn">
					<label htmlFor="file" className="custom-file-upload">
						SELECT AN IMAGE
					</label>
					<p className="upload-detail">Upload limit: 50MB</p>
				</div>
				<Button variant="contained" color="primary" onClick={uploadFile}>
					Upload!
				</Button>
				<div className="disclaimer">
					The Early Detection System is for informational purposes only and not
					a substitute for professional medical advice, diagnosis, or treatment.
					Always consult with a healthcare professional for any health concerns
					or before making any medical decisions.
				</div>
				<div id="data">
					<div id="progressNumber"></div>
				</div>
			</div>
			<div id="uploadResultsCard">
				<div id="uploadResultsPre">
					Results will appear shortly after your image is uploaded.
				</div>
				<div id="uploadResults">
					{superimposedImage && (
						<div className="imageResultsCard">
							<p>Saliency Map:</p>
							<img
								src={superimposedImage}
								alt="Superimposed Visualization"
								className={`resultImage ${isEnlarged ? "enlarged" : ""}`}
								style={{ margin: "10px" }}
								onClick={toggleEnlarge}
							/>
							{isEnlarged && (
								<div className="close-icon" onClick={closeImage}>
									&#10006;
								</div>
							)}
						</div>
					)}
					{predictionResult && <p>Prediction Result: {predictionResult}</p>}
					{heatmapImage && (
						<div className="imageResultsCard">
							<p>Heat Map:</p>
							<img
								src={heatmapImage}
								alt="Heatmap Visualization"
								className="resultImage"
								style={{ margin: "10px" }}
							/>
						</div>
					)}
				</div>
			</div>
			<div id="imageStorageCard">
				<div id="imageStoragePre">
					<h2 className="previous-uploads">Previous Uploads</h2>
					<p>
						To improve accuracy, our model will use them to track how your skin
						changes over time.
					</p>
				</div>
				<br></br>
				<Button variant="contained" onClick={toggleImagesDisplay}>
					{showImages ? "Hide Images" : "Show Images"}
				</Button>
				{showImages && <ImagesDisplay key={imageListVersion} />}
			</div>
		</>
	);
};

export default UploadPage;
