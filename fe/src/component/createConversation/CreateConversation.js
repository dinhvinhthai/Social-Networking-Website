import React, { useState, useEffect, useContext } from "react";
import "./CreateConversation.scss";
import axios from "axios";
import { UserContext } from "../../context/userContext";
function CreateConversation({ setOpenNewConver, SetMyConversations }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [user] = useContext(UserContext);
  const [partner, setPartner] = useState("");

  useEffect(() => {
    if (search === "") {
      return;
    }
    axios
      .get(`http://localhost:5000/api/users/search?name=${search}`)
      .then((res) => {
        setResults(res.data.data);
        return;
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [search]);
  // console.log(partner);

  useEffect(() => {
    if (partner === "") {
      return;
    }
    axios
      .post(
        "http://localhost:5000/api/conversations/createone",
        {
          members: [user._id, partner],
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setOpenNewConver(false);
        SetMyConversations(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, [partner]);

  return (
    <div className="new_conversation">
      <div className="exit">
        <span>Tin nhắn mới</span>
        <button onClick={() => setOpenNewConver(false)}>X</button>
      </div>
      <div className="search_friend">
        <span>Đến:</span>
        <input
          type="search"
          placeholder="tìm kiếm"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
      </div>
      <div className="search_friend_result">
        {results?.map((res, index) => {
          return (
            <div
              className="search_friend_result_tag"
              key={index}
              onClick={() => setPartner(res._id)}
            >
              {res?.photos?.avatar?.length === 0 ? (
                <img
                  className="avt_friend"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                ></img>
              ) : (
                <img
                  className="avt_friend"
                  src={`http://localhost:5000/images/${
                    res?.photos?.avatar[res?.photos?.avatar?.length - 1]
                  }`}
                />
              )}
              <span>{res.userName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CreateConversation;
