import React, { useState, useEffect, useContext } from "react";
import "./updatePost.scss";
import { BsPenFill, BsImages, BsCloudArrowUpFill } from "react-icons/bs";
import axios from "axios";

function UpdatePost({ setOpenUpdate, post }) {
  console.log(post);
  const [defaultDesc, setDefaultDesc] = useState(post.desc);
  const [defaultFiledefaultDescef, setDefaultFiledefaultDescef] = useState(post.img);
  const [desc, setDesc] = useState(post.desc);
  const [fileRef, setFileRef] = useState(post.img);
  const [previewURL, setPreviewUrl] = useState("http://localhost:5000/images/" + post.img);

  const updatePosts = () => {
    var formData = new FormData();
    if (defaultFiledefaultDescef === fileRef && defaultDesc === desc) {
      alert("Phải cập nhật ảnh hoặc text.");
      return;
    }
    formData.append("desc", desc);
    formData.append("img", fileRef);
    axios
      .patch(`http://localhost:5000/api/posts/${post._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        window.location.reload();
        // alert("thành công ");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="update_post">
      <div className="title">Cập nhật bài viết</div>
      <div className="exit">
        <button
          onClick={() => {
            setOpenUpdate(false);
          }}
        >
          X
        </button>
      </div>     

      <div className="update_details">
        <div className="item_details">
          <input
            type="text"
            placeholder="Nội dung cập nhật..."
            value={desc}
            onChange={(e) => {
                setDesc(e.target.value);
            }}
          ></input>
          <BsPenFill></BsPenFill>
        </div>
        <div className="item_details">
        <input
          id="file-upload"
          type="file"
          name="photo"
          onChange={function (e) {
            {console.log(e.target.files[0]);
            console.log(fileRef)}
            if (e.target.files[0] !== fileRef) {
              setPreviewUrl(URL.createObjectURL(e.target.files[0]));
              setFileRef(e.target.files[0]);
            }
          }}
        />
          <BsPenFill></BsPenFill>
        </div>
        <div className="pic_cover">
        {previewURL ? (
          <img className="cover" src={previewURL} alt=""></img>
        ) : (
          <BsImages></BsImages>
        )}
        </div>
        <div className="button_update">
          <button
            onClick={() => {
              updatePosts();
              setOpenUpdate(false);
            }}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
export default UpdatePost;
