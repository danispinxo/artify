const cloudinary = require('cloudinary').v2;

const uploadImage = async (imagePath) => {
  try {
    // Upload the image that the client chooses
    const result = await cloudinary.uploader.upload(imagePath);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const getAssetInfo = async (publicId) => {
  try {
      // Get details about the asset, in this case it uses the publicId to return the secure_url from the result
      // result in this case is the full cloudinary image object and it contains a lot of other info we don't need
      const result = await cloudinary.api.resource(publicId);
      return result.secure_url;
      } catch (error) {
      console.error(error);
  }
};

module.exports = { uploadImage, getAssetInfo }