import React, { useState } from "react";
import { Button, TextField, Typography, Paper, Container, Box } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

// StyledContainer: Custom styled container for the contact form
const StyledContainer = styled(Container)({
  maxWidth: '400px',
  padding: '20px',
  marginTop: '20vh',
  textAlign: "center",
  backgroundColor: '#2c3e50',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '20px',
  color: 'white', // Adjust text color as needed
});

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
