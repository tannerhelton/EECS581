// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import necessary AWS SDK components and other required modules
const {
	S3Client,
	ListObjectsV2Command,
	GetObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs"); // File system module for file operations
const stream = require("stream"); // Stream module to handle data streams
const util = require("util"); // Utility module

// Convert stream.pipeline to a promise to use with async/await
const pipeline = util.promisify(stream.pipeline);

// Set a user identifier for bucket operations
const user_id = "temp123"; // Example user ID

// Initialize the S3 client with region and credentials
const s3 = new S3Client({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS access key ID
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS secret access key
	},
});

// Function to download a file from S3 to a local path
async function downloadFile(bucketName, key, downloadPath) {
	const getObjectParams = {
		Bucket: bucketName, // Name of the S3 bucket
		Key: key, // Key (path) of the file in the bucket
	};
	const { Body } = await s3.send(new GetObjectCommand(getObjectParams));
	// Use the pipeline utility to stream the file from S3 and write it to the local file system
	await pipeline(Body, fs.createWriteStream(downloadPath));
	console.log(`File downloaded successfully: ${downloadPath}`);
}

// Function to ensure a directory exists, and if not, create it
async function ensureDirectoryExists(directory) {
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true }); // Create the directory, including any parent directories if necessary
	}
}

// Function to list all files for a user in an S3 bucket and return their URLs
async function getAllFilesFromUser(bucketName, userPrefix) {
	let fileList = [];
	const listParams = {
		Bucket: bucketName, // Name of the S3 bucket
		Prefix: userPrefix, // Prefix to filter the files for the specific user
	};

	try {
		// Retrieve a list of files from the bucket that match the prefix
		const { Contents } = await s3.send(new ListObjectsV2Command(listParams));
		// Map each file to its public URL
		fileList = Contents.map((content) => {
			return `https://${bucketName}.s3.amazonaws.com/${content.Key}`;
		});
	} catch (err) {
		console.error("Error retrieving files:", err);
	}
	// console.log("File list:", fileList);
	return fileList; // Return the list of file URLs
}

// Define the bucket name to be used for operations
const bucketName = "health-horizon-bucket";

// Export the getAllFilesFromUser function to make it available for import in other files
module.exports = { getAllFilesFromUser };
