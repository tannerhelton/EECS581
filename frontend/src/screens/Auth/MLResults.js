import React, { useState } from "react";
import "./css/MLResults.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function MLResults() {
	const [imageData, setImageData] = useState([]);
	const [textResult, setTextResult] = useState("");
	const [buttonClicked, setButtonClicked] = useState(false);

	const generateImage = () => {
		// Fetch image data
		fetch("/api/generate-plot")
			.then((response) => response.text())
			.then((dataUrl) => {
				setImageData((prevImageData) => [...prevImageData, dataUrl]);
			})
			.catch((error) => {
				console.error("Error generating image:", error);
			});

		// Fetch text result
		fetch("/api/text-results")
			.then((response) => response.text())
			.then((result) => {
				setTextResult(result);
			})
			.catch((error) => {
				console.error("Error fetching text results:", error);
			});

		// Set the buttonClicked state to true
		setButtonClicked(true);
	};

	return (
		<div className="ml-results-card">
			<h2>Your Results</h2>
			{buttonClicked ? (
				<p></p>
			) : (
				<button type="button" onClick={generateImage}>
					Generate
				</button>
			)}
			<div className="ml-results-content">
				{textResult && <p>{textResult}</p>}
				{imageData.map((image, index) => (
					<div className="ml-results-image-card" key={index}>
						<img src={image} alt={`Generated Image ${index + 1}`} />
					</div>
				))}
			</div>
			<Link to="/" className="back-to-profile">
				<ArrowBackIosNewIcon />
			</Link>
		</div>
	);
}

export default MLResults;
