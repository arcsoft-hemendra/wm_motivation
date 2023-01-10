import React from "react";
import "../../greetingVideo/greetingVideo.css";
import "./GreetingVideo.css";
import SkeletonVideoThumbnail from "./videoThumbnail";
const SkeletonGreetingVideo = () => {
  return (
    <div>
      <section className={`${"verticalScrolling"}`}>
        <div
          className={"videoContainer skeleton"}
          id="skeleton_Container"
        ></div>
        <div id="skeleton_video"></div>
        <SkeletonVideoThumbnail />
      </section>
    </div>
  );
};

export default SkeletonGreetingVideo;
