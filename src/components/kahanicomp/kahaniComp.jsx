import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import VideoJS from "../common/VideoJS/VideoJsNew";
import "./kahaniComp.css";
import UploadBox from "./uploadBox";

const KahaniComp = ({value}) => {
  const [width, setWidth] = useState(true);
  const [play, setPlay] = useState(true);


  // setTimeout(() => {
  //   setPlay(true)
  // }, 3000);

  useEffect(() => {
    if (window?.innerWidth < 767) {
      setWidth(false);
    }
    const res = window.addEventListener("resize", () => {
      if (window?.innerWidth > 767) {
        setWidth(true);
      } else {
        setWidth(false);
      }
    });
    return () => {
      window.removeEventListener("resize", res);
    };
  }, []);

  const handleVideo = (e) => {
    // if (play) {
    //   e.target.pause();
    //   setPlay(!play);
    // } else {
    //   e.target.play();
    //   setPlay(!play);
    // }
  };

  if (width) {
    return (
      <div className="kahaniMainDiv">
        <div className="position-relative d-flex  justify-content-around flex-md-row flex-column align-items-center first-page-content">
          <div className="mr-md-3">
            <UploadBox />
          </div>
          <div className="kahanivideoContainer" onClick={handleVideo}>
            <div className=" mobileContianer">
              <div className="videoGreetMain">
                {play && (
                  <VideoJS
                    // onReady={(player) => handlePlayerReady(player)}
                    options={{
                      id: "kahanimainvideo",
                      muted: true,
                      autoplay: true,
                      loop: true,
                      preload: "auto",
                      controls: false,
                      sources: [
                        {
                          src: value,
                          type: "application/x-mpegURL",
                        },
                      ],
                    }}
                    videoProps={{
                      poster:
                        "https://cdn.workmob.com/stories_workmob/images/common/merikahani.jpg",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`section videoSection px-3 position-relative d-flex align-items-center justify-content-center`}
        >
          <img
            style={{ zIndex: 1, maxWidth: "100%", width: "90%" }}
            className="position-relative"
            src="https://cdn.workmob.com/stories_workmob/images/common/merikahani-award.png"
          />
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div
          className={`d-flex pb-4 flex-column justify-content-center align-items-md-center align-items-start pt-md-0 pt-3 section videoSection px-3 promoBanner`}
        >
          <div
            className={`position-relative aboutPageContainers `}
            style={{ alignSelf: "center", zIndex: 2 }}
          >
            <UploadBox />
          </div>
        </div>
        <div
          className={`section videoSection position-relative d-flex align-items-start justify-content-center`}
        >
          <img
            style={{ zIndex: 1, objectFit: "contain" }}
            className="w-100 position-relative"
            src="https://cdn.workmob.com/stories_workmob/images/common/merikahani-award-mobile.png"
          />
          <div
            style={{ bottom: 0, right: 0, zIndex: 5, fontSize: 12 }}
            className="position-absolute text-center text-white"
          >
            <a
              href="https://cdn.workmob.com/stories_workmob/merikahani-award-mobile/merikahani-award-mobile.m3u8"
              // style={styles.btn}
              className="d-flex align-items-center justify-content-center"
            >
              <i className={`icon icon-play`}></i>
            </a>
            Learn More
          </div>
        </div>
      </>
    );
  }
};

export default KahaniComp;
