import React, { useState } from "react";
import "./Login.scss";
import { AiOutlineUser } from "react-icons/ai";
import { FiKey, FiShare2, FiSmile } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import { BsPeople } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const login = () => {
    if (email === "" || password === "") {
      return alert("vui lòng nhập đầy đủ thông tin");
    }
    axios
      .post("http://localhost:5000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data === "sai tai khoan") {
          alert("sai tài khoản mật khẩu!");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userID", res.data.userInfo._id);
          localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          console.log(JSON.parse(localStorage.getItem("userInfo")));
          navigate("/");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="login_container">
      <div className="login_box">
        <div className="join_us">
          <p>Join us</p>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <FiShare2></FiShare2>
            </div>
            <div>
              <h3>Share your story</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <BiMessage></BiMessage>
            </div>
            <div>
              <h3>Comment</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
          <div className="join_us_tag">
            <div className="join_us_icon">
              <BsPeople></BsPeople>
            </div>
            <div>
              <h3>Connect</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>

          <div className="join_us_tag">
            <div className="join_us_icon">
              <FiSmile></FiSmile>
            </div>
            <div>
              <h3>Be better</h3>
              <h4>At vero eos et accusamus et.</h4>
            </div>
          </div>
        </div>

        <div className="login_tag">
          <div className="logo">
            <img
              src="https://yu.ctu.edu.vn/images/upload/article/2020/03/0305-logo-ctu.png"
              alt="logo"
            ></img>
            <p>Đăng Nhập</p>
          </div>
          <div className="input">
            <div className="icon">
              <AiOutlineUser></AiOutlineUser>
            </div>
            <input
              type="email"
              placeholder="Email or username"
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
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className="Remember_forget_pass">
            <div className="Remember_pass">
              <input type="checkbox"></input>
              <p>Remember</p>
            </div>
            <div className="forget_pass">
              <a href="#">Foget password?</a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              login();
            }}
          >
            Log in to your account
          </button>
          <Link to="/signup">
            <p>Don't have a account?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Login;
