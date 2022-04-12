const router = require("express").Router();
const {
  getAllJob,
  getAJob,
  createAJob,
  updateAJob,
  deleteAJob,
} = require("../controller/jobsController");

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
const authenticateToken = require("../middleWare/authJWT");
//get all cmt
router.get("/all", getAllJob);
router.get("/getOne/:id", getAJob);
//create an event
router.post(
  "/createOne",
  [authenticateToken, upload.single("jobImg")],
  createAJob
);
router.post("/join", authenticateToken, createAJob);
router.patch("/updateOne", authenticateToken, updateAJob);
router.delete("/deleteOne", authenticateToken, deleteAJob);

module.exports = router;
