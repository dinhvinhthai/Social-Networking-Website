import React, { useEffect, useState } from "react";
import "./postNotification.scss";
import Nav from "../../component/nav/Nav";
import Post from "../../component/post/Post";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostNotification() {
  const param = useParams();
  const [post, setPost] = useState({});
  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    const getAPost = () => {
      axios
        .get(`http://localhost:5000/api/posts/${param.postId}`)
        .then((res) => {
          console.log(res);
          setPost(res.data.post);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getAPost();
  }, [param.postId, refreshPosts]);

  return (
    <div>
      <Nav></Nav>
      <div className="post-notification">
        <Post postInfo={post} setRefreshPosts={setRefreshPosts}></Post>
      </div>
    </div>
  );
}

export default PostNotification;
