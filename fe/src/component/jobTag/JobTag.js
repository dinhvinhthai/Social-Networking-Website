import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./jobTag.scss";

function JobTag(jobI) {
  const user = localStorage.getItem("userID");

  return (
    <div className="job_tag">
      <img
        src={`http://localhost:5000/images/${jobI?.jobI?.img}`}
        className="cover"
      ></img>
      <div className="time">
        {jobI?.jobI?.startTime ? (
          <span>{jobI.jobI.startTime}</span>
        ) : (
          ""
        )}
      </div>
      <Link to={`/jobContent/${jobI.jobI._id}`}>
        <div className="title">
          {jobI?.jobI?.jobName ? (
            <span>{jobI.jobI.jobName}</span>
          ) : (
            "không có tên"
          )}
        </div>
      </Link>
    </div>
  );
}
export default JobTag;
