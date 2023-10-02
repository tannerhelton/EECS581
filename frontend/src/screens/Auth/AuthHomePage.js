// Importing the required components and modules
import React from "react";
import { Typography } from "@mui/material";

// HomePage component definition
const HomePage = () => {
  return (
    // Main div container
    <div>
      {/* Display a welcome message using Typography with "h1" variant */}
      <Typography variant="h1">
        Welcome to Health Horizon AI, you have been authenticated
      </Typography>
    </div>
  );
};

// Export the HomePage component for use in other parts of the app
export default HomePage;
