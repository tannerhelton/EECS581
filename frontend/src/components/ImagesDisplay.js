/**
 * This script defines the `ImagesDisplay` component, designed to manage the presentation and removal of uploaded images within the application.
 * It fetches image data from a server endpoint and displays each image in Material-UI styled cards, enhancing the visual interface.
 * Each card is equipped with a delete button, enabling users to remove images. While deletion is processed locally for instant UI feedback,
 * an optional server request can be implemented to erase images permanently from the backend, ensuring data consistency across platforms.
 * This component encapsulates both the functionality and aesthetics required for a dynamic and interactive image management system.
 * The implementation leverages React's hooks for state management and effects, illustrating modern React development practices.
 *
 * Contributors:
 * - Tanner Helton - Component structure and functionality
 */

// Import necessary React components, Material-UI components, and icons
import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Functional component to display images and handle deletion
const ImagesDisplay = () => {
  // State to store the images
  const [images, setImages] = useState([]);

  // Fetch images from the server on component mount
  useEffect(() => {
    fetch("http://localhost:3002/api/files")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setImages(data);
        } else {
          console.error("Received data is not an array:", data);
          setImages([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setImages([]);
      });
  }, []);

  // Function to handle image deletion
  const handleDelete = (imageUrl) => {
    // Optionally, make a request to the server to delete the image
    setImages(images.filter((image) => image !== imageUrl));
  };

  return (
    <Grid container spacing={2}>
      {/* Map over images and display them in cards */}
      {images.map((image, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            {/* Display image */}
            <CardMedia
              component="img"
              height="140"
              image={image}
              alt={`User Upload ${index}`}
            />
            {/* Card actions for deletion */}
            <CardActions disableSpacing>
              <IconButton
                aria-label="delete"
                onClick={() => handleDelete(image)}
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// Export the ImagesDisplay component as default
export default ImagesDisplay;
