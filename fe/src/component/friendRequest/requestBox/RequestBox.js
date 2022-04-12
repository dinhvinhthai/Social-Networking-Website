import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RequestBox.scss";
import { Link } from "react-router-dom";
function RequestBox({ user }) {
  const [userInfo, setUserInfo] = useState({});
  const userId = localStorage.getItem("userID");
  const [click, setClick] = useState(false);
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
        // alert("đã chấp nhận yêu cầu kết bạn");
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
        // alert("đã từ chuối");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="friendsrequest_tag">
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
      <Link to={`/profile/${userInfo._id}`} className="userinfo">
        <div className="userinfo">
          <p>{userInfo.userName ? userInfo.userName : ""}</p>
          <span>{userInfo.email ? userInfo.email : ""}</span>
        </div>
      </Link>

      {!click ? (
        <div className="friend_request_tag_button">
          <button
            type="button"
            className="button_accept"
            onClick={() => {
              RequesAccept();
              setClick(!click);
            }}
          >
            Chấp nhận
          </button>
          <button
            type="button"
            className="button_refuse"
            onClick={() => {
              RequestRefuse();
              setClick(!click);
            }}
          >
            Từ chối
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
export default RequestBox;
