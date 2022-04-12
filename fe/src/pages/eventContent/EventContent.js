import React, { useEffect, useState, useContext } from "react";
import "./EventContent.scss";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { BsPeopleFill, BsSearch } from "react-icons/bs";
import Nav from "../../component/nav/Nav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../../context/SocketContext";
function EventContent() {
  const param = useParams();
  const [events, setEvents] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const user = localStorage.getItem("userID");
  const [numjoins, setNumjoins] = useState();
  const [join, setJoin] = useState();
  const socket = useContext(SocketContext);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/events/getOne/${param.id} `,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setEvents(res.data.eventsQuery);
        setJoin(res.data.eventsQuery.joins.some((item) => item === user));
        setNumjoins(res.data.eventsQuery.joins.length);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    if (searchTerm === "") {
      return;
    }
    axios
      .get(`http://localhost:5000/api/users/search?name=${searchTerm}`)
      .then((res) => {
        setResult(res.data.data);
      })
      .catch((err) => {});
  }, [searchTerm]);

  const joinEvent = () => {
    axios
      .post(
        `http://localhost:5000/api/events/join `,
        {
          eventId: events._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJoin(true);
        setNumjoins(numjoins + 1);
      })
      .catch((err) => {});
  };
  const notjoins = () => {
    axios
      .post(
        `http://localhost:5000/api/events/join `,
        {
          eventId: events._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJoin(false);
        setNumjoins(numjoins - 1);
      })
      .catch((err) => {});
  };

  const sendInvite = (userId) => {
    axios
      .post("http://localhost:5000/api/users/notification", {
        userId,
        message: `Mời tham gia sự kiện ${events._id}`,
      })
      .then((res) => {
        socket?.emit("sendNotification", {
          receiverUserId: userId,
        });
      });
  };

  return (
    <div className="eventcontent">
      <Nav></Nav>
      <div className="event_header">
        <img
          src={`http://localhost:5000/images/${events.img}`}
          className="cover"
        ></img>
        <div className="time">
          {events?.startTime ? <span>{events.startTime}</span> : "không có"}
        </div>
        <div className="title">
          {events?.eventName ? <span>{events.eventName}</span> : ""}
        </div>
        <div className="button_event">
          {join ? (
            <button
              className="join_event"
              onClick={() => {
                notjoins();
              }}
            >
              <div className="join">
                <AiTwotoneStar className="icon_join" />
                <span>Đã tham gia</span>
              </div>
            </button>
          ) : (
            <button
              className="join_event"
              onClick={() => {
                joinEvent();
              }}
            >
              <div className="join">
                <AiOutlineStar className="icon_join" />
                <span>Tham gia</span>
              </div>
            </button>
          )}

          <button className="invite">
            <span>Mời</span>
          </button>
        </div>
      </div>

      <div className="event_details">
        <div className="details_header">
          <span>Chi tiết sự kiện</span>
        </div>
        <div className="details_people">
          <BsPeopleFill className="icon_event" />
          {events?.joins ? (
            <span>{numjoins} Người tham gia</span>
          ) : (
            "0 người tham gia"
          )}
        </div>
        <div className="details">
          {events?.desc ? (
            <span>{events.desc}</span>
          ) : (
            <span>không có nội dung</span>
          )}

          {events?.startTime ? (
            <span>{events.startTime}</span>
          ) : (
            <span>chưa thêm thời gian sự kiện nhe bạn ê</span>
          )}
          {events?.location ? <span>Địa điểm: {events.location}</span> : ""}
          {events?.participants ? (
            <span>
              Đối tượng tham gia: {""}
              {events.participants}
            </span>
          ) : (
            ""
          )}
          {events?.link ? (
            <span>
              Xem chi tiết tại: <a>{events.link}</a>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="invite_event">
        <span>Khách mời</span>
        <div className="search">
          <BsSearch></BsSearch>
          <input
            type="search"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></input>
        </div>
        <div className="peoples">
          {result?.map((results, index) => {
            return (
              <div key={index} className="peoples_event_tag ">
                {results?.photos?.avatar?.length === 0 ? (
                  <img
                    className="peoples_avt"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                  ></img>
                ) : (
                  <img
                    className="peoples_avt"
                    src={`http://localhost:5000/images/${
                      results?.photos?.avatar[
                        results?.photos?.avatar?.length - 1
                      ]
                    }`}
                  />
                )}
                <span>
                  <Link to={`/profile/${results._userId}`}>
                    <span>{results.userName}</span>
                  </Link>
                </span>
                {events.joins.includes(results._id) ? (
                  <span className="joined">Đã tham gia</span>
                ) : (
                  <button
                    onClick={() => {
                      sendInvite(results._id);
                    }}
                  >
                    Mời
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default EventContent;
