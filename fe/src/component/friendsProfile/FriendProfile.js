import React, { useEffect } from "react";
import "./friendsprofile.scss";
import { Link } from "react-router-dom";

function FriendProfile({ userData }) {
  const newDummy = userData?.friends?.filter((item, index) => {
    return index < 9;
  });
  return (
    <div className="friendprofile">
      <Link to={"/friend"}>
        <p className="title">Bạn bè</p>
      </Link>

      <div className="friendprofile-container">
        {newDummy?.map((item, i) => {
          return (
            <Link
              to={`/profile/${item._id}`}
              key={i}
              className="friendprofile-item"
            >
              {item?.photos?.avatar?.length !== 0 ? (
                <img
                  src={`http://localhost:5000/images/${
                    item?.photos?.avatar[
                      item?.photos?.avatar?.length - 1
                    ]
                  }`}
                ></img>
              ) : (
                <img
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                />
              )}
              <p className="username">
                {item.userName.length > 17
                  ? item.userName.substring(0, 15) + "..."
                  : item.userName}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default FriendProfile;
