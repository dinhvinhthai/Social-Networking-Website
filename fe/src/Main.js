import React, { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import SearchResults from "./pages/searchResults/SearchResults";
import Friend from "./pages/friends/Friend";
import { SocketContext } from "./context/SocketContext";
import { UserContext } from "./context/userContext";
import axios from "axios";
import Event from "./pages/event/Event";
import EventContent from "./pages/eventContent/EventContent";
import Job from "./pages/job/Job";
import JobContent from "./pages/jobContent/JobContent";
import Notification from "./pages/notification/Notification";
import PostNotification from "./pages/postNotification/PostNotification";
import Message from "./pages/message/Message";
import Test from "./Test";
function Main() {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [onlineFriends, setOnlineFriends] = useState([]);

  //get user
  useEffect(() => {
    const userId = localStorage.getItem("userID");
    axios
      .get(`http://localhost:5000/api/users/getone/${userId}`)
      .then((res) => {
        setUser(res.data);
      });
  }, []);

  useEffect(() => {
    if (!user) return;
    socket.emit("userConnection", user);
    socket.emit("sendListToGetOnlineFriends", { friends: user.friends, user });
    socket.on("getOnlineUsers", (data) => {
      console.log(data);
      setOnlineFriends(
        data.filter((data) =>
          user.friends.some((item) => item._id === data._id)
        )
      );
    });
  }, [user]);

  //
  useEffect(() => {
    if (!user) return;
    socket.on("getMessage", (mess) => {
      console.log(mess);
    });
  }, [user, socket]);
  //
  return (
    <Routes>
      <Route path="/profile/:userId" element={<Profile />}></Route>
      <Route path="/searchresult" element={<SearchResults />}></Route>
      <Route path="/" element={<Home onlineFriends={onlineFriends} />}></Route>
      <Route path="/friend" element={<Friend />}></Route>
      <Route path="/eventContent/:id" element={<EventContent />}></Route>
      <Route path="/event" element={<Event />}></Route>
      <Route path="/job" element={<Job />}></Route>
      <Route path="/jobContent/:id" element={<JobContent />}></Route>
      <Route path="/notification" element={<Notification />}></Route>
      <Route
        path="/postNotification/:postId"
        element={<PostNotification />}
      ></Route>
      <Route path="/message" element={<Message />}></Route>
      <Route path="/test" element={<Test />}></Route>
    </Routes>
  );
}

export default Main;
