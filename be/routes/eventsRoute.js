const router = require("express").Router();
const {
  getAllEvents,
  createAnEvent,
  deleteAnEvent,
  updateAnEvent,
  getAnEvents,
  joinEvent,
} = require("../controller/eventsController");

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
router.get("/all", getAllEvents);
router.get("/getOne/:id", getAnEvents);
//create an event
router.post(
  "/createOne",
  [authenticateToken, upload.single("eventImg")],
  createAnEvent
);
router.post("/join", authenticateToken, joinEvent);
router.patch("/updateOne", authenticateToken, updateAnEvent);
router.delete("/deleteOne", authenticateToken, deleteAnEvent);

module.exports = router;
