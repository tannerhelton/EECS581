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
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import custom components and screens
import AppToolbar from "./components/AppToolbar";
import HomePage from "./screens/HomePage";
import AuthHomePage from "./screens/AuthHomePage";
import LoginPage from "./screens/LoginPage";
import ChatbotPage from "./screens/ChatbotPage";

// Firebase configuration object
const firebaseConfig = {
  // ... (your Firebase config here)
};

// Initialize Firebase app
const fb = initializeApp(firebaseConfig);

// Get Firebase auth instance
const auth = getAuth(fb);

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
