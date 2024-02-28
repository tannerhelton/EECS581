require("dotenv").config();

const {
	S3Client,
	ListObjectsV2Command,
	GetObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");
const stream = require("stream");
const util = require("util");

const pipeline = util.promisify(stream.pipeline);

const user_id = "temp123"; // Example user_id

const s3 = new S3Client({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

async function downloadFile(bucketName, key, downloadPath) {
	const getObjectParams = {
		Bucket: bucketName,
		Key: key,
	};
	const { Body } = await s3.send(new GetObjectCommand(getObjectParams));
	await pipeline(Body, fs.createWriteStream(downloadPath));
	console.log(`File downloaded successfully: ${downloadPath}`);
}

async function ensureDirectoryExists(directory) {
	if (!fs.existsSync(directory)) {
		fs.mkdirSync(directory, { recursive: true });
	}
}

async function getAllFilesFromUser(bucketName, userPrefix) {
	let fileList = [];
	const listParams = {
		Bucket: bucketName,
		Prefix: userPrefix,
	};

	try {
		const { Contents } = await s3.send(new ListObjectsV2Command(listParams));
		fileList = Contents.map((content) => {
			return `https://${bucketName}.s3.amazonaws.com/${content.Key}`;
		});
	} catch (err) {
		console.error("Error retrieving files:", err);
	}
	console.log("File list:", fileList);
	return fileList;
}

const bucketName = "health-horizon-bucket"; // Your bucket name

module.exports = { getAllFilesFromUser };
