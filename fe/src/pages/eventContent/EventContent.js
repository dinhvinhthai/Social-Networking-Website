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
        message: `M???i tham gia s??? ki???n ${events._id}`,
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
          {events?.startTime ? <span>{events.startTime}</span> : "kh??ng c??"}
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
                <span>???? tham gia</span>
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
            <span>M???i</span>
          </button>
        </div>
      </div>

      <div className="event_details">
        <div className="details_header">
          <span>Chi ti???t s??? ki???n</span>
        </div>
        <div className="details_people">
          <BsPeopleFill className="icon_event" />
          {events?.joins ? (
            <span>{numjoins} Ng?????i tham gia</span>
          ) : (
            "0 ng?????i tham gia"
          )}
        </div>
        <div className="details">
          {events?.desc ? (
            <span>{events.desc}</span>
          ) : (
            <span>kh??ng c?? n???i dung</span>
          )}

          {events?.startTime ? (
            <span>{events.startTime}</span>
          ) : (
            <span>ch??a th??m th???i gian s??? ki???n nhe b???n ??</span>
          )}
          {events?.location ? <span>?????a ??i???m: {events.location}</span> : ""}
          {events?.participants ? (
            <span>
              ?????i t?????ng tham gia: {""}
              {events.participants}
            </span>
          ) : (
            ""
          )}
          {events?.link ? (
            <span>
              Xem chi ti???t t???i: <a>{events.link}</a>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="invite_event">
        <span>Kh??ch m???i</span>
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
                  <span className="joined">???? tham gia</span>
                ) : (
                  <button
                    onClick={() => {
                      sendInvite(results._id);
                    }}
                  >
                    M???i
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
