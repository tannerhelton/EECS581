/**
 * File Name: AuthHomePage.js
 * 
 * Description:
 * This component serves as the authenticated homepage for users logged into the Health Horizon AI platform.
 * It displays a welcoming message personalized with the user's email, a company logo, and a call-to-action button
 * that directs users to begin their journey. The page is styled with Material UI components to ensure a consistent
 * and engaging user interface. It also includes a dynamic greeting that recognizes the returning user, enhancing
 * the personalized experience.
 * 
 * Created by: Adam Jolles
 * Date Created: October 8, 2024
 * 
 * Revised History:
 * - No revisions made to date.
 * 
 * Preconditions:
 * - Users must be authenticated, and their authentication state must be managed and accessible via the `auth` prop.
 * - Material UI and React Router must be properly configured within the project.
 * 
 * Input Values:
 * - auth: An object containing the current user's authentication information, including their email.
 * 
 * Postconditions:
 * - Renders a personalized greeting and navigation options for authenticated users.
 * 
 * Return Values:
 * - A React component that displays the authenticated homepage with a welcome message and a navigational button.
 * 
 * Errors and Exceptions:
 * - If the `auth` prop is not properly passed or if `auth.currentUser.email` is undefined, the greeting will not display the user's email.
 * 
 * Side Effects:
 * - No significant side effects expected as the component is primarily used for displaying information based on the current authentication state.
 * 
 * Invariants:
 * - The visual layout and elements remain consistent unless explicitly modified.
 * 
 * Known Faults:
 * - Potential for displaying incorrect or outdated user information if the authentication state is not updated or managed correctly.
 */

//imports
import React from "react";
import {
	Typography,
	Grid,
	Paper,
	Container,
	Avatar,
	Button,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
//images
const logoUrl = process.env.PUBLIC_URL + "/HH_Logo.png";
const neuralUrl = process.env.PUBLIC_URL + "/neural.png";

//styling components
const StyledContainer = styled(Container)({
	padding: (theme) => theme.spacing(4),
	marginTop: (theme) => theme.spacing(4),
	textAlign: "center",
	backgroundColor: "transparent",
});

const StyledButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
	color: theme.palette.getContrastText(theme.palette.primary.main),
	backgroundColor: theme.palette.primary.main,
	borderColor: theme.palette.primary.main,
	"&:hover": {
		backgroundColor: theme.palette.primary.dark,
		borderColor: theme.palette.primary.dark,
	},
	textTransform: "none",
}));

const LogoImage = styled("img")({
	maxWidth: "30%",
	marginBottom: (theme) => theme.spacing(3),
});

const FeatureBlock = ({ icon, title, description }) => (
	<Grid item xs={12} sm={4}>
		<Avatar
			variant="rounded"
			style={{
				margin: "0 auto",
				marginBottom: "20px",
				backgroundColor: "transparent",
			}}
		>
			{icon}
		</Avatar>
		<Typography variant="h5" color="primary">
			{title}
		</Typography>
		<Typography variant="body1" style={{ color: "#FFFFFF" }}>
			{description}
		</Typography>
	</Grid>
);

//page setup with custom welcome message and navigation button
const AuthHomePage = ({ auth }) => {
	console.log(auth.currentUser);
	return (
		<StyledContainer component={Paper} elevation={0}>
			<LogoImage src={logoUrl} alt="Health Horizon AI Logo" />
			<Typography variant="h2" color="primary">
				{" "}
				{/* Changed to h2 variant for larger text and specified color */}
				Early detection, better health.
			</Typography>
			<Typography variant="h4" color="secondary">
				<br />
				Welcome back, {auth.currentUser.email}!<br />
				Take the next step.
			</Typography>
			<div className="button-container">
				<Link to="/journey" style={{ textDecoration: "none" }}>
					<StyledButton variant="contained" color="primary">
						Begin your Journey
					</StyledButton>
				</Link>
			</div>
		</StyledContainer>
	);
};

export default AuthHomePage;
