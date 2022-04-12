import React, { useState } from "react";
import "./SignUp.scss";
import { AiOutlineMail } from "react-icons/ai";
import { FiKey, FiShare2, FiSmile, FiUser } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import { BsPeople, BsGenderAmbiguous } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [sex, getSex] = useState("0");
  const [dateOfBirth, getDateOfBirth] = useState("");
  let navigate = useNavigate();
  const SignUp = () => {
    if (password === "" || email === "" || username === "") {
      alert("vui lòng điền đầy đủ thông tin!");
    }
    if (!email.includes("ctu.edu.vn")) {
      alert("phải sử dụng email của trường đhct");
    }
    if (password !== passwordConfirm) {
      alert("mật khẩu chưa chính xác");
      return;
    }
    console.log(username, email, password, sex, dateOfBirth);
    axios
      .post("http://localhost:5000/api/auth/register", {
        userName: username,
        email,
        password,
        sex,
        dateOfBirth,
      })
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {});
  };

  return (
    <div className="signup_container">
      <div className="signup_box">
        <div className="signup_tag">
          <div className="logo">
            <img
              src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
              alt="logo"
            ></img>
            <p>Đăng Ký</p>
          </div>
          <div className="input">
            <div className="icon">
              <FiUser></FiUser>
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className="input">
            <div className="icon">
              <AiOutlineMail></AiOutlineMail>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className="input">
            <div className="icon">
              <FiKey></FiKey>
            </div>
            <input
              type="password"
              placeholder=" New password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="input">
            <div className="icon">
              <FiKey></FiKey>
            </div>
            <input
              type="password"
              placeholder="Password Comfirm"
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            ></input>
          </div>
          <div className="gender_dateOfbirth">
            <div className="input_gender">
              <div className="icon">
                <BsGenderAmbiguous></BsGenderAmbiguous>
              </div>
              <select
                value={sex}
                onChange={(e) => {
                  getSex(e.target.value);
                }}
              >
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </div>
            <div className="input_dateOfbirth">
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => {
                  getDateOfBirth(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              SignUp();
            }}
          >
            Log in to your account
          </button>
          <Link to="/login">
            <p>Have an account?</p>
          </Link>
        </div>

        <div className="join_us">
          <p>Join us</p>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <FiShare2></FiShare2>
            </div>
            <div className="join_us_tag_right">
              <h3>Share your story</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <BiMessage></BiMessage>
            </div>
            <div className="join_us_tag_right">
              <h3>Comment</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <BsPeople></BsPeople>
            </div>
            <div className="join_us_tag_right">
              <h3>Connect</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>

          <div className="join_us_smile">
            <div className="join_us_icon">
              <FiSmile></FiSmile>
            </div>
            <div className="join_us_tag_right">
              <h3>Be better</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
