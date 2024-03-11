import React, { useEffect, useState } from "react";
import DeleteImage from "./DeleteImage"; // Adjust the import path as necessary

const ImagesDisplay = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3001/api/files")
			.then((response) => response.json())
			.then((data) => {
				// Check if the response is indeed an array
				if (Array.isArray(data)) {
					setImages(data);
				} else {
					// Log or handle unexpected data format
					console.error("Received data is not an array:", data);
					// Consider setting images to an empty array or handling this case appropriately
					setImages([]);
				}
			})
			.catch((error) => {
				console.error("Error fetching data: ", error);
				// Handle error state appropriately
				setImages([]);
			});
	}, []);
	// Return the images
	return (
		<div id="imagesDisplay">
			{Array.isArray(images) &&
				images.map((image, index) => (
					<div className="imageDiv" key={index} id={`uploadImageDiv${index}`}>
						<img
							src={image}
							alt={`User Upload ${index}`}
							style={{ maxWidth: "100%", maxHeight: "100%" }}
						/>
						{/* Add a DeleteImage component to each image */}
						<DeleteImage url={image} imageDiv={document.getElementById(`uploadImageDiv${index}`)}/>
					</div>
				))}
		</div>
	);
};

export default ImagesDisplay;
