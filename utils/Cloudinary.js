const cloudinary = require("cloudinary").v2;
const { CLOUDYNARY_KEY_API, CLOUDYNARY_NAME, CLOUDYNARY_KEY_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDYNARY_NAME,
  api_key: CLOUDYNARY_KEY_API,
  api_secret: CLOUDYNARY_KEY_SECRET,
});

module.exports = cloudinary;
