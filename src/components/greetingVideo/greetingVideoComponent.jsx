import "./greetingVideo.css";
import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import CloseBtn from "../common/CloseBtn/CloseBtn";
import VolumnBtn from "../common/VolumnBtn/VolumnBtn";
import { logo } from "../../constants/requiredAssets";
import SuggestedVideo from "../suggestedvideo/suggestedVideo";
import greetingsData from "../../pages/greetings/greetingsData.json";
import "../commonHeading/commonHeading.css";
import SkeletonVideoThumbnail from "../common/skeleton/videoThumbnail";

const GreetingVideoComponent = (props) => {
  const { userData, storySlug, suggestedVideoData } = props;
  const [isMuted, toggleMute] = useState(true);
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const previousUrl = useRef(userData.video_url_landscape);
  const categoryName = userData.storyType
    .toLowerCase()
    .replace(/_/g, "-")
    .replace(/ /, "-");

  const handlePlayerReady = (player) => {
    playerRef.current = player;
    player.on("waiting", () => {
      // console.log("player is waiting");
    });
    player.on("dispose", () => {
      // console.log("player will dispose");
    });
    player.autoplay(previousUrl.current === userData.video_url_landscape);
  };

  useEffect(() => {
    const player = playerRef.current;
    if (!!player) {
      if (previousUrl.current === userData.video_url_landscape) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [props]);

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const player = (playerRef.current = videojs(
        videoElement,
        userData.video_url_landscape,
        () => {
          handlePlayerReady(player);
        }
      ));
    } else {
      const player = playerRef.current;
      player.autoplay(userData.video_url_landscape.autoplay);
      player.src(userData.video_url_landscape);
    }
    return () => {
      const player = playerRef.current;
      player.pause();
    };
  }, [props]);

  function errorHandler(event) {
    if (event.target.error) {
      event.target.style.background = "black";
      event.target.style.opacity = "60%";
    } else {
      event.target.style.background = "none";
      event.target.style.opacity = 1;
    }
  }

  const { greetingsJson } = greetingsData;
  const heading = greetingsJson.heading;
  const tagline = greetingsJson.tagline;
  const paragraph = greetingsJson.paragraph;


  return (
    <div>
      <CloseBtn locationType={"/"} />
      <section className={`${"verticalScrolling"}`}>
        {/* <div className={"greetingLogo"}>
          <img src={logo} alt="workmob" />
        </div> */}

        <div className="greet-div">
          <h1 className={"VideoList-title"}>{heading}</h1>
          <h3 className="VideoList-tagline common-line">{tagline}</h3>
        </div>
        <div className={"videoContainer"}>
          <video-js
            className="video-js vjs-default-skin vjs-big-play-centered"
            ref={videoRef}
            controls={false}
            playsInline
            autoPlay={true}
            muted={isMuted}
            id="profile_video"
            preload="auto"
            onError={errorHandler}
          >
            <track hidden kind="captions" />
            <source
              type="application/x-mpegURL"
              src={userData.video_url_landscape}
            />
          </video-js>
          {/* <VolumnBtn handleClick={toggleMute} isMuted={isMuted} /> */}
        </div>
        <h3 className="greeting-heading-header">
          {userData && userData.storyHeading}
        </h3>
        
        {
          userData?.fullStory &&
          <div
            className="greeting-subheading"
            dangerouslySetInnerHTML={{ __html: userData?.fullStory }}
          />

        }

        {!!storySlug && (
          <a
            className="GreetingVideoComponent-fullStoryLink"
            target="_blank" href={`https://stories.workmob.com/${storySlug}`} >
            View my page
          </a>
        )}
        <SuggestedVideo categoryName={categoryName} suggestedVideoData={suggestedVideoData} />
      </section>
    </div>
  );
};

export default GreetingVideoComponent;

GreetingVideoComponent.propTypes = {
  userData: PropTypes.object.isRequired,
};
