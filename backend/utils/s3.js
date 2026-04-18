const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/config.env" });

console.log("AWS_ACCESS_KEY", process.env.AWS_ACCESS_KEY);
console.log("AWS_SECRET_KEY", process.env.AWS_SECRET_KEY);
console.log("AWS_REGION", process.env.AWS_REGION);
console.log("AWS_BUCKET_NAME", process.env.AWS_BUCKET_NAME);

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

/**
 * Upload a file to S3
 * @param {Object} file - The file object from express-fileupload (or similar)
 * @param {string} folder - The folder in S3 (e.g., 'projects', 'team')
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
exports.uploadToS3 = async (file, folder = "general") => {
    const fileName = `${folder}/${Date.now()}_${path.basename(file.name)}`;
    
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.data, // express-fileupload provides file.data as Buffer
        ContentType: file.mimetype,
        // ACL: "public-read", // This depends on bucket policy. Using public bucket is common for web apps.
    };

    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        
        // Construct the URL. ap-south-1 -> s3.ap-south-1.amazonaws.com
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
};
