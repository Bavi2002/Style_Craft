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

  await containerClient.createIfNotExists();

  const blobName = `${uuidv4()}-${fileName}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const mimeType = mime.lookup(fileName) || "application/octet-stream"; // Default MIME type if not found

  await blockBlobClient.uploadData(fileBuffer, {
    blobHTTPHeaders: { blobContentType: mimeType },
  });

  return blockBlobClient.url;
};

module.exports = uploadToAzure;
