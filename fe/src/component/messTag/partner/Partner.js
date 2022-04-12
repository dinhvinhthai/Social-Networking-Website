import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Partner.scss";
function Partner({ partners }) {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
      axios.get(`http://localhost:5000/api/users/getone/${partners}`)
        .then((res) => {
           setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }, []);
  return (
      <div>
          <div className="messTag">
              
              {userInfo?.photos?.avatar?.length === 0 ? (
            <img
              className="avt_mess_tag"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt=""
            />
          ) : (
            <img
               className="avt_mess_tag"
              src={`http://localhost:5000/images/${
                userInfo?.photos?.avatar[userInfo?.photos?.avatar?.length - 1]
              }`}
              alt=""
            />
          )}
              <span>{userInfo.userName}</span>
            </div>
    </div>
  )
}

export default Partner