/**
 * DeleteImage.js
 *
 * This component is responsible for rendering a delete button for an image and handling the deletion
 * of that image when the button is clicked. It constructs a delete request to a server endpoint based
 * on the image URL and sends the request to delete the image. There is a fixme note indicating a potential
 * issue with the delete endpoint URL or the request format.
 *
 * Contributors:
 * - Tanner Helton - Component structure and functionality
 */

import React from "react";

const DeleteImage = ({ url, imageDiv }) => {
  //FIXME: This function is not reaching the delete endpoint.
  // the url seems to be malformed and/or temporary, so I'm not sure if it's what we should be using.
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
