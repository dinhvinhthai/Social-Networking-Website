import React from "react";
import "./notification.scss";
import Nav from "../../component/nav/Nav";
import Notifications from "../../component/notifications/Notifications";

function Notification() {
  return (
    <div>
      <Nav></Nav>
        <div className="notification">
           <Notifications></Notifications>
        </div>
    </div>
  );
}

export default Notification;
