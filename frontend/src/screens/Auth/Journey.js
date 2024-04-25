/**
 * File Name: Journey.js
 * 
 * Description:
 * This component serves as the main navigation page where users can select which health test they 
 * wish to take, such as for heart disease, cancer, or diabetes. It features a grid of navigation 
 * buttons, each representing a different health test. The design utilizes Material UI components 
 * and custom styling for a clean and accessible user interface, allowing users to easily choose 
 * and navigate to the desired test.
 * 
 * Created by: Thomas Gansner
 * Date Created: October 8, 2024
 * 
 * Revised History:
 * - None.
 * 
 * Preconditions:
 * - Users must be authenticated, and their authentication state must be managed and accessible via the `auth` prop.
 * - Material UI and React Router must be properly configured within the project.
 * 
 * Input Values:
 * - None.
 * 
 * Postconditions:
 * - The Journey page will display a grid of health test options for users to choose from.
 * 
 * Return Values:
 * - A React component that displays the Journey page.
 * 
 * Errors and Exceptions:
 * - None implemented.
 * 
 * Side Effects:
 * - None.
 * 
 * Invariants:
 * - The visual layout and elements remain consistent unless explicitly modified.
 * 
 * Known Faults:
 * - None.
 */

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
