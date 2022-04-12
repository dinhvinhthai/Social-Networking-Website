import "./Contacts.scss";
import { SocketContext } from "../../context/SocketContext";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/userContext";

function Contacts({ onlineFriends }) {
  return (
    <div className="contacts">
      <p>Bạn bè</p>
      {onlineFriends.map((friend, index) => (
        <div key={index} className="contacts_tag">
          <img
            src={
              friend?.photos?.avatar[0]
                ? `http://localhost:5000/images/${friend?.photos?.avatar[0]}`
                : "/stocks/img/avatar/avatarDefault.jpg"
            }
            className="contacts_tag_avt"
          />
          <span>{friend?.userName}</span>
          <div className="notifications">
            <span>3</span>
          </div>
          <div className="signal"></div>
        </div>
      ))}
    </div>
  );
}
export default Contacts;
