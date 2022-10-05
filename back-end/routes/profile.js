const router = require('express').Router();
const multer = require('multer');
const userQueries = require("../db/queries/users");
const artQueries = require('../db/queries/artwork');
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
  //Takes info. sent with the image, parcels it with multer, then runs these cloudinary functions to add the new images to the db
  const userID = req.body.userID;
  const avatarPath = req.file.path;

  (async () => {

    try {
    // Upload the image
    const publicId = await uploadImage(avatarPath);

    // Get the image (returns the secure_url)
    const imageURL = await getAssetInfo(publicId);

    userQueries.updateAvatar(userID, imageURL);

    res.send("Okay!")
    } catch (error) {
      console.log(error);
    }

  })();

});

router.put("/cover", upload.single('cover'), (req, res) => {
  const userID = req.body.userID;
  const coverPath = req.file.path;
  (async () => {

    try {
    // Upload the image
    const publicId = await uploadImage(coverPath);

    // Get the image (returns the secure_url)
    const imageURL = await getAssetInfo(publicId);

    userQueries.updateCover(userID, imageURL)
  
    res.send("Okay!")
    } catch (error) {
        console.log(error);
    }

  })();

});

router.put("/add", upload.single('artwork'), (req, res) => {
  const userID = req.body.userID;
  const categoryID = req.body.categoryID;
  const name = req.body.name;
  const price_cents = req.body.priceCents;
  const description = req.body.description;
  const image = req.file.path;
  const sold = false;

  (async () => {

    try {
    // Upload the image
    const publicId = await uploadImage(image);

    // Get the image (returns the secure_url)
    const imageURL = await getAssetInfo(publicId);

    artQueries.addNewArtwork(userID, categoryID, name, price_cents, description, imageURL, sold)
  
    res.send("Image added to db successfully!")
    } catch (error) {
        console.log(error);
    }

  })();

});

router.post("/delete", (req, res) => {
  artQueries.deleteArtworkByID(req.body.artworkID)
  .then((order) => {
    return res.json(order)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

router.post("/artwork", (req, res) => {
  console.log("This is the artwork id: ", req.body.id);
  artQueries.getArtworkById(req.body.id)
  .then((artwork) => {
    return res.json(artwork)  
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});


router.put("/edit-artwork", (req, res) => {
  artQueries.editArtworkDetails(req.body)
  .then((order) => {
    return res.json(order)
  })
  .catch((err) => {
    res.status(500).json({ error: err.message });
  })
});

module.exports = router;