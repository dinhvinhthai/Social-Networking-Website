import React, { useState, useEffect } from "react";
import "./FriendTag.scss";
import axios from "axios";
import { Link } from "react-router-dom";
function FriendTag({ friend }) {
  const [friendInfo, setFriendInfo] = useState([]);
  const [notFriend, setNotFriend] = useState(false);
  const [request, setRequested] = useState(false);

  useEffect(() => {
    const getFRequests = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${friend._id}`)
        .then((res) => {
          setFriendInfo(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getFRequests();
  }, []);
  const userId = localStorage.getItem("userID");
  const unfriend = () => {
    // window.location.reload();
    axios
      .patch(`http://localhost:5000/api/users/unfriend/${friend._id}`, {
        userId,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  const sendRequest = () => {
    axios
      .patch(`http://localhost:5000/api/users/add/${friend._id}`, {
        userId,
      })
      .then((res) => {
        //alert("đã gửi yêu cầu thành công");
      })
      .catch((err) => {});
  };
  return (
    <div className="friend_tag">
      {friendInfo?.photos?.avatar?.length !== 0 ? (
        <img
          src={`http://localhost:5000/images/${
            friendInfo?.photos?.avatar[friendInfo?.photos?.avatar?.length - 1]
          }`}
          className="avt_friend_request"
        ></img>
      ) : (
        <img
         className="avt_friend_request"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        />
      )}
      <div className="userinfo">
        <Link to={`/profile/${friendInfo._id}`}>
          <p>{friendInfo.userName ? friendInfo.userName : ""}</p>
        </Link>

        <span>{friendInfo.email ? friendInfo.email : ""}</span>
      </div>

      <div className="friend_button">
        {!notFriend ? (
          <button
            type="button"
            onClick={() => {
              unfriend();
              setNotFriend(!notFriend);
            }}
          >
            Xóa bạn
          </button>
        ) : !request ? (
          <button
            className="friend_button"
            onClick={() => {
              sendRequest();
              setRequested(!request);
            }}
          >
            {!request ? "kết bạn" : "Đã kết bạn"}
          </button>
        ) : (
          <p>Đã gửi yêu cầu kết bạn</p>
        )}
      </div>
    </div>
  );
}
export default FriendTag;
