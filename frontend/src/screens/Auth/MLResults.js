import React from "react";
import "./css/MLResults.css"; // Create a CSS file for styling
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function MLResults() {
	// Replace this with your actual Matplotlib results data
	const matplotlibResults = "You have cancer";

	return (
		<div className="ml-results-card">
			<h2>Matplotlib Results</h2>
			<div className="ml-results-content">{matplotlibResults}</div>
			<Link to="/profile" className="back-to-profile">
				<ArrowBackIosNewIcon />
			</Link>
		</div>
	);
}

export default MLResults;
