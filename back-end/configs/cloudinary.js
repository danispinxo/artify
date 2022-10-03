const cloudinary = require('cloudinary').v2;

/////////////////////////
// Uploads an image file
/////////////////////////

const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

const getAssetInfo = async (publicId) => {
  try {
      // Get details about the asset
      const result = await cloudinary.api.resource(publicId);
      console.log("This is the secure URL returning:", result.secure_url);
      return result.secure_url;
      } catch (error) {
      console.error(error);
  }
};

module.exports = { uploadImage, getAssetInfo }