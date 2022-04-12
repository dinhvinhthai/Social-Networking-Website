import React, { useState, useEffect, useContext } from "react";
import "./post.scss";
import axios from "axios";
import CommentV1 from "../comment/CommentV1";
import UpdatePost from "../updatePost/UpdatePost";
import { UserContext } from "../../context/userContext";

import { FiShare2 } from "react-icons/fi";
import { GoComment } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";

function Post({ postInfo, setRefreshPosts }) {
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const loginUser = localStorage.getItem("userID");
  const postId = postInfo._id;
  const [likesCount, setLikesCount] = useState(postInfo?.likes?.length);
  const [isLike, setIsLike] = useState(
    postInfo?.likes?.some((item) => item._id === loginUser)
  );
  const [cmtV1, setCmtV1] = useState("");
  const a = new Date();
  const b = new Date(postInfo?.createdAt);
  const postDate = (a - b) / 1000;
  const [comment, setComment] = useState([]);
  const commentNumber = countCmts(comment);
  const socket = useContext(SocketContext);
  const [getNewComment, setGetNewComment] = useState(false);
  const [user] = useContext(UserContext);

  const iconStyles = {
    color: "#0d47a1",
    fontSize: "20px",
    margin: "auto 5px",
    width: "max-content",
  };

  useEffect(() => {
    if (Object.keys(postInfo).length === 0) return;
    if (postInfo.likes.includes(loginUser)) {
      setIsLike(true);
    }
    const getComment = () => {
      axios
        .get(`http://localhost:5000/api/comments/post/${postId}`)
        .then((res) => {
          setComment(res.data.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getComment();
  }, [getNewComment]);

  function countCmts(comment) {
    let lv1Count = comment.length;
    let lv2Count = comment.reduce(
      (prev, current) => prev + current.commentLv2.length,
      0
    );
    return lv1Count + lv2Count;
  }

  //Lay tat ca comment

  //Like bai viet

  const addLike = () => {
    axios
      .post(`http://localhost:5000/api/posts/like/${postId}`, {
        userId: loginUser,
      })
      .then((res) => {
        alert("đã like");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deletePost = () => {
    axios
      .delete(`http://localhost:5000/api/posts/${postId}`, {
        data: { userId: loginUser },
      })
      .then((res) => {
        console.log("delete");
        setRefreshPosts((prev) => !prev);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  const sendNotification = (type) => {
    if (loginUser === postInfo.userId._id) return;

    axios
      .post(
        `http://localhost:5000/api/users/notification/${postInfo.userId._id}`,
        {
          userId: loginUser,
          message: "like",
          post: "/postNotification/" + postInfo._id,
        }
      )
      .then((res) => {
        socket?.emit("sendNotification", {
          receiverUserId: postInfo.userId._id,
          type,
        });
      })
      .catch((err) => console.log(err));
  };

  const writeCommentV1 = () => {
    axios
      .post("http://localhost:5000/api/comments/commentlv1/", {
        postId: postId,
        message: cmtV1,
        userId: loginUser,
      })
      .then((res) => {
        setGetNewComment((prev) => !prev);
      })
      .catch((err) => {
        console.log("Loi roi", err.response.data.message);
      });
  };

  return (
    <div className="post">
      {openOptions ? (
        <>
          <div
            className="post-meta-right-show"
            onClick={() => setOpenOptions(!openOptions)}
          ></div>
          <ul className="post-meta-right-show-items">
            {postInfo.userId._id.includes(loginUser) || user?.isAdmin ? (
              <li
                onClick={() => {
                  setOpenUpdate(!openUpdate);
                  setOpenOptions(!openOptions);
                }}
              >Chỉnh sửa</li>
            ) : ""}
            {postInfo.userId._id.includes(loginUser) || user?.isAdmin ? (
              <li
                onClick={() => {
                  deletePost();
                  setOpenOptions(!openOptions);
                }}
              >
                Xóa
              </li>
            ) : (
              ""
            )}
            <li>Báo cáo</li>
          </ul>
        </>
      ) : (
        ""
      )}

      {openUpdate ? <UpdatePost setOpenUpdate={setOpenUpdate} post={postInfo}></UpdatePost> : ""}



      <div className="post-meta">
        <div className="post-meta-left">
          <div className="post-meta-left-avatar">
            <Link to={`/profile/${postInfo?.userId?._id}`}>
              {postInfo?.userId?.photos?.avatar?.length !== 0 ? (
                <img
                  src={`http://localhost:5000/images/${
                    postInfo?.userId?.photos?.avatar[
                      postInfo?.userId?.photos?.avatar?.length - 1
                    ]
                  }`}
                  className="avatar"
                ></img>
              ) : (
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  className="avatar"
                ></img>
              )}
            </Link>
          </div>
          <div className="post-meta-left-username-timepost">
            <div className="post-meta-left-username">
              <Link to={`/profile/${postInfo?.userId?._id}`}>
                <p className="username">{postInfo?.userId?.userName}</p>
              </Link>
            </div>
            <div className="post-meta-left-timepost">
              {(() => {
                switch (true) {
                  case postDate < 60:
                    return <p>{Math.round(postDate)} giây trước</p>;
                  case postDate >= 60 && postDate < 60 * 60:
                    return <p>{Math.round(postDate / 60)} phút trước</p>;
                  case postDate >= 60 * 60 && postDate < 60 * 60 * 24:
                    return <p>{Math.round(postDate / (60 * 60))} giờ trước</p>;
                  case postDate >= 60 * 60 * 24 && postDate < 60 * 60 * 24 * 7:
                    return (
                      <p>{Math.round(postDate / (60 * 60 * 24))} ngày trước</p>
                    );
                  case postDate >= 60 * 60 * 24 * 7 &&
                    postDate < 60 * 60 * 24 * 7 * 4:
                    return (
                      <p>
                        {Math.round(postDate / (60 * 60 * 24 * 7))} tuần trước
                      </p>
                    );
                  default:
                    return (
                      <p>
                        {/* {Math.round(postDate / (60 * 60 * 24 * 7 * 4))} tháng
                        trước */}
                        {postDate}
                      </p>
                    );
                }
              })()}
            </div>
          </div>
        </div>
        <div className="post-meta-right">
          <div className="post-meta-right-options">
            <div
              className="post-meta-right-options-buttons"
              onClick={() => {
                openOptions ? setOpenOptions(false) : setOpenOptions(true);
              }}
            >
              <span>
                <BsThreeDots></BsThreeDots>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="post-desc">
        <p>{postInfo.desc}</p>
      </div>
      {postInfo.img != "null" ? (
        <div className="post-img">
          {postInfo.img && (
            <img src={`http://localhost:5000/images/${postInfo.img}`} />
          )}
        </div>
      ) : (
        ""
      )}
      <div className="post-interaction-length">
        <div className="post-interaction-length-heart">
          <p>{likesCount} lượt thích</p>
        </div>
        <div className="post-interaction-length-comment">
          <p>{commentNumber} bình luận</p>
        </div>
        <div className="post-interaction-length-share">
          {/* <FiShare2 style={iconStyles}></FiShare2> */}
        </div>
      </div>
      <div className="post-interaction">
        {isLike ? (
          <div
            className="post-interaction-heart"
            onClick={() => {
              addLike();
              setLikesCount(likesCount - 1);
              setIsLike(false);
            }}
          >
            <IoMdHeart style={iconStyles} />
            <p>Đã thích</p>
          </div>
        ) : (
          <div
            className="post-interaction-heart"
            onClick={() => {
              addLike();
              setLikesCount(likesCount + 1);
              setIsLike(true);
              sendNotification("LIKE");
            }}
          >
            <IoMdHeartEmpty style={iconStyles} />
            <p>Thích</p>
          </div>
        )}
        <div
          className="post-interaction-comment"
          onClick={() => {
            {
              open ? setOpen(false) : setOpen(true);
            }
          }}
        >
          <GoComment style={iconStyles}></GoComment>
          <p>Bình luận</p>
        </div>
        <div className="post-interaction-share">
          <FiShare2 style={iconStyles}></FiShare2>
          <p>Chia sẻ</p>
        </div>
      </div>

      {open ? (
        <div className="post-comment-list">
          <p>Các bình luận trước đó</p>
          <div className="post-comment-list-item">
            {comment?.map((comment) => {
              return (
                <CommentV1
                  key={comment._id}
                  commentV1={{ comment }}
                  setGetNewComment={setGetNewComment}
                />
              );
            })}
          </div>
          <div className="post-comment-bar">
            <div className="post-comment-bar-text">
              <input
                type="text"
                placeholder="Viết bình luận của bạn..."
                value={cmtV1}
                onChange={(e) => {
                  setCmtV1(e.target.value);
                }}
              ></input>
            </div>
            <div
              className="post-comment-bar-btn"
              onClick={() => {
                writeCommentV1();
              }}
            >
              <span>ĐĂNG</span>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Post;
