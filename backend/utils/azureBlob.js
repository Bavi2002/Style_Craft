const mime = require("mime-types");

const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");

const uploadToAzure = async (fileBuffer, fileName) => {
  const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_CON;

  if (!AZURE_STORAGE_CONNECTION_STRING) {
    throw new Error("Azure Storage connection string is not configured.");
  }

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient =
    blobServiceClient.getContainerClient("profile-photos");

  // Ensure the container exists
  await containerClient.createIfNotExists();

  // Generate a unique name for the blob
  const blobName = `${uuidv4()}-${fileName}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Use mime-types to get the MIME type based on file extension
  const mimeType = mime.lookup(fileName) || "application/octet-stream"; // Default MIME type if not found

  // Upload the file to Azure Blob Storage
  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: { blobContentType: mimeType },
  });

  return blockBlobClient.url; // Return the URL of the uploaded file
};

module.exports = uploadToAzure;
