import React, { useState } from "react";
import "./postImgUpload.scss";

function PostImgUpload({ preview, setFileRef, open }) {
  const [previewURL, setPreviewUrl] = preview;
  return (
    <form className="fileupload">
      <div className="fileupload-container">
        <h1>Chọn một ảnh</h1>
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
          type="file"
          name="photo"
          onChange={function (e) {
            if (e.target.files[0]) {
              setPreviewUrl(URL.createObjectURL(e.target.files[0]));
              setFileRef(e.target.files[0]);
            }
          }}
        />
        <img src={previewURL} className="photo-preview" />
        <button
          className="uploadBtn"
          onClick={(e) => {
            open(false);
          }}
        >
          Xác nhận
        </button>
      </div>
    </form>
  );
}

export default PostImgUpload;
