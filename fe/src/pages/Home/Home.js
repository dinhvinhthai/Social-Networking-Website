import "./Home.scss";
import Nav from "../../component/nav/Nav";
import Share from "../../component/share/Share";
import Contacts from "../../component/contacts/Contacts";
import FriendRequest from "../../component/friendRequest/FriendRequest";
import Options from "../../component/options/Options";
import RecommendPage from "../../component/recommendPage/RecommendPage";
import React, { useEffect, useState } from "react";
import Post from "../../component/post/Post";
import axios from "axios";

function Home({ onlineFriends }) {
  const userIdCurrent = JSON.parse(localStorage.getItem("userInfo"))._id;
  const [userPosts, setUserPosts] = useState([]);
  const [refreshPosts, setRefreshPosts] = useState(false);
  useEffect(() => {
    const getUserPost = () => {
      axios
        .get(`http://localhost:5000/api/posts/timeline/${userIdCurrent}`)
        .then((res) => {
          let tempPosts = [];
          res.data.posts.forEach((post) =>
            post.forEach((item) => tempPosts.push(item))
          );
          setUserPosts(tempPosts.reverse());
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserPost();
  }, [refreshPosts]);
  return (
    <div className="home">
      <Nav></Nav>
      <div className="home-maincontainer">
        <div className="leftbar">
          <Options></Options>
        </div>
        <div className="center">
          <Share setRefreshPosts={setRefreshPosts}></Share>
          <p>--- Có thể bạn biết họ ! ---</p>
          {/* <RecommendPage></RecommendPage> */}
          <p>--- Hôm nay có gì mới nào ! ---</p>
          {userPosts.map((userPost, index) => {
            return (
              <Post
                postInfo={userPost}
                setRefreshPosts={setRefreshPosts}
                key={index}
              ></Post>
            );
          })}
        </div>
        <div className="rightbar">
          <FriendRequest></FriendRequest>
          <Contacts onlineFriends={onlineFriends}></Contacts>
        </div>
      </div>
    </div>
  );
}

export default Home;
