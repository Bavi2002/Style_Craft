const multer = require("multer");

// Configure multer to store files in memory (instead of local storage)
const storage = multer.memoryStorage(); 

const upload = multer({ storage: storage }); // Set up multer with memory storage

module.exports = upload;
