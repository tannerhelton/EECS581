import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import AppToolbar from "./components/AppToolbar";

import HomePage from "./screens/HomePage";
import AuthHomePage from "./screens/AuthHomePage";
import LoginPage from "./screens/LoginPage";
import ChatbotPage from "./screens/ChatbotPage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  measurementId: process.env.REACT_APP_FIRENASE_MEASUREMENT_ID,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const fb = initializeApp(firebaseConfig);

const auth = getAuth(fb);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <AppToolbar user={user} />
      <Routes>
        <Route path="/" element={user ? <AuthHomePage /> : <HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/chatbot"
          element={user ? <ChatbotPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
