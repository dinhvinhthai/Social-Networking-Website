import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import "./EventTag.scss";
import axios from "axios";

function EventTag(eventI) {
  const user = localStorage.getItem("userID");
  const [join, setJoin] = useState(
    eventI.eventI.joins.some((item) => item === user)
  );

  const joinEvent = () => {
    axios
      .post(
        `http://localhost:5000/api/events/join `,
        {
          eventId: eventI.eventI._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJoin(true);
      })
      .catch((err) => {});
  };

  const notjoins = () => {
    axios
      .post(
        `http://localhost:5000/api/events/join `,
        {
          eventId: eventI.eventI._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJoin(false);
      })
      .catch((err) => {});
  };
  return (
    <div className="event_tag">
      <img
        src={`http://localhost:5000/images/${eventI?.eventI?.img}`}
        className="cover"
      ></img>
      <div className="time">
        {eventI?.eventI?.startTime ? (
          <span>{eventI.eventI.startTime}</span>
        ) : (
          ""
        )}
      </div>
      <Link to={`/eventContent/${eventI.eventI._id}`}>
        <div className="title">
          {eventI?.eventI?.eventName ? (
            <span>{eventI.eventI.eventName}</span>
          ) : (
            "không có tên"
          )}
        </div>
      </Link>
      <div className="button_join">
        {join ? (
          <button
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
      </div>
    </div>
  );
}
export default EventTag;