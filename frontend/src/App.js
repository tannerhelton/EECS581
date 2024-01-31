// React and React Router imports
import React, { useState, useEffect } from "react"; // Importing React hooks
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom"; // Importing components for routing

// MUI (Material-UI) imports for theming
import { ThemeProvider } from "@mui/material/styles"; // Provides a theme to MUI components
import theme from "./theme"; // Custom theme settings for MUI

// Firebase imports and initialization
import { auth, db, appCheck, analytics } from "./firebaseConfig"; // Importing Firebase services
import { logEvent } from "firebase/analytics"; // Importing Firebase analytics
import { onAuthStateChanged } from "firebase/auth"; // Listener for authentication state changes

// Custom component imports
import AppToolbar from "./components/AppToolbar"; // Top navigation bar
// Importing various screens for routing
import {
	HomePage,
	AuthHomePage,
	LoginPage,
	ChatbotPage,
	ProfilePage,
	AboutPage,
	MLResults,
	Questionnaire,
	ContactUsPage,
	ThankYouPage,
	UploadPage,
} from "./screens";

// Unauthenticated screens for sign-up and password reset
import SignUpPage from "./screens/UnAuth/SignUpPage";
import ForgotPasswordPage from "./screens/UnAuth/ForgotPasswordPage";
import HealthOptions from "./screens/Auth/Journey";

// Helper function to render routes that require authentication
function renderPrivateRoute(element) {
	return auth.currentUser ? element : <Navigate to="/login" />;
}

function App() {
	const [user, setUser] = useState(null); // State to keep track of the current user

	// Effect hook to subscribe to auth state changes and perform app check
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, setUser); // Listening for auth changes
		console.log("App Check:", appCheck); // Logging app check status
		logEvent(analytics, "app_check", { status: appCheck }); // Logging app check status to analytics
		return unsubscribe; // Cleanup subscription on component unmount
	}, []);

	// Main component rendering the app with routes and theme
	return (
		<ThemeProvider theme={theme}>
			{" "}
			<Router>
				<AppToolbar user={user} />
				<Routes>
					<Route
						path="/"
						element={user ? <AuthHomePage auth={auth} db={db} /> : <HomePage />} // Home route with conditional rendering based on auth
					/>
					<Route
						path="/login"
						element={!user ? <LoginPage /> : <Navigate to="/" />} // Redirects to home if already logged in
					/>
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contactus" element={<ContactUsPage />} />
					<Route path="/thank-you" element={<ThankYouPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/forgotpassword" element={<ForgotPasswordPage />} />
					<Route path="/journey" element={<HealthOptions />} />
					<Route
						path="/profile"
						element={renderPrivateRoute(<ProfilePage auth={auth} db={db} />)} // Private route for profile page
					/>
					<Route
						path="/chatbot"
						element={renderPrivateRoute(<ChatbotPage />)} // Private route for chatbot page
					/>
					<Route
						path="/upload"
						element={renderPrivateRoute(<UploadPage />)} // Private route for image upload page
					/>
					<Route
						path="/questionnaire"
						element={renderPrivateRoute(<Questionnaire db={db} />)} // Private route for questionnaire page
					/>
					<Route
						path="/matplotlib-results"
						element={renderPrivateRoute(<MLResults />)} // Private route for displaying ML results
					/>
					<Route
						path="/journey"
						element={renderPrivateRoute(<MLResults />)} // Private route for displaying ML results
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App; // Exporting the App component for use in index.js
