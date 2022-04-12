import React, { useEffect, useState } from "react";
import "./UserIntro.scss";
import { FaUserAlt, FaBirthdayCake } from "react-icons/fa";

import { HiUserGroup } from "react-icons/hi";
import { GiGraduateCap } from "react-icons/gi";
import { MdWhereToVote } from "react-icons/md";
import { RiFileUserFill } from "react-icons/ri";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserIntro({ setOpen }) {
  const [userInfo, setUserInfo] = useState({});
  const [userName, setUsername] = useState("");
  const [MSSV, setmssv] = useState("");
  const [dayOfBirth, setdayofbirth] = useState("");
  const [Class, setClass] = useState("");
  const [yearKey, setyearkey] = useState("");
  const [majorName, setMajorname] = useState("");
  const [city, setCity] = useState("");
  const [distrist, setdistrist] = useState("");
  const param = useParams();

  useEffect(() => {
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users//getone/${param.userId}`)
        .then((res) => {
          setUserInfo(res.data);
          setUsername(res.data.userName);
          setmssv(res.data.MSSV);
          setdayofbirth(
            new Date(res.data.dateOfBirth).toLocaleDateString("en-US")
          );
          setClass(res.data.major.class);
          setyearkey(res.data.major.yearKey);
          setMajorname(res.data.major.majorName);
          setCity(res.data.address.city);
          setdistrist(res.data.address.distrist);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, []);

  const UserIntro = () => {
    if (
      userName === "" ||
      MSSV === "" ||
      Class === "" ||
      majorName === "" ||
      yearKey === "" ||
      dayOfBirth === "" ||
      city === "" ||
      distrist === ""
    ) {
      return;
    }
    const dateFormat = new Date(dayOfBirth).getTime();
    axios
      .patch(`http://localhost:5000/api/users/${param.userId}`, {
        userId: param.userId,
        userName,
        MSSV,
        major: { class: Class, majorName, yearKey },
        dateOfBirth: dateFormat,
        address: { city, distrist },
      })
      .then((res) => {
        if (res.data === "khong the update user khac") {
        } else {
          alert("cập nhật thành công!");
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <form className="User_Intro">
      <div className="headder">
        <p>Chỉnh sửa thông tin cá nhân</p>
        <div className="buttonExit">
          <button onClick={() => setOpen(false)}>X</button>
        </div>
      </div>
      <hr></hr>
      <div className="intro">
        <div className="userInfos">
          <div className="left">
            <FaUserAlt></FaUserAlt>
            <span>Tên</span>
          </div>
          <input
            value={userName}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            required
          ></input>
        </div>
        <div className="userInfos">
          <div className="left">
            <RiFileUserFill></RiFileUserFill>
            <span>MSSV</span>
          </div>
          <input
            value={MSSV}
            onChange={(e) => {
              setmssv(e.target.value);
            }}
            type="text"
            required
          ></input>
        </div>
        <div className="userInfos">
          <div className="left">
            <FaBirthdayCake></FaBirthdayCake>
            <span>Ngày sinh</span>
          </div>
          <input
            value={dayOfBirth}
            onChange={(e) => {
              setdayofbirth(e.target.value);
            }}
            type="text "
          ></input>
        </div>
        <div className="userInfos">
          <div className="left">
            <HiUserGroup></HiUserGroup>
            <span>Lớp</span>
          </div>
          <div className="input_yearKey">
            <input
              type="text"
              value={Class}
              onChange={(e) => {
                setClass(e.target.value);
              }}
              required
            ></input>
            <div className="yearkey">
              <span>Khóa</span>
              <input
                type="text"
                value={yearKey}
                onChange={(e) => {
                  setyearkey(e.target.value);
                }}
                required
              ></input>
            </div>
          </div>
        </div>
        <div className="userInfos">
          <div className="left">
            <GiGraduateCap></GiGraduateCap>
            <span>Ngành</span>
          </div>
          <input
            type="text"
            value={majorName}
            onChange={(e) => {
              setMajorname(e.target.value);
            }}
            required
          ></input>
        </div>
        <div className="userInfos">
          <div className="left">
            <MdWhereToVote></MdWhereToVote>
            <span>Quê quán</span>
          </div>
          <div className="input_yearKey">
            <input
              type="text"
              placeholder="Tỉnh/ thành phố"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
            ></input>
            <div className="yearkey">
              <input
                type="text"
                placeholder="Quận/huyện"
                value={distrist}
                onChange={(e) => {
                  setdistrist(e.target.value);
                }}
                required
              ></input>
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        onClick={(e) => {
          UserIntro(e);
        }}
      >
        Chỉnh sửa thông tin
      </button>
    </form>
  );
}
export default UserIntro;
