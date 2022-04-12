import React, { useEffect, useState } from "react";
import "./comment.scss";
import CommentV2 from "../comment/CommentV2";
import { Link } from "react-router-dom";
import { GoComment } from "react-icons/go";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import axios from "axios";

function CommentV1({ commentV1, setGetNewComment }) {
  const [liking, setLiking] = useState(false);
  const [likes, setLikes] = useState(commentV1.comment.like.length);
  const [open, setOpen] = useState(false);
  const commentV2 = commentV1.comment.commentLv2;
  const commentId = commentV1.comment._id;
  const userId = localStorage.getItem("userID");
  const postId = commentV1.postId;
  const a = new Date();
  const b = new Date(commentV1.comment.createdAt);
  const commentDate = (a - b) / 1000;
  const iconStyles = { color: "#0d47a1", fontSize: "15px", margin: "auto 2px" };
  const [cmtV2, setCmtV2] = useState("");
  useEffect(() => {
    const Id = localStorage.getItem("userID");
    if (commentV1.comment.like.includes(Id)) return setLiking(true);
  }, [commentV1]);

  const writeCommentV2 = () => {
    axios
      .post("http://localhost:5000/api/comments/commentlv2", {
        commentLv1: commentId,
        postId: postId,
        message: cmtV2,
        userId: userId,
      })
      .then((res) => {
        //console.log("Thanh cong", res.data);
        setGetNewComment((prev) => !prev);
      })
      .catch((err) => {
        console.log("Loi roi", err.response.data.message);
      });
  };

  const like = () => {
    const Id = localStorage.getItem("userID");
    setLiking(true);
    setLikes(likes + 1);
    axios.patch(
      `http://localhost:5000/api/comments/like/commentlv1/${commentV1.comment._id}`,
      {
        userId: Id,
      }
    );
  };

  const disLike = () => {
    setLiking(false);
    setLikes(likes - 1);
    setLiking();
    const Id = localStorage.getItem("userID");
    axios.patch(
      `http://localhost:5000/api/comments/like/commentlv1/${commentV1.comment._id}`,
      {
        userId: Id,
      }
    );
  };
  return (
    <div>
      <div className="comment-1">
        <div className="comment-tag">
          <div className="avatar">
            {commentV1?.comment?.userId?.photos?.avatar?.length !== 0 ? (
              <img
                src={`http://localhost:5000/images/${
                  commentV1?.comment?.userId?.photos?.avatar[
                    commentV1?.comment?.userId?.photos?.avatar?.length - 1
                  ]
                }`}
              ></img>
            ) : (
              <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
            )}
          </div>

          <div className="comment-tag-username">
            <Link to={`/profile/${commentV1.comment.userId._id}`}>
              <p className="username">{commentV1.comment.userId?.userName}</p>
            </Link>
          </div>
          <div className="comment-tag-timepost">
            {(() => {
              switch (true) {
                case commentDate < 60:
                  return <p>{Math.round(commentDate)} giây trước</p>;
                case commentDate >= 60 && commentDate < 60 * 60:
                  return <p>{Math.round(commentDate / 60)} phút trước</p>;
                case commentDate >= 60 * 60 && commentDate < 60 * 60 * 24:
                  return <p>{Math.round(commentDate / (60 * 60))} giờ trước</p>;
                case commentDate >= 60 * 60 * 24 &&
                  commentDate < 60 * 60 * 24 * 7:
                  return (
                    <p>{Math.round(commentDate / (60 * 60 * 24))} ngày trước</p>
                  );
                case commentDate >= 60 * 60 * 24 * 7 &&
                  commentDate < 60 * 60 * 24 * 7 * 4:
                  return (
                    <p>
                      {Math.round(commentDate / (60 * 60 * 24 * 7))} tuần trước
                    </p>
                  );
                default:
                  return (
                    <p>
                      {Math.round(commentDate / (60 * 60 * 24 * 7 * 4))} tháng
                      trước
                    </p>
                  );
              }
            })()}
          </div>
        </div>
        <div className="comment-tag-message">
          <p>{commentV1.comment.message}</p>
        </div>
        <div className="post-interaction-length">
          <p>{likes} lượt thích</p>
        </div>
        <div className="post-interaction-2">
          {liking ? (
            <div className="post-interaction-heart-2" onClick={() => disLike()}>
              <IoMdHeart style={iconStyles} />
              <p>Đã thích</p>
            </div>
          ) : (
            <div className="post-interaction-heart-2" onClick={() => like()}>
              <IoMdHeartEmpty style={iconStyles} />
              <p>Thích</p>
            </div>
          )}
          <div
            className="post-interaction-comment-2"
            onClick={() => {
              {
                open ? setOpen(false) : setOpen(true);
              }
            }}
          >
            {/* <p>{commentV2.length}</p> */}
            <p>Trả lời</p>
          </div>
          <div className="post-interaction-report-2">
            <p>Báo cáo</p>
          </div>
        </div>
      </div>

      {open ? (
        <div className="post-comment-bar-2">
          <div className="post-comment-bar-text-2">
            <input
              type="text"
              placeholder="Viết câu trả lời của bạn..."
              value={cmtV2}
              onChange={(e) => {
                setCmtV2(e.target.value);
              }}
            ></input>
          </div>
          <div
            className="post-comment-bar-btn-2"
            onClick={() => {
              writeCommentV2();
              setOpen(false);
            }}
          >
            <span>ĐĂNG</span>
          </div>
        </div>
      ) : (
        ""
      )}
      {commentV2 ? (
        <div>
          {commentV2.map((comment) => {
            return (
              <CommentV2
                key={comment._id}
                commentV2={comment}
                commentLv1={commentV1.comment}
                setGetNewComment={setGetNewComment}
              />
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default CommentV1;
