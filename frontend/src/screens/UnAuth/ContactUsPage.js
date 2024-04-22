/**
 * File Name: ContactPage.js
 * 
 * Description:
 * This file defines the ContactPage component for the application. It includes a form for users to submit their contact details,
 * including name, email, and a message. This page utilizes Material UI components for styling and React Router for navigation.
 * The form submission logic is handled using React hooks.
 * 
 * Created by: Adam Jolles
 * Date Created: December 4, 2023
 * 
 * Revised History:
 * - January 15, 2024 - Sloan Stubler enhanced styling and interactivity.
 * 
 * Preconditions:
 * - Material UI and React Router must be installed.
 * - The environment for React state management and hooks (useState, useNavigate) should be properly configured.
 * 
 * Input Values:
 * - Name: String input for the user's name.
 * - Email: String input that should be a valid email format.
 * - Message: String input for the user's message, accepts multiline text.
 * 
 * Postconditions:
 * - Renders a contact form on the page that users can interact with.
 * 
 * Return Values:
 * - A React component that displays a styled contact form.
 * 
 * Errors and Exceptions:
 * - Form submission may fail if backend API or server issues occur.
 * - Navigation errors can happen if the route specified in navigate() does not exist.
 * 
 * Side Effects:
 * - Submission of the form triggers a state update and potential navigation.
 * 
 * Invariants:
 * - The structure of the form and its handlers are constant unless explicitly changed in the code.
 * 
 * Known Faults:
 * - No error handling is currently implemented for the form submission process.
 */

//imports
import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Container, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// StyledContainer: Custom styled container for the login page
const StyledContainer = styled(Container)(({ theme }) => ({
  width: 'fit-content',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 'fit-content',
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(5),
  textAlign: 'center',
  backgroundColor: '#2c3e50',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  color: 'white',
}));

// primaryLabelStyle: Style object for primary label colors in text fields
const primaryLabelStyle = {
  color: '#6195CB' // Or any other color from your theme
};

// primaryBorderStyle: Style object for border colors in text fields
const primaryBorderStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white', // Adjust border color as needed
    },
    '&:hover fieldset': {
      borderColor: 'white', // Adjust hover border color as needed
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white', // Adjust focused border color as needed
    },
  },
};

// ContactPage: Functional component for the contact page
const ContactPage = () => {
    // State for managing form input data
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  // Hook for navigation
  const navigate = useNavigate();

  // handleChange: Function to update state based on form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // handleSubmit: Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process the form submission here. For example, send the data to an API or your backend server.
    console.log(contactForm);
    navigate("/thank-you"); // Redirect to a thank you page or handle the submission confirmation as needed.
  };

  // JSX for rendering the contact form
  return (
    <StyledContainer component={Paper} elevation={0}>
      <Typography variant="h4" color="primary" gutterBottom>
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={contactForm.name}
          onChange={handleChange}
          style={{ marginBottom: '10px' }}
          InputLabelProps={{ style: primaryLabelStyle }}
          InputProps={{ style: primaryLabelStyle }}
          sx={primaryBorderStyle}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          value={contactForm.email}
          onChange={handleChange}
          style={{ marginBottom: '10px' }}
          InputLabelProps={{ style: primaryLabelStyle }}
          InputProps={{ style: primaryLabelStyle }}
          sx={primaryBorderStyle}
        />
        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          name="message"
          value={contactForm.message}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{ style: primaryLabelStyle }}
          InputProps={{ style: primaryLabelStyle }}
          sx={primaryBorderStyle}
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Send Message
        </Button>
      </form>
    </StyledContainer>
  );
};

export default ContactPage;
