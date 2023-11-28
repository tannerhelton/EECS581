import React, { useState } from "react";
import "./css/MLResults.css";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function MLResults() {
	const [resultData, setResultData] = useState({});
	const [loading, setLoading] = useState(false);

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

	return (
		<div className="ml-results-card">
			<h2>Your Results</h2>

			{loading ? (
				<p>Loading results...</p>
			) : (
				<button type="button" onClick={generateImage}>
					Generate
				</button>
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
