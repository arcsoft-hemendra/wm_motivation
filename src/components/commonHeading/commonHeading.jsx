import React from "react";
import greetingsData from "../../pages/greetings/greetingsData.json";
import "./commonHeading.css";

const CommonHeading = () => {
  const { greetingsJson } = greetingsData;
  const heading = greetingsJson.heading;
  const tagline = greetingsJson.tagline;
  const paragraph = greetingsJson.paragraph;


  return (
    <div>
      <h1 className={"VideoList-title"}>{heading}</h1>
      <h3 className="VideoList-tagline">{tagline}</h3>
      {!!paragraph && <p className="VideoList-paragraph">{paragraph}</p>}
    </div>
  );
};

export default CommonHeading;
