const router = require("express").Router();
const postsModel = require("../model/postsModel");
const userModel = require("../model/usersModel");
const {
  createAPost,
  getTimeLine,
  getAllPost,
  getAProfilePosts,
  getAPost,
  updateAPost,
  deleteAPost,
  likeAPost,
} = require("../controller/postsController");

const multer = require("multer");

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage: storage });

//create a post
router.post("/", upload.single("img"), createAPost);
//get timeline
router.get("/timeline/:id", getTimeLine);

//get all post
router.get("/admin", getAllPost);

//get a profile posts
router.get("/profile/:id", getAProfilePosts);

//get a post
router.get("/:id", getAPost);

//update 1 post (chinh sua)
router.patch("/:id", upload.single("img"), updateAPost);

//delete a post
router.delete("/:id", deleteAPost);

//like a post
router.post("/like/:id", likeAPost);

module.exports = router;
