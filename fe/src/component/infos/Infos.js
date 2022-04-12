import React, { useEffect, useState } from "react";
import "./infos.scss";
import { FaUserAlt, FaBirthdayCake } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GiGraduateCap } from "react-icons/gi";
import { MdWhereToVote } from "react-icons/md";
import { BiBarcodeReader } from "react-icons/bi";
import "./infos.scss";
import Axios from "axios";
import UserIntro from "../SettingProfile/UserIntro";
import { useParams } from "react-router-dom";

function Infos() {
  const [userInfo, setUserInfo] = useState({});
  const [open, setOpen] = useState(false);
  const [majorClass, setMajorClass] = useState("");
  const [majorname, setMajorname] = useState("");
  const [yearkey, setyearkey] = useState("");
  const [city, setCity] = useState("");
  const param = useParams();
  const currentUserId = localStorage.getItem("userID");
  useEffect(() => {
    const getUserInfo = () => {
      Axios.get(`http://localhost:5000/api/users/getone/${param.userId}`)
        .then((res) => {
          setUserInfo(res.data);
          setMajorClass(res.data.major.class);
          setMajorname(res.data.major.majorName);
          setyearkey(res.data.major.yearKey);
          setCity(res.data.address.city);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
    getUserInfo();
  }, [param.userId, open]);
  return (
    <div className="info">
      <p>Giới thiệu</p>
      <div className="info_tag">
        <FaUserAlt></FaUserAlt>
        <p>Tên</p>
        <span>{userInfo.userName ? userInfo.userName : ""}</span>
      </div>

      {userInfo.MSSV ? (
        <div className="info_tag">
          <BiBarcodeReader></BiBarcodeReader>
          <p>MSSV</p>
          <span>{userInfo.MSSV}</span>
        </div>
      ) : (
        ""
      )}

      {userInfo.dateOfBirth ? (
        <div className="info_tag">
          <FaBirthdayCake></FaBirthdayCake>
          <p>Ngày sinh </p>
          <span>
            {userInfo.dateOfBirth
              ? new Date(userInfo.dateOfBirth).toLocaleDateString("en-US")
              : ""}
          </span>
        </div>
      ) : (
        ""
      )}

      {majorClass ? (
        <div className="info_tag">
          <HiUserGroup></HiUserGroup>
          <p>Lớp </p>
          <span>{userInfo.major.class}</span>
        </div>
      ) : (
        ""
      )}
      {majorname ? (
        <div className="info_tag">
          <GiGraduateCap></GiGraduateCap>
          <p>Ngành </p>
          <span>
            {userInfo.major ? userInfo.major.majorName : ""}
            {yearkey ? (
              <span>
                {" "}
                {"Khóa "}
                {userInfo.major ? userInfo.major.yearKey : ""}
              </span>
            ) : (
              ""
            )}
          </span>
        </div>
      ) : (
        ""
      )}
      {city ? (
        <div className="info_tag">
          <MdWhereToVote></MdWhereToVote>
          <p>Quê quán </p>
          <span>
            {userInfo.address ? userInfo.address.city : ""}{" "}
            {userInfo.address ? userInfo.address.distrist : ""}
          </span>
        </div>
      ) : (
        ""
      )}
      {open ? <UserIntro setOpen={setOpen}></UserIntro> : ""}
      {currentUserId === param.userId ? (
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Chỉnh sửa thông tin cá nhân
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Infos;
