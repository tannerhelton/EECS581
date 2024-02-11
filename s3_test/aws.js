const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const { Upload } = require("@aws-sdk/lib-storage");

async function main(path) {
  console.log(path);
  const fileContent = fs.readFileSync(path);

  // Initialize the S3 client
  const s3 = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // Setting up S3 upload parameters
  const params = {
    Bucket: "health-horizon-bucket",
    Key: "test.txt",
    Body: fileContent,
  };

  try {
    const upload = new Upload({
      client: s3,
      params,
    });

    upload.on("httpUploadProgress", (progress) => {
      console.log(progress);
    });

    const data = await upload.done();

    console.log(`File uploaded successfully. ${data}`);
  } catch (err) {
    console.error("Error uploading file:", err);
  }
}

if (process.argv[2]) {
  main(process.argv[2]);
}
