import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./Request.scss";
import { FaSearchDollar } from "react-icons/fa";
import { Link } from "react-router-dom";
function Request({ user }) {
  const [userInfo, setUserInfo] = useState({});
  const userId = localStorage.getItem("userID");
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users//getone/${user}`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, []);

  const RequesAccept = () => {
    axios
      .patch(`http://localhost:5000/api/users/accept/${user}`, {
        userId,
      })
      .then((res) => {
        alert("đã đồng ý");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const RequestRefuse = () => {
    axios
      .patch(`http://localhost:5000/api/users/refuse/${user}`, {
        userId,
      })
      .then((res) => {
        alert("đã từ chuối");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      {open ? (
        <div className="friends_request_tag">
          <Link to={`/profile/${userInfo._id}`}>
            {userInfo?.photos?.avatar?.length !== 0 ? (
              <img
                src={`http://localhost:5000/images/${
                  userInfo?.photos?.avatar[userInfo?.photos?.avatar?.length - 1]
                }`}
                className="avt_friend_request"
              ></img>
            ) : (
              <img
                className="avt_friend_request"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              />
            )}
          </Link>
          <div className="friend_request_tag_info">
            <Link to={`/profile/${userInfo._id}`} className="link">
              <p>{userInfo.userName ? userInfo.userName : ""}</p>
            </Link>
            <div className="friend_request_tag_button">
              <button
                type="button"
                className="button_accept"
                onClick={() => {
                  RequesAccept();
                  setOpen(!open);
                }}
              >
                Chấp nhận
              </button>
              <button
                type="button"
                className="button_refuse"
                onClick={() => {
                  RequestRefuse();
                  setOpen(!open);
                }}
              >
                Từ chối
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default Request;
