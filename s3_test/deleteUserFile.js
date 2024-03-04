// deleteUserFile.js
require("dotenv").config();

const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");

// Initialize the S3 client with your AWS region and credentials
const s3 = new S3Client({
	region: process.env.AWS_REGION, // Make sure to set AWS_REGION in your .env file
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

/**
 * Deletes a file from an S3 bucket under a specific user's directory.
 *
 * @param {string} bucketName - The name of the S3 bucket.
 * @param {string} userPrefix - The prefix (folder) under which the file is stored, typically based on the user's ID or username.
 * @param {string} fileName - The name of the file as it is saved in S3.
 * @returns {Promise<string>} - A message indicating the outcome of the delete operation.
 */
async function deleteUserFile(bucketName, userPrefix, fileName) {
	try {
		// Define the key for the file in S3
		const key = `${userPrefix}/${fileName}`;

		// Set up the parameters for the S3 delete operation
		const deleteParams = {
			Bucket: bucketName,
			Key: key,
		};

		// Execute the delete operation
		await s3.send(new DeleteObjectCommand(deleteParams));
		console.log(`File deleted successfully: ${key}`);

		// Return a success message
		return `File deleted successfully: ${key}`;
	} catch (err) {
		console.error("Error deleting file:", err);
		throw err;
	}
}

module.exports = { deleteUserFile };
