import React from "react";
import greetingsData from "../../pages/greetings/greetingsData.json";

const Footer = ({isScrollDown}) => {
  const { greetingsJson } = greetingsData;
  const bottomText = (
    <>
      <span>{greetingsJson.spanMain}</span>
      <span>{greetingsJson.spanSub}</span>
    </>
  );

  return (
    <div
      className={
        "VideoList-fixedBottom" +
        (!isScrollDown ? " VideoList-fixedBottomHidden" : "")
      }
    >
      <div className="VideoList-bottomText">{bottomText}</div>
      <a
        className="VideoList-contactUs"
        href="https://wa.me/919001985566?text=I%20want%20to%20join%20your%20movement."
        target="_blank"
      >
        Contact Us
      </a>
    </div>
  );
};

export default Footer;
