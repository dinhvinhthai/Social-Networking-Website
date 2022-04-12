import Nav from "../../component/nav/Nav";
import React, { useState, useEffect } from "react";
import axios from "axios";
import RequestBox from "../../component/friendRequest/requestBox/RequestBox";
import "./Friend.scss";
import FriendTag from "../../component/friendTag/FriendTag";

function Friend() {
  const userIdCurrent = JSON.parse(localStorage.getItem("userInfo"))._id;
  const [fRequests, setFRequests] = useState([]);
  const [friendId, setFriendId] = useState([]);
  useEffect(() => {
    const getFRequests = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${userIdCurrent}`)
        .then((res) => {
          setFRequests(res.data.friendsRequest);
          setFriendId(res.data.friends);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getFRequests();
  }, []);
  return (
    <div>
      <Nav></Nav>
      <div className="friend">
        <div className="Filters">
          <p>Bạn bè</p>
          <span>Bộ lọc</span>
          <div className="items">
            <span>Trang chủ</span>
          </div>
          <div className="items">
            <span>Tất cả bạn bè</span>
          </div>
          <div className="items">
            <span>Lời mời kết bạn</span>
          </div>
          <div className="items">
            <span>Gợi ý</span>
          </div>
        </div>

        <div className="friend_content">
          {fRequests?.length !==0 ? (
             <div className="f_request">
            <p>Lời mời kết bạn</p>
            {fRequests?.map((user, index) => {
              return <RequestBox user={user} key={index}></RequestBox>;
            })}
            <button>Xem tất cả</button>
          </div>
          ):""}
         
          {/* <div className="f_request">
            <p>Những người bạn có thể biết</p>
            <button>Xem tất cả</button>
          </div> */}
          {friendId?.length !== 0 ? (
              <div className="f_request">
            <p>Danh sách bạn bè</p>
            {friendId?.map((friend, indexs) => {
              return <FriendTag friend={friend} key={indexs}></FriendTag>;
            })}
            <button>Xem tất cả</button>
          </div>
          ) :""}
        
        </div>
      </div>
    </div>
  );
}

export default Friend;
