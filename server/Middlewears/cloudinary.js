const cloudinary = require("cloudinary").v2;

cloudinary.config({ sign_url: process.env.CLOUDINARY_URL });

module.exports = cloudinary;
