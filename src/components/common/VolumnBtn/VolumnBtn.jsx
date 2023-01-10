import React from "react";
import PropTypes from "prop-types";
import Layout from "../../Layout/Layout";
import "./VolumnBtn.css";

const VolumnBtn = ({ hidden, handleClick, isMuted, component, item }) => {
  return (
    <Layout>
      <button
        style={
          component === "HomePageDesktop"
            ? {
                right: "0",
                top: "unset",
                bottom: window.innerWidth < 768 ? "-25px" : "-40px",
                zIndex: "999",
              }
            : component === "MemberCarousel" && window.innerWidth > 768
            ? { right: "38px", bottom: "2px", top: "unset" }
            : null
        }
        hidden={hidden}
        type="button"
        className={"unmuteBtn"}
        onClick={() => handleClick(!isMuted)}
        id="unmuteButton"
      >
        {component === "HomeCarousel" ? null : (
          <span className="targetText">
            {isMuted ? "Tap to unmute" : "Tap to Mute"}
          </span>
        )}
        <i className={`icon icon-${isMuted ? "mute" : "unmute"}`} />
      </button>
    </Layout>
  );
};

export default VolumnBtn;

VolumnBtn.defaultProps = {
  hidden: false,
};

VolumnBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isMuted: PropTypes.bool.isRequired,
  hidden: PropTypes.bool,
};
