import axios from "axios";
import React, { useRef, useState } from "react";
import "./photoUpload.scss";

function PhotoUpload({ open, type }) {
  const [previewURL, setPreviewUrl] = useState(
    "/stocks/img/avatar/avatarDefault.jpg"
  );
  const fileRef = useRef(null);

  const uploadAvatar = (e) => {
    const userId = localStorage.getItem("userID");
    if (fileRef.current.files.length === 0) return;
    var formData = new FormData();
    formData.append("avatar", fileRef.current.files[0]);
    axios.post(
      `http://localhost:5000/api/users/upload/${type}/${userId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // axios.post();
  };

  return (
    <form className="fileupload">
      <div className="fileupload-container">
        <h1>Cập nhật ảnh đại diện</h1>
        <button
          className="exit"
          onClick={(e) => {
            e.preventDefault();
            open(false);
          }}
        >
          X
        </button>
        <input
          ref={fileRef}
          type="file"
          name="photo"
          onChange={function (e) {
            if (e.target.files[0]) {
              setPreviewUrl(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        <img src={previewURL} className="photo-preview" />
        <button
          className="uploadBtn"
          onClick={(e) => {
            uploadAvatar(e);
          }}
        >
          Cập nhật
          </button>
      </div>
    </form>
  );
}

export default PhotoUpload;
