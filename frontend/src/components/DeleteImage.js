/**
 * This script defines the `DeleteImage` component, which is tasked with handling the deletion of images within the application.
 * It features a button that, when clicked, initiates a deletion process for a specified image by making a server-side request.
 * The component constructs and sends a DELETE request to a predefined server endpoint, using the image URL to identify the target.
 * A FIXME note within the code highlights an ongoing issue with the endpoint URL or the request format, suggesting the need for further troubleshooting.
 * The deletion functionality is crucial for maintaining data integrity and relevance by allowing users to remove outdated or unwanted images.
 * The design and implementation focus on providing a straightforward user interface while ensuring robust back-end interactions for effective data management.
 *
 * Contributors:
 * - Tanner Helton - Component structure and functionality
 */

import React from "react";

const DeleteImage = ({ url, imageDiv }) => {
  const deleteImage = () => {
    console.log("{Deleting image:", url, "}");
    const filename = url.split("/").pop();
    fetch("http://localhost:3002/api/files/" + filename, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: url }),
    })
      .then((response) => response.json())
      .then((data) => {
        // if successful, delete the image. Otherwise, log the error
        if (data.success) {
          console.log("Image deleted successfully");
          imageDiv.remove();
        } else console.error(data);
      })
      .catch((error) => {
        console.error("Error deleting image: ", error);
        //remove this line once delete is actually working
        imageDiv.remove();
      });
  };

  return <button onClick={deleteImage}>Delete</button>;
};

export default DeleteImage;
