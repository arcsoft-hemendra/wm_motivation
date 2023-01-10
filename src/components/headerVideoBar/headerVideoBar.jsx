import React, { useState, useEffect, useRef } from "react";
import VideoJS from "../common/VideoJS/VideoJsNew";
import Header from "../header/header";

const HeaderVideoBar = () => {
  const [videoTopMain, setVideoTopMain] = useState({});
  const [playVideo, setPlayVideo] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    fetch(
      ` https://cdn.workmob.com/stories_workmob/web_home/about-new-08-april.json`
    ).then((res) =>
      res.json().then((result) => {
        const data = result.web.find((item) => item.type === "profile");
        setVideoTopMain(data);
      })
    );

  }, []);

  // Handling the play and pause of header video
  useEffect(() => {
    if (playVideo) {
      videoRef?.current?.play();
    } else {
      videoRef?.current?.pause();
    }
  }, [playVideo]);

  // Here we are handling the state for play and pause of top header video
  const handleToggle = (event) => {
    if (event.target.tagName === "VIDEO") {
      videoRef.current = event.target;
      setPlayVideo(!playVideo);
    }
  };

  return (
    <>
      {videoTopMain.video && (
        <div
          className="Categories-videoContainer"
          onClick={(event) => handleToggle(event)}
        >
          <Header heading={"आशा"} />
          <div
            className="paddingClassVideo"
            style={{ paddingTop: "46.87%" }}
          ></div>
          <VideoJS
            options={{
              id: "headermainvideo",
              muted: true,
              autoplay: "muted",
              loop: true,
              preload: "metadata",
              controls: false,
              sources: [
                {
                  src: videoTopMain.video,
                  type: "application/x-mpegURL",
                },
              ],
            }}
            videoProps={{
              poster: videoTopMain.background,
            }}
          />
        </div>
      )}
    </>
  );
};

export default HeaderVideoBar;
