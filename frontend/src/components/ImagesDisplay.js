import React, { useEffect, useState } from "react";
import { Grid, Card, CardMedia, CardActions, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

	const handleDelete = (imageUrl) => {
		// Optionally, make a request to the server to delete the image
		setImages(images.filter((image) => image !== imageUrl));
	};

	return (
		<Grid container spacing={2}>
			{images.map((image, index) => (
				<Grid item xs={12} sm={6} md={4} key={index}>
					<Card>
						<CardMedia
							component="img"
							height="140"
							image={image}
							alt={`User Upload ${index}`}
						/>
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

export default ImagesDisplay;
