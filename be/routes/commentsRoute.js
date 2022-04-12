const router = require("express").Router();
const {
  commentLv2,
  commentLv1,
  getAllComment,
  updatecommentLv1,
  getAllCommentOfAPost,
  updatecommentLv2,
  deleteCommentLv1,
  deleteCommentLv2,
  likeLv1Comment,
  likeLv2Comment,
  getALv1Comment,
} = require("../controller/commentsController");
//get all cmt
router.get("/all", getAllComment);
//get all cmt of a post
router.get("/post/:id", getAllCommentOfAPost);
//get lv1 cmt
router.get("/commentlv1/:id", getALv1Comment);
//post a cmt lv1
router.post("/commentlv1", commentLv1);
//update lv1 cmt
router.patch("/update/commentlv1/:id", updatecommentLv1);
//update lv2 cmt
router.patch("/update/commentlv2/:id", updatecommentLv2);
//like lv1 cmt
router.patch("/like/commentlv1/:id", likeLv1Comment);
//update lv2 cmt
router.patch("/like/commentlv2/:id", likeLv2Comment);
//post a cmt lv2
router.post("/commentlv2", commentLv2);
//delete a lv1 cmt
router.delete("/commentlv1/:id", deleteCommentLv1);
//delete a lv2 cmt
router.delete("/commentlv2/:id", deleteCommentLv2);

module.exports = router;
