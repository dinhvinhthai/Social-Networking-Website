import React, { useState, useEffect } from "react";
import "./hero.scss";
import { AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import PhotoUpload from "../fileUpload/PhotoUpload";

function Hero() {
  const userId = useParams().userId;
  const loginUser = localStorage.getItem("userID");
  const [userinfos, setUserInfos] = useState({});
  const [uploadAvatar, setUploadAvatar] = useState(false);
  const [uploadBackground, setUploadBackground] = useState(false);
  const [avt, setAvt] = useState([]);
  console.log(userinfos);

  useEffect(() => {
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${userId}`)
        .then((res) => {
          console.log(res);
          setUserInfos(res.data);
          setAvt(res.data.photos.avatar.length);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, [userId]);

  const addFriend = () => {
    axios
      .patch(`http://localhost:5000/api/users/add/${userId}`, {
        userId: loginUser,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="hero">
      {uploadAvatar && <PhotoUpload open={setUploadAvatar} type={"avatar"} />}
      {uploadBackground && (
        <PhotoUpload open={setUploadBackground} type={"background"} />
      )}
      <div className="coverpicture-container">
        <img
          className="coverpicture"
          src={`http://localhost:5000/images/${
            userinfos?.photos?.background[
              userinfos?.photos?.background?.length - 1
            ]
          }`}
          alt=""
        />
        {loginUser === userId ? (
          <AiOutlineCamera
            className="camera-background"
            onClick={() => setUploadBackground(true)}
          />
        ) : (
          ""
        )}
      </div>
      <div className="hero-profile">
        <div className="avatar-container">
          {avt === 0 ? (
            <img
              className="avatar"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt=""
            />
          ) : (
            <img
              className="avatar"
              src={`http://localhost:5000/images/${
                userinfos?.photos?.avatar[userinfos?.photos?.avatar?.length - 1]
              }`}
              alt=""
            />
          )}

          {loginUser === userId ? (
            <AiOutlineCamera
              className="camera"
              onClick={() => setUploadAvatar(true)}
            />
          ) : (
            ""
          )}
        </div>
        <p className="hero-name">
          {userinfos.userName ? userinfos.userName : ""}
        </p>
      </div>
      <div className="hero-content">
        <Link to={"/message"}>
          <div className="message">Nhắn tin</div>
        </Link>
        {userId !== loginUser &&
        !userinfos?.friends?.filter((item) => item._id == loginUser).length ? (
          <div className="icon-request">
            <div onClick={() => addFriend()}>Kết bạn</div>
          </div>
        ) : (
          ""
        )}
        <div>Dự phòng</div>
      </div>
    </div>
  );
}

export default Hero;
