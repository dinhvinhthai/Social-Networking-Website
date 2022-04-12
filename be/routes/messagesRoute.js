const router = require("express").Router();
const {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  getMessageConversation,
} = require("../controller/messagesController");
const authenticateToken = require("../middleWare/authJWT");
const authenticateTokenQuery = require("../middleWare/authJWTQuery");
//create 1
router.post("/createOne", authenticateToken, createOne);
//get all
router.get("/getall", authenticateTokenQuery, getAll);
//get one
router.get("/getone/:id", authenticateTokenQuery, getOne);
//get all of conversation
router.get(
  "/getfromcoversation/:id",
  authenticateTokenQuery,
  getMessageConversation
);
//update one
router.patch("/updateone/:id", authenticateToken, updateOne);
//delete a conversation
router.delete("/delete/:id", authenticateToken, deleteOne);
module.exports = router;
