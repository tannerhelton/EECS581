// This file is the main page for the user to select which test they would like to take.
//it ccontains navigation buttons to go to each test.

//imports
import React from "react";
import { Link } from "react-router-dom";
import "./css/Journey.css";
import { Typography, Grid, Paper, Container, Avatar } from "@mui/material";
import { styled } from "@mui/system";

//images
const heartDiseaseUrl = process.env.PUBLIC_URL + "/heart.png";
const cancerUrl = process.env.PUBLIC_URL + "/cancer.png";
const diabetesUrl = process.env.PUBLIC_URL + "/diabetes.png";

//styling components
const BlocksContainer = styled(Container)(({ theme }) => ({
	padding: "20px",
	marginTop: theme.spacing(15),
	marginBottom: theme.spacing(5),
	textAlign: "center",
	backgroundColor: "transparent",
	width: "30%",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#2c3e50",
	boxShadow: theme.shadows[5],
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "center",
	height: "fit-content",
	color: "white",
}));

const FeatureBlock = ({ imageUrl, title, linkUrl }) => (
	<Grid item xs={12} sm={6}>
		<Link to={linkUrl} style={{ textDecoration: "none" }}>
			<Avatar
				sx={{ width: 75, height: 75 }}
				variant="square"
				style={{
					margin: "0 auto",
					marginBottom: "8px",
					backgroundColor: "transparent",
				}}
			>
				<img
					src={imageUrl}
					alt={title}
					className="white-image"
					style={{ maxWidth: "100%" }}
				/>
			</Avatar>
			<Typography variant="h5" color="primary">
				{title}
			</Typography>
		</Link>
	</Grid>
);

//main page component
function HealthOptions() {
	return (
		<div className="journey-container">
			<h2>Which test would you like to take?</h2>
			<BlocksContainer>
				<Grid container spacing={6}>
					<FeatureBlock
						imageUrl={heartDiseaseUrl}
						title="Heart Disease"
						linkUrl="/questionnaire"
					/>
					<FeatureBlock imageUrl={cancerUrl} title="Cancer" linkUrl="/upload" />
					{/* <FeatureBlock imageUrl={diabetesUrl} title="Diabetes" /> */}
				</Grid>
			</BlocksContainer>
		</div>
	);
}

export default HealthOptions;
