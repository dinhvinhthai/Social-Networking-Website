// import { useDebugValue } from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./friendrequest.scss";
import Request from "./requestTag/Request";

function FriendRequest() {
  const [fRequests, setFRequests] = useState([]);
  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const getFRequests = () => {
      axios
        .get(`http://localhost:5000/api/users//getone/${userId} `)
        .then((res) => {
          setFRequests(res.data.friendsRequest);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getFRequests();
  }, []);
  return (
    <div>
      {fRequests?.length !==0 ? (
        <div className="friend_request">
          <p>Lời mời kết bạn</p>
          <div className="requestss">
            {fRequests?.map((user, index) => {
              return <Request user={user} key={index}></Request>;
            })}
          </div>
          <div className="link">
            <a href="./friend">Xem thêm</a>
          </div>
        </div>
      ) : ""}
    </div>
    
  );
}
export default FriendRequest;
