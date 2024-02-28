// postUserFile.js
require("dotenv").config();

const fs = require("fs");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

// Initialize the S3 client with your AWS region and credentials
const s3 = new S3Client({
	region: "us-east-1", // Make sure to set AWS_REGION in your .env file
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

/**
 * Uploads a file to an S3 bucket under a specific user's directory.
 *
 * @param {string} bucketName - The name of the S3 bucket.
 * @param {string} userPrefix - The prefix (folder) under which to store the file, typically based on the user's ID or username.
 * @param {string} filePath - The local path to the file to upload.
 * @param {string} fileName - The name of the file as it should be saved in S3.
 * @returns {Promise<string>} - The URL of the uploaded file.
 */
async function uploadUserFile(bucketName, userPrefix, filePath, fileName) {
	try {
		// Read the file content
		const fileContent = fs.readFileSync(filePath);

		// Define the key for the new file in S3
		const key = `${userPrefix}/${fileName}`;

		// Set up the parameters for the S3 upload
		const uploadParams = {
			Bucket: bucketName,
			Key: key,
			Body: fileContent,
			// You can set additional upload parameters here, such as ContentType
		};

		// Execute the upload
		await s3.send(new PutObjectCommand(uploadParams));
		console.log(`File uploaded successfully: ${key}`);

		// Return the URL to the uploaded file
		return `https://${bucketName}.s3.amazonaws.com/${key}`;
	} catch (err) {
		console.error("Error uploading file:", err);
		throw err;
	}
}

module.exports = { uploadUserFile };
