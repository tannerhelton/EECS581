// React and React Router imports
import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";

// MUI imports
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

// Firebase imports and initialization
import { auth, db } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Custom component imports
import AppToolbar from "./components/AppToolbar";
import {
	HomePage,
	AuthHomePage,
	LoginPage,
	ChatbotPage,
	ProfilePage,
	AboutPage,
	MLResults,
	Questionnaire,
} from "./screens";

function renderPrivateRoute(element) {
	return auth.currentUser ? element : <Navigate to="/login" />;
}

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, setUser);
		return unsubscribe;
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<AppToolbar user={user} />
				<Routes>
					<Route
						path="/"
						element={user ? <AuthHomePage auth={auth} db={db} /> : <HomePage />}
					/>
					<Route
						path="/login"
						element={!user ? <LoginPage /> : <Navigate to="/" />}
					/>
					<Route path="/about" element={<AboutPage />} />
					<Route
						path="/profile"
						element={renderPrivateRoute(<ProfilePage auth={auth} db={db} />)}
					/>
					<Route
						path="/chatbot"
						element={renderPrivateRoute(<ChatbotPage />)}
					/>
					<Route
						path="/questionnaire"
						element={renderPrivateRoute(<Questionnaire db={db} />)}
					/>
					<Route
						path="/matplotlib-results"
						element={renderPrivateRoute(<MLResults />)}
					/>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;
