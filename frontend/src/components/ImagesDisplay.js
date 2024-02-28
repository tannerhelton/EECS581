import React, { useEffect, useState } from "react";

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

	return (
		<div>
			{Array.isArray(images) &&
				images.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`User Upload ${index}`}
						style={{ maxWidth: "100px", maxHeight: "100px" }}
					/>
				))}
		</div>
	);
};

export default ImagesDisplay;
