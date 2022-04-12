import React, { useState } from "react";
import "./postImgUploadDiv.scss";

function PostImgUpload({ preview, setFileRef, open }) {
  const [previewURL, setPreviewUrl] = preview;
  return (
    <div className="fileUpload">
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
    </div>
  );
}

export default PostImgUpload;
