import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.scss";
import Nav from "../../component/nav/Nav";
import Hero from "../../component/Hero/Hero";
import Infos from "../../component/infos/Infos";
import FriendProfile from "../../component/friendsProfile/FriendProfile";
import Share from "../../component/share/Share";
import Post from "../../component/post/Post";
import { useParams } from "react-router-dom";

function Profile() {
  const param = useParams();
  const loginUserId = localStorage.getItem("userID");
  const [userPosts, setUserPost] = useState([]);
  const [userData, setUserData] = useState({});
  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    const getUserPost = () => {
      axios
        .get(
          `http://localhost:5000/api/posts/profile/${param.userId}?amount=20`
        )
        .then((res) => {
          setUserPost(res.data.posts.reverse());
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserPost();
    const getUser = () => {
      axios
        .get(`http://localhost:5000/api/users/getone/${param.userId}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUser();
  }, [param.userId, refreshPosts]);
  return (
    <div className="profile">
      <Nav></Nav>
      <Hero></Hero>
      <div className="profile-main">
        <div className="profile-left">
          <Infos></Infos>
          <FriendProfile userData={userData} />
        </div>
        <div className="profile-right">
          {loginUserId.includes(param.userId) ? (
            <Share setRefreshPosts={setRefreshPosts} />
          ) : (
            ""
          )}
          <p>--- Bài đăng gần đây. ---</p>
          {userPosts?.map((userPost) => {
            return (
              <Post
                setRefreshPosts={setRefreshPosts}
                postInfo={userPost}
                key={userPost._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
