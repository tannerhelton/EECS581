import React, { useEffect, useState } from "react";
import DeleteImage from "./DeleteImage"; // Adjust the import path as necessary

const ImagesDisplay = () => {
	const [images, setImages] = useState([]);

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
		// Then, update the state to remove the image from the UI
		setImages(images.filter((image) => image !== imageUrl));
	};

	const DeleteImage = ({ url, onDelete }) => {
		return <button onClick={() => onDelete(url)}>Delete</button>;
	};

	return (
		<div id="imagesDisplay">
			{images.map((image, index) => (
				<div className="imageDiv" key={index}>
					<img
						src={image}
						alt={`User Upload ${index}`}
						style={{ maxWidth: "100%", maxHeight: "100%" }}
					/>
					<DeleteImage url={image} onDelete={() => handleDelete(image)} />
				</div>
			))}
		</div>
	);
};

export default ImagesDisplay;
