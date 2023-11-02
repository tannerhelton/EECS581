import React, { useState, useEffect } from "react";
import "./css/MLResults.css"; // Create a CSS file for styling
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function MLResults() {
	const [matplotlibResults, setMatplotlibResults] = useState([]);

	// Make an API request to your Python server to fetch the PNG images
	useEffect(() => {
		fetch("/api/matplotlib-results") // Replace with your API endpoint
			.then((response) => response.json())
			.then((data) => {
				setMatplotlibResults(data);
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	}, []);

	return (
		<div className="ml-results-card">
			<h2>Matplotlib Results</h2>
			<div className="ml-results-content">
				{matplotlibResults.map((result, index) => (
					<img key={index} src={result} alt={`Matplotlib Result ${index}`} />
				))}
			</div>
			<Link to="/profile" className="back-to-profile">
				<ArrowBackIosNewIcon />
			</Link>
		</div>
	);
}

export default MLResults;
