import React, { useEffect, useState, useContext } from "react";
import "./jobContent.scss";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { BsPeopleFill, BsSearch } from "react-icons/bs";
import Nav from "../../component/nav/Nav";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { SocketContext } from "../../context/SocketContext";
function JobContent() {
  const param = useParams();
  const [jobs, setJobs] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const user = localStorage.getItem("userID");
  const [numjoins, setNumjoins] = useState();
  const [join, setJoin] = useState();
  const socket = useContext(SocketContext);
  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/jobs/getOne/${param.id} `,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJobs(res.data.jobsQuery);
        setJoin(res.data.jobsQuery.joins.some((item) => item === user));
        setNumjoins(res.data.jobsQuery.joins.length);
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


  return (
    <div className="jobcontent">
      <Nav></Nav>
      <div className="job_header">
        <img
          src={`http://localhost:5000/images/${jobs.img}`}
          className="cover"
        ></img>
        <div className="time">
          {jobs?.startTime ? <span>{jobs.startTime}</span> : "không có"}
        </div>
        <div className="title">
          {jobs?.jobName ? <span>{jobs.jobName}</span> : ""}
        </div>
      </div>

      <div className="job_details">
        <div className="details_header">
          <span>Chi tiết tuyển dụng</span>
        </div>
        <div className="details">
          {jobs?.desc ? (
            <span>{jobs.desc}</span>
          ) : (
            <span>không có nội dung</span>
          )}

          {jobs?.startTime ? (
            <span>{jobs.startTime}</span>
          ) : (
            <span>chưa thêm thời gian sự kiện nhe bạn ê</span>
          )}
          {jobs?.location ? <span>Địa điểm: {jobs.location}</span> : ""}
          {jobs?.participants ? (
            <span>
              Đối tượng tham gia: {""}
              {jobs.participants}
            </span>
          ) : (
            ""
          )}
          {jobs?.link ? (
            <span>
              Xem chi tiết tại: <a>{jobs.link}</a>
            </span>
          ) : (
            ""
          )}
        </div>
      </div>      
    </div>
  );
}
export default JobContent;
