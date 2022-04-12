import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PartnerInfo.scss";

function PartnerInfo({ partners }) {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
      axios.get(`http://localhost:5000/api/users/getone/${partners}`)
        .then((res) => {
           setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }, [partners]);
 // console.log(partners);
  return (
      <div>
          <div className="mess_info">
              {userInfo?.photos?.avatar?.length === 0 ? (
            <img
               className="mess_cent_avt"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt=""
            />
          ) : (
            <img
               className="mess_cent_avt"
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

export default PartnerInfo