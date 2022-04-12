import React from "react";
import { FaPhotoVideo, FaRegPaperPlane } from "react-icons/fa";
import "./share.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import PostImgUpload from "../fileUpload/PostImgUpload";
import { Link } from "react-router-dom";

function Share({ setRefreshPosts }) {
  const userId = localStorage.getItem("userID");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState(false);
  const [fileRef, setFileRef] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);
  const [avt, setAvt] = useState([]);
  const [userinfos, setUserInfos] = useState("");

  const Share = () => {
    const userId = localStorage.getItem("userID");
    var formData = new FormData();
    if (!fileRef && !desc) {
      alert("Phải có ảnh hoặc text");
      return;
    }
    formData.append("img", fileRef);
    formData.append("userId", userId);
    formData.append("desc", desc);

    axios
      .post("http://localhost:5000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setRefreshPosts((prev) => !prev);
        // window.location.reload(false);        
      })
      .catch((err) => {
        console.log("Loi roi", err.response.data.message);
      });
  };

  useEffect(() => {
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${userId}`)
        .then((res) => {
          setUserInfos(res.data);
          setAvt(res.data.photos.avatar.length);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, []);

  return (
    <div className="share">
      <div className="share-top">
        <div className="share-left">
          <Link to={`/profile/${userId}`}>
            {avt === 0 ? (
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                className="avatar"
              />
            ) : (
              <img
                src={`http://localhost:5000/images/${
                  userinfos?.photos?.avatar[
                    userinfos?.photos?.avatar?.length - 1
                  ]
                }`}
                className="avatar"
              />
            )}
          </Link>

          <div className="share-left-content">
            <input
              type="text"
              placeholder="Bạn muốn chia sẻ gì không?"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="share-right">
          <FaPhotoVideo className="share-img" onClick={() => setImg(true)} />
          <div
            className="share-btn"
            onClick={() => {
              Share();
            }}
          >
            <FaRegPaperPlane />
            <span>ĐĂNG!</span>
          </div>
        </div>
      </div>
      <div className="share-middle">
        {img && (
          <PostImgUpload
            preview={[previewURL, setPreviewUrl]}
            setFileRef={setFileRef}
            open={setImg}
          />
        )}
      </div>
      <div className="share-bottom">
        {previewURL && (
          <div className="preview-container">
            <img className="preview-img" src={previewURL} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Share;
