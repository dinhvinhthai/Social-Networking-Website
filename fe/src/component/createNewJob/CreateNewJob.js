import React, { useState, useEffect, useContext } from "react";
import "./createNewJob.scss";
import { BsPenFill, BsImages, BsCloudArrowUpFill } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import { RiMapPinFill } from "react-icons/ri";
import { UserContext } from "../../context/userContext";
import axios from "axios";

function CreateNewJob({ setOpen }) {
  const [startTime, setStartTime] = useState("");
  const [jobName, setJobName] = useState("");
  const [desc, setDesc] = useState("");
  //const [img, setImg] = useState("");
  const [location, setLocation] = useState("");
  const [participants, setParticipants] = useState("");
  const [link, setLink] = useState("");
  const [duration, setDuration] = useState("");
  const [user] = useContext(UserContext);
  const [fileRef, setFileRef] = useState(null);
  const [previewURL, setPreviewUrl] = useState(null);

  const createJob = () => {
    var formData = new FormData();
    formData.append("userId", user._id);
    formData.append("startTime", startTime);
    formData.append("jobName", jobName);
    formData.append("desc", desc);
    formData.append("location", location);
    formData.append("participants", participants);
    formData.append("link", link);
    formData.append("duration", duration);
    formData.append("jobImg", fileRef);
    axios
      .post(`http://localhost:5000/api/jobs/createOne`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        alert("thành công ");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="create_job">
      <div className="exit">
        <button
          onClick={() => {
            setOpen(false);
          }}
        >
          X
        </button>
      </div>

      <div className="pic_cover">
        {previewURL ? (
          <img className="cover" src={previewURL} alt=""></img>
        ) : (
          <BsImages></BsImages>
        )}
      </div>

      <div className="choose_img">
        <input
          id="file-upload"
          type="file"
          name="photo"
          onChange={function (e) {
            if (e.target.files[0]) {
              setPreviewUrl(URL.createObjectURL(e.target.files[0]));
              setFileRef(e.target.files[0]);
            }
          }}
        />
      </div>

      <div className="create_details">
        <div className="time_job">
          <div className="starttime">
            <input
              type="date"
              placeholder="Hạn chót"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
              }}
            ></input>
            <BiTimeFive></BiTimeFive>
          </div>
        </div>
        <div className="item_details">
          <input
            type="text"
            placeholder="Tiêu đề"
            value={jobName}
            onChange={(e) => {
              setJobName(e.target.value);
            }}
          ></input>
          <BsPenFill></BsPenFill>
        </div>
        <div className="item_details">
          <input
            type="text"
            placeholder="Đia điểm tuyển dụng"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          ></input>
          <RiMapPinFill></RiMapPinFill>
        </div>
        <div className="item_details">
          <input
            type="text"
            placeholder="Đối tượng tuyển dụng"
            value={participants}
            onChange={(e) => {
              setParticipants(e.target.value);
            }}
          ></input>
          <BsPenFill></BsPenFill>
        </div>
        <div className="item_details">
          <input
            type="text"
            placeholder="Link"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
          ></input>
          <BsPenFill></BsPenFill>
        </div>
        <div className="item_contents">
          <textarea
            type="text"
            placeholder="Nội dung tuyển dụng"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>
        <div className="button_create">
          <button
            onClick={() => {
              createJob();
            }}
          >
            Tạo tuyển dụng
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateNewJob;
