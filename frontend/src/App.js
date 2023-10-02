// Import necessary modules from React and React Router
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

// Import Firebase app and auth modules
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import custom components and screens
import AppToolbar from "./components/AppToolbar";
import HomePage from "./screens/UnAuth/HomePage";
import AuthHomePage from "./screens/Auth/AuthHomePage";
import LoginPage from "./screens/UnAuth/LoginPage";
import ChatbotPage from "./screens/Auth/ChatbotPage";
import ProfilePage from "./screens/Auth/ProfilePage";
import AboutPage from "./screens/UnAuth/AboutPage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase app
const fb = initializeApp(firebaseConfig);

// Get Firebase auth instance
const auth = getAuth(fb);
const db = getFirestore(fb);

// Main App component
function App() {
  // State to hold the current user
  const [user, setUser] = useState(null);

  // Effect to listen for auth state changes
  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    // Cleanup: Unsubscribe from auth state changes
    return () => unsubscribe();
  }, []);

  // Render the app
  return (
    <Router>
      {/* Toolbar component */}
      <AppToolbar user={user} />
      {/* Define application routes */}
      <Routes>
        {/* Home route */}
        <Route path="/" element={user ? <AuthHomePage /> : <HomePage />} />
        {/* Login route */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        {/* About route */}
        <Route path="/about" element={<AboutPage />} />
        {/* Profile route */}
        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage auth={auth} db={db} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Chatbot route */}
        <Route
          path="/chatbot"
          element={user ? <ChatbotPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

// Export the App component
export default App;
