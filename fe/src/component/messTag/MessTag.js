import React from "react";
import "./MessTag.scss";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/userContext";
import Partner from "./partner/Partner";
function MessTag({ people }) {
  const [user] = useContext(UserContext);
  // console.log(user);
  const [partner] = useState(people.members);

  return (
    <div>
        <div>
          {people.members.length > 2 ? (
            <div className="messTag">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
                className="avt_mess_tag"
              ></img>
              <span>{people. conversationName}</span>
            </div>
          ) : (
            <div>
                {partner.map((partners, index) => (
                  partners === user?._id ? "" : (
                    <Partner partners={partners} key={index}></Partner>
                )))}            
            </div>
          )}
        </div>
    </div>
  );
}

export default MessTag;
