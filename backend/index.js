// Entry point

// Create an express app
const express = require("express");
const app = express();
const port = 3000;

// Import the routes
const routes = require("./routes");

// Use the routes
app.use("/", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
