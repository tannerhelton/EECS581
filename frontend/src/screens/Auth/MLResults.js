//This page is when the ML model calculates the results of the heart disease test.
//it will display various graphs and information to the user.

//imports
import React, { useState } from "react";
import "./css/MLResults.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

//component setup
function MLResults() {
	const [resultData, setResultData] = useState({});
	const [loading, setLoading] = useState(false);

	//api call
	const generateImage = () => {
		setLoading(true);

		fetch("/api/main")
			.then((response) => response.json())
			.then((data) => {
				setResultData(data);
			})
			.catch((error) => {
				console.error("Error fetching results:", error);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	//render
	return (
		<div className="ml-results-card">
			<h2>Your Results</h2>
			{loading ? (
				<div className="loading-section">
					<div className="loader">
						<li className="ball"></li>
						<li className="ball"></li>
						<li className="ball"></li>
					</div>
				</div>
			) : (
				!resultData.probability && (
					<button type="button" onClick={generateImage}>
						Generate
					</button>
				)
			)}
			<div className="ml-results-content">
				{resultData.probability && (
					<p>Probability of Heart Disease: {resultData.probability}%</p>
				)}
				{resultData.plots &&
					resultData.plots.map((plot, index) => (
						<div className="ml-results-image-card" key={index}>
							<img src={plot} alt={`Generated Image ${index + 1}`} />
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
