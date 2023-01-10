import React from "react";
import "./videoThumbnail.css";
const SkeletonVideoThumbnail = () => {
  return (
    <div id="thumb_container">
      {Array.from({ length: 9 }, (v, i) => (
        <div key={i} className="skeleton" id="thumbnail"></div>
      ))}
    </div>
  );
};
export default SkeletonVideoThumbnail;
