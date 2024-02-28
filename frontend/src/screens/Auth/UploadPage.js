// Logic for the file upload page. This page is only accessible to authenticated users.
// Users can upload images of their skin and get feedback on the dangerousness from a machine learning model.

// Import the necessary components and modules
import React from "react";
import { Button, Input, Typography } from "@mui/material";
import "./css/UploadPage.css"; // Import the CSS file
import ImagesDisplay from "../../components/ImagesDisplay";

// Define the UploadPage component
const UploadPage = () => {
  return (<>
    <div id="chatbotCard">
      <Typography variant="h3">
        <b>Image Uploader</b>
      </Typography>

      <Typography variant="body1">
        Upload an image of a rash, mole, or other skin condition to receive a diagnosis powered by artificial intelligence.
      </Typography>
      <Typography variant="body1">Upload limit: 50MB</Typography>
      <br />
      <form id='uploadForm' action='./upload-image' method='post' encType="multipart/form-data">
        <Input type='file' id="file" style={{color: "white"}}></Input>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          id="chatbotSendButton"
          onClick={uploadFile}
        >Upload!</Button>
      </form>
      <div id="data">
        <div id="progressNumber">ready...</div>
        <div id="timeRemaining">~ seconds</div>
    </div>
    </div>
    {/* results of the image upload from the ML model */}
    <div id="uploadResultsCard">
      <div id="uploadResultsPre">Results will appear shortly after your image is uploaded.</div>
      <div id="uploadResults"></div>
    </div>
    <div id="imageStorageCard">
				<div id="imageStoragePre">
					Your previous uploads will be stored here. To improve accuracy, our
					model will use them to track how your skin changes over time.
					<ImagesDisplay></ImagesDisplay>
				</div>
				<div id="storageContainer"></div>
				{/* {populateImageStorage()} */}
			</div>
		</>
	);
};

// Export the UploadPage component for use in other parts of the app
export default UploadPage;

// handles uploading the file to the backend server for processing.
function uploadFile(event) {
  const form = document.getElementById('uploadForm');
  event.preventDefault();
  if (document.getElementById('file').files[0].size > 5e+7) return alert('File is too big!');
  const startTime = Date.now();
  const request = new XMLHttpRequest();
  request.upload.addEventListener('progress', (event) => {
    const percent = (event.loaded / event.total) * 100;
    document.getElementById('progressNumber').innerText = percent.toFixed(2) + '%';

    document.getElementById('timeRemaining').innerText = timeRemaining(startTime, percent);

    if (percent == 100) document.getElementById('progressNumber').innerText = 'Processing...';
  });
  request.addEventListener('load', (data) => {
    document.getElementById('progressNumber').innerText = 'Done!';
    const totalTime = (Date.now() - startTime) / 1000;
    document.getElementById('timeRemaining').innerText = 'Took ' + Math.floor(totalTime / 60) + ' minutes and ' + Math.round(totalTime % 60) + ' seconds';
    displayResults(data);
  });
  request.open('POST', './upload-image');
  request.send(new FormData(form));
  request.addEventListener('error', () => alert('Error uploading file!'));
}

//display the time remaining for the file upload
function timeRemaining(startTime, percent) {
  const timeRemaining = ((100 - percent) * (Date.now() - startTime)) / (1000 * percent);
  if (timeRemaining > 60) return Math.floor(timeRemaining / 60) + ' minutes and ' + Math.round(timeRemaining % 60) + ' seconds';
  return Math.round(timeRemaining) + ' seconds';
}

// displays the results of the image upload from the ML model.
function displayResults(resultData) {
  document.getElementById('uploadResultsPre').innerHTML = "";
  document.getElementById('uploadResults').innerHTML = resultData.target.responseText;
  populateImageStorage(); // populate the image storage card with the user's previous uploads
}

function populateImageStorage() {
  const request = new XMLHttpRequest();
  request.open('GET', './get-image-storage');
  request.send();
  request.addEventListener('load', (data) => {
    document.getElementById('storageContainer').innerHTML = data.target.responseText;
  });
}