const router = require('express').Router();
const multer = require('multer');
const userQueries = require("../db/queries/users");
const { uploadImage, getAssetInfo } = require('../configs/cloudinary');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

router.get("/", (req, res) => {
  userQueries.getUserById(req.query.id)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.put("/", (req, res) => {
  userQueries.editUser(req.body)
  .then((users) => {
    return res.json(users)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.put("/avatar", upload.single('avatar'), (req, res) => {
  const userID = req.body.userID;
  const avatarPath = req.file.path;

  console.log("User ID:", userID);
  console.log("File path:", avatarPath);

  (async () => {

    // Set the image to upload
    const imagePath = avatarPath;

    // Upload the image
    const publicId = await uploadImage(imagePath);

    // Get the image (returns the secure_url)
    const image = await getAssetInfo(publicId);

    console.log(image);

  })();

});

module.exports = router;