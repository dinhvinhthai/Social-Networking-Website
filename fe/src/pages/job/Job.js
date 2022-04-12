import React, { useState, useEffect, useContext } from "react";
import "./job.scss";
import Nav from "../../component/nav/Nav";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import CreateNewJob from "../../component/createNewJob/CreateNewJob";
import JobTag from "../../component/jobTag/JobTag";

function Job() {
  const [open, setOpen] = useState(false);
  const [jobDetails, setJobDetails] = useState([]);
  const [user] = useContext(UserContext);
  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/jobs/all",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setJobDetails(res.data.jobsQuery);
      })
      .catch((err) => { });
  }, [open]);
  return (
    <div className="job_container">
      <Nav></Nav>
      <div className="left_job">
        {user?.isAdmin && (
          <div
            className="item"
            onClick={() => {
              setOpen(true);
            }}
          >
            <span>Tạo tuyển dụng mới</span>
          </div>
        )}
        <div className="item">
          <span>Tuyển dụng hiện tại</span>
        </div>       
      </div>
      <div className="center_job">
        {jobDetails?.reverse().map((jobI, index) => (
          <JobTag jobI={jobI} key={index}></JobTag>
        ))}
      </div>   
      {open ? <CreateNewJob setOpen={setOpen}></CreateNewJob> : ""}
    </div>
  );
}
export default Job;
