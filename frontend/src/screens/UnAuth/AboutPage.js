//This page is the About page, which provides information about the Health Horizon AI team and the services they provide.

//imports
import React from "react";
import { Link } from "react-router-dom";
// Importing various Material UI components for UI design
import { Typography, Grid, Paper, Container, Avatar, Button } from "@mui/material";
import { styled } from "@mui/system";

// URL constants for images used in the application
const logoUrl = process.env.PUBLIC_URL + "/HH_logo.png";
const heartDiseaseUrl = process.env.PUBLIC_URL + "/heart.png";
const cancerUrl = process.env.PUBLIC_URL + "/cancer.png";
const diabetesUrl = process.env.PUBLIC_URL + "/diabetes.png";
const public_url = process.env.PUBLIC_URL;
const tannerURL = process.env.PUBLIC_URL + "/tanner.jpg";
const chrisURL = process.env.PUBLIC_URL + "/chris.jpg";
const adamURL = process.env.PUBLIC_URL + "/adam.jpg";
const sloanURL = process.env.PUBLIC_URL + "/sloan.jpg";
const compliancePDFUrl = process.env.PUBLIC_URL + "/Legal_and_Compliance_Framework.pdf";
const userManualPDFUrl = process.env.PUBLIC_URL + "/User_Manual_And_FAQ.pdf";


// LogoImage: Styled component for displaying logos
const LogoImage = styled("img")({
	maxWidth: "30%",
	marginBottom: (theme) => theme.spacing(3),
});

// InnerWrapper: A styled div for additional styling and layout
const InnerWrapper = styled("div")({
	paddingBottom: "200px",
});

// StyledContainer: Custom styled container for the about page
const StyledContainer = styled(Container)(({ theme }) => ({
	padding: (theme) => theme.spacing(4),
	marginTop: theme.spacing(15),
	marginBottom: theme.spacing(5),
	textAlign: "center",
	backgroundColor: "transparent",
}));

// BlocksContainer: A styled container for arranging feature blocks
const BlocksContainer = styled(Container)(({ theme }) => ({
	padding: "20px",
	marginTop: theme.spacing(15),
	marginBottom: theme.spacing(5),
	textAlign: "center",
	backgroundColor: "transparent",
	width: "50%",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "#2c3e50",
	boxShadow: theme.shadows[5],
	flexDirection: "column",
	justifyContent: "space-between",
	alignItems: "center",
	height: "fit-content",
	color: "white",
}));

// FeatureBlock: A functional component representing a single feature block
// It takes imageUrl, title, and description as props
const FeatureBlock = ({ imageUrl, title, description, linkUrl }) => (
	<Grid item xs={12} sm={4}>
		<Link to={linkUrl} style={{ textDecoration: "none" }}>
			<Avatar
				sx={{ width: 75, height: 75 }}
				variant="square"
				style={{
					width: "100px",
					height: "100px",
					margin: "0 auto",
					marginBottom: "8px",
					backgroundColor: "transparent",
					objectFit: 'cover'
				}}
			>
				<img src={imageUrl} alt={title} style={{ maxWidth: "100%" }} />
			</Avatar>
			<Typography variant="h5" color="primary">
				{title}
			</Typography>
			<Typography variant="body1" style={{ color: "#FFFFFF" }}>
				{description}
			</Typography>
		</Link>
	</Grid>
);

// AboutPage: The main component for the about page
const AboutPage = () => {
	return (
		<>
			{/* About HHai */}
			<StyledContainer component={Paper} elevation={0}>
				<Typography variant="h2" color="primary">
					About Health Horizon AI
				</Typography>
				<Typography variant="h6" color="primary" style={{ marginTop: "20px" }}>
					At Health Horizon AI, we are dedicated to leveraging the power of
					machine learning to advance healthcare. Our mission is to pioneer
					early detection technologies for various medical conditions, including
					heart disease, cancer, diabetes, and more.
				</Typography>

				{/* Link to the Compliance Document PDF */}
                <Button
                    variant="contained"
                    color="primary"
                    href={compliancePDFUrl}
                    target="_blank"
                    style={{ marginTop: "20px" }}
                >
                    View Our Compliance Document
                </Button>

				<br></br>

				{/* Link to the User Manual and FAQ PDF */}
                <Button
                    variant="contained"
                    color="primary"
                    href={userManualPDFUrl}
                    target="_blank"
                    style={{ marginTop: "20px" }}
                >
                    View Our User Manual and FAQ Document
                </Button>
			</StyledContainer>

			

			<BlocksContainer>
				{/* Showing what our models are capable of */}
				<Grid container spacing={6}>
					<FeatureBlock
						imageUrl={heartDiseaseUrl}
						title="Heart Disease"
						description="We leverage a K-nearest neighbors (KNN) algorithm to detect early heart disease in patients."
						linkUrl="/questionnaire"
					/>
					<FeatureBlock
						imageUrl={cancerUrl}
						title="Cancer"
						description="Our neural networks are meticulously trained to accurately detect cancer symptoms."
						linkUrl="/upload"
					/>
					<FeatureBlock
						imageUrl={diabetesUrl}
						title="Diabetes"
						description="Our trained data models and sophisticated AI algorithms allow us to create catered medical plans for diabetic patients."
					/>
				</Grid>
			</BlocksContainer>

			<StyledContainer component={Paper} elevation={0}>
				{/* More about us */}
				<Typography variant="h2" color="primary">
					Meet Our Team
				</Typography>
				<Typography variant="h6" color="primary" style={{ marginTop: "20px" }}>
					Health Horizon AI is a team of passionate students from the University
					of Kansas. We are a group of aspiring computer scientists who are
					dedicated to building a fast, efficient, accurate, and elegant
					solution for patient healthcare needs.
				</Typography>
				{/* Read about each developer */}
				<Grid
					container
					spacing={6}
					style={{ marginTop: "20px", marginBottom: "40px" }}
				>
					<FeatureBlock
						imageUrl={tannerURL}
						title="Tanner Helton"
						description="We leverage a K-nearest neighbors (KNN) algorithm to detect early heart disease in patients."
					/>
					<FeatureBlock
						imageUrl={chrisURL}
						title="Chris Stillman"
						description="Our neural networks are meticulously trained to accurately detect cancer symptoms."
					/>
					<FeatureBlock
						imageUrl={adamURL}
						title="Adam Jolles"
						description="Our trained data models and sophisticated AI algorithms allow us to create catered medical plans for diabetic patients."
					/>
					<FeatureBlock
						imageUrl={public_url + "/default-user-icon.png"}
						title="Thomas Gansner"
						description="Our trained data models and sophisticated AI algorithms allow us to create catered medical plans for diabetic patients."
					/>
					<FeatureBlock
						imageUrl={sloanURL}
						title="Sloan Stubler"
						description="We've created a simple and elegant website for our patients to use. We hope your experience using our services is easy and painless."
					/>
				</Grid>
				<hr></hr>
				{/* contact info */}
				<Typography
					variant="h6"
					color="primary"
					style={{ marginTop: "20px", marginBottom: "-20px", fontSize: "18px" }}
				>
					Feel like something could be better? Contact us!
				</Typography>
			</StyledContainer>
		</>
	);
};

export default AboutPage;
