import "./notifications.scss";
import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";

function Notifications() {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) return;
    socket?.on("getNotification", (data) => {
      setNotifications(data);
    });
  }, [user, socket]);
  
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/getone/${user._id}`
        );
        setNotifications(res.data.notifications);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user]);
  const a = new Date();
  const b = new Date(notifications?.createdAt);
  const timepost = (a - b) / 1000;
  return (
    <div className="notifications">
      <div className="notifications-title">
        <h3>Thông báo gần đây</h3>
      </div>
      {notifications.length > 0?(notifications.map((item) => (
      <div className="notifications-list">
          <Link to={`${item.post}`}>
            <div className="notifications-items">
              <p>
                  <Link to={`/profile/${item.userId._id}`}>
                    <span className="username">{`${item.userId.userName}`} </span>
                  </Link>
                  đã {`${item.message}`} bài viết của bạn. ---
                  <span>
                    {(() => {
                      switch (true) {
                        case timepost < 60:
                          return <span>{Math.round(timepost)} giây trước</span>;
                        case timepost >= 60 && timepost < 60 * 60:
                          return <span>{Math.round(timepost / 60)} phút trước</span>;
                        case timepost >= 60 * 60 && timepost < 60 * 60 * 24:
                          return <span>{Math.round(timepost / (60 * 60))} giờ trước</span>;
                        case timepost >= 60 * 60 * 24 && timepost < 60 * 60 * 24 * 7:
                          return (
                            <span>{Math.round(timepost / (60 * 60 * 24))} ngày trước</span>
                          );
                        case timepost >= 60 * 60 * 24 * 7 &&
                          timepost < 60 * 60 * 24 * 7 * 4:
                          return (
                            <span>
                              {Math.round(timepost / (60 * 60 * 24 * 7))} tuần trước
                            </span>
                          );
                        default:
                          return (
                            <span>
                              {/* {Math.round(timepost / (60 * 60 * 24 * 7 * 4))} tháng
                              trước */}
                              {timepost}
                            </span>
                          );
                      }
                    })()}
                  </span>
                </p>
              </div>
            </Link>
            </div>
        ))):(<div className="none">Không có thông báo nào !</div>)}
      {(window.location.pathname !== "/notification") && notifications.length > 0?(
        <div className="notifications-all">
        <Link to={`/notification`}>
          <p>Xem tất cả</p>
        </Link>
      </div>
      ):""}
        
    </div>
  );
}

export default Notifications;
