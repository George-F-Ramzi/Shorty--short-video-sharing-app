const multer = require("multer");
const cloudinary = require("../Middlewears/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: "auto",
  },
});

const upload = multer({ storage });

module.exports = upload;
