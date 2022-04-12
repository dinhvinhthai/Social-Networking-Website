const router = require("express").Router();
const { status } = require("express/lib/response");
const { findById } = require("../model/usersModel");
const userModal = require("../model/usersModel");
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
const {
  searchingUser,
  getAUser,
  getFriendRequestOfAUser,
  getAllUser,
  addFriend,
  acceptFriend,
  updateAUser,
  deleteAUser,
  unFriend,
  refuseFriendRequest,
  uploadAvatar,
  uploadBackground,
  addNotification,
} = require("../controller/usersController");

//searching user
router.get("/search", searchingUser);
//get a user
router.get("/getone/:id", getAUser);

//get friends request of a user
router.get("/requests/:id", getFriendRequestOfAUser);

//get all users
router.get("/", getAllUser);

//request add friend

router.patch("/add/:id", addFriend);

//accept friend
router.patch("/accept/:id", acceptFriend);

//update user
router.patch("/:id", updateAUser);

//unfriend
router.patch("/unfriend/:id", unFriend);
//refuseFriendRequest
router.patch("/refuse/:id", refuseFriendRequest);

//delete user
router.delete("/:id", deleteAUser);

//upload avatar

router.post("/upload/avatar/:id", upload.single("avatar"), uploadAvatar);
router.post(
  "/upload/background/:id",
  upload.single("avatar"),
  uploadBackground
);
router.post("/notification/:id", addNotification);

module.exports = router;
