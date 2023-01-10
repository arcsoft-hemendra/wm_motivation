import React, { useRef } from "react";
import "./socialshare.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { useLocation } from "react-router-dom";

const Socialshare = ({ storyHeading, emailSub, emailText }) => {
  const { pathname } = useLocation();
  const hiddenInputRef = useRef();

  const HOST = "https://www.workmob.com";
  const iconSize = 30;
  const shareUrl = HOST + pathname;

  const copyHref = () => {
    const input = hiddenInputRef.current;
    input.value = window.decodeURIComponent(window.location.href);
    input.hidden = false;
    input.select();
    input.focus();
    document.execCommand("copy");
    input.hidden = true;
    input.value = "";
  };

  return (
    <div className="mb-0 mt-2 social-share">
      <div className="">
        <ul className="navbar-nav flex-md-column flex-row justify-content-center">
          <li
            className="nav-item pr-3 pb-2 cstm-tooltip fb"
            data-tooltip-position="left"
            data-tooltip="Share on Facebook"
          >
            <FacebookShareButton url={shareUrl}>
              <FacebookIcon size={iconSize} round />
            </FacebookShareButton>
          </li>
          <li
            className="nav-item pr-3 pb-2 cstm-tooltip whatsapp"
            data-tooltip-position="left"
            data-tooltip="Share on Whatsapp"
          >
            <WhatsappShareButton
              url={shareUrl}
              title={storyHeading}
              separator={" : "}
            >
              <WhatsappIcon size={iconSize} round />
            </WhatsappShareButton>
          </li>
          <li
            className="nav-item pr-3 pb-2 cstm-tooltip linkedin"
            data-tooltip-position="left"
            data-tooltip="Share on Linkedin"
          >
            <LinkedinShareButton title={storyHeading} url={shareUrl}>
              <LinkedinIcon size={iconSize} round />
            </LinkedinShareButton>
          </li>
          <li
            className="nav-item pr-3 pb-2 cstm-tooltip twitter"
            data-tooltip-position="left"
            data-tooltip="Share on Twitter"
          >
            <TwitterShareButton url={shareUrl}>
              <TwitterIcon size={iconSize} round />
            </TwitterShareButton>
          </li>
          <li
            className="nav-item pr-3 pb-2 cstm-tooltip email"
            data-tooltip-position="left"
            data-tooltip="Email"
          >
            <EmailShareButton
              // url={` - ${copyLink}`}
              subject={emailSub}
              body={`${emailText}`}
            >
              <EmailIcon size={iconSize} round />
            </EmailShareButton>
          </li>
          <li
            className="nav-item pr-0 pb-2 cstm-tooltip copy"
            data-tooltip-position="left"
            data-tooltip="Copy"
          >
            <button
              id="copy"
              onClick={copyHref}
              className="rounded-circle d-flex align-items-center justify-content-center border-0"
              style={{
                width: iconSize,
                height: iconSize,
                background: "purple",
              }}
            >
              <img
                width={window.innerWidth < 768 ? 20 : 12}
                src="https://cdn.workmob.com/stories_workmob/images/common/link.svg"
              />
              <input type="text" ref={hiddenInputRef} hidden />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Socialshare;
