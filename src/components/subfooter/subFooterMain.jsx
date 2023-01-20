import React from "react";
import { useState } from "react";

const SubFooterMain = ({ insightpage }) => {
  const categoryList = [
    "PROFESSIONALS",
    "CREATORS",
    "BUSINESS OWNERS",
    "SHOPKEEPERS",
    "SOCIAL WORKERS",
    "YOU",
  ];
  const [category] = useState(categoryList[5]);

  return (
    <>
      <div className={"page-footer my-3 pb-0"}>
        <div className={insightpage ? "container" : ""}>
          <div className="row">
            <div className="col-12 w-100">
              <div
                className={
                  "applinks" + (false ? "" : " d-none d-md-flex") + " ml-md-0"
                }
                style={{ marginBottom: "1rem" }}
              >
                <a
                  href="https://play.google.com/store/apps/details?id=com.workmob"
                  target="_blank"
                  className=""
                  style={{ marginRight: "1rem" }}
                >
                  <img
                    className="w-100"
                    src="https://cdn.workmob.com/stories_workmob/web_home/googleplaystore.png"
                    alt="play store badge"
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/workmob-professional-network/id901802570"
                  target="_blank"
                >
                  <img
                    className="w-100"
                    src="https://cdn.workmob.com/stories_workmob/web_home/appstore.png"
                    alt="app store badge"
                  />
                </a>
              </div>
              <div className="d-flex align-items-center justify-content-between flex-md-row flex-column">
                <div className="d-flex flex-md-row flex-column">
                  <div
                    style={{
                      fontSize: "12px",
                      alignItems: "end",
                      display: "flex",
                      marginRight: "1rem",
                    }}
                    className="footer-copyright text-white mr-md-3 order-1 order-md-0"
                  >
                    &copy; {new Date().getFullYear()} Workmob Pvt. Ltd. All
                    rights reserved.
                  </div>
                  <div className="mb-2 mb-md-0">
                    <a
                      href="https://www.workmob.com/about"
                      target="_blank"
                      className="footerLink"
                      style={{ marginRight: "0.5rem" }}
                    >
                      About
                    </a>
                    <a
                      href="https://www.workmob.com/terms"
                      target="_blank"
                      className="footerLink"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Terms
                    </a>
                    <a
                      className="footerLink"
                      href="https://www.workmob.com/legal"
                      target="_blank"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Legal
                    </a>
                    <a
                      className="footerLink"
                      href="https://www.workmob.com/privacy"
                      target="_blank"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Privacy
                    </a>
                    <a
                      className="footerLink"
                      href="https://www.workmob.com/brand-ambassador"
                      target="_blank"
                      style={{ marginRight: "0.5rem" }}
                    >
                      Ambassador
                    </a>
                  </div>
                </div>
                <div className="footer-social text-nowrap">
                  <a
                    href="https://www.facebook.com/workmobapp/"
                    target="_blank"
                    className="btn btn-social-icon bg-transparent"
                  >
                    <img
                      src="https://cdn.workmob.com/stories_workmob/images/common/facebook.svg"
                      alt="fb"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/workmobapp/"
                    target="_blank"
                    className="btn btn-social-icon bg-transparent"
                  >
                    <img
                      src="https://cdn.workmob.com/stories_workmob/images/common/instagram.svg"
                      alt="instagram"
                    />
                  </a>
                  <a
                    href="https://youtube.com/channel/UCqOjwc1ZJmhy5oJJM3rhziA"
                    target="_blank"
                    className="btn btn-social-icon bg-transparent"
                  >
                    <img
                      src="https://cdn.workmob.com/stories_workmob/images/common/youtube.svg"
                      alt="youtube"
                    />
                  </a>
                  <a
                    href="https://twitter.com/Workmob"
                    target="_blank"
                    className="btn btn-social-icon bg-transparent"
                  >
                    <img
                      src="https://cdn.workmob.com/stories_workmob/images/common/twitter.svg"
                      alt="twitter"
                    />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/workmobapp/"
                    target="_blank"
                    className="btn btn-social-icon bg-transparent"
                  >
                    <img
                      src="https://cdn.workmob.com/stories_workmob/images/common/linkedin.svg"
                      alt="linkedin"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="HomePageFooter">
        <div className="newMainContainer">
          <div className="newMainMiddle">
            <p className={"HomePageFooter-meriKahani"}>
              <span style={{ color: "#FF9933" }}>#</span>
              <span style={{ color: "#ffffff" }}>आ</span>
              <span style={{ color: "#128807" }}>शा</span>
              <span className="bottomBorder"></span>
            </p>
            {/* <img
              className="HomePageFooter-karmayogiFestival"
              src="https://cdn.workmob.com/stories_workmob/promotional/karmyogiyo-ka-utsav.png"
              alt="karmayogion ka utsav image"
            /> */}
            <p
              className="HomePageFooter-celebrating"
              // ref={celebratingElemRef}
            >
              प्रेरणादायक सोच एवं विचार।
              {/* <span
                className="HomePageFooter-category"
                // ref={categoryElemRef}
              >
               खुशियाँ फैलाएं।  अपनी पहचान बनाएं।
              </span> */}
            </p>
            <p className="HomePageFooter-titleBox">
            आओ हम सब मिलकर अपने प्रेरक विचारों से देशवासियों के जीवन में उम्मीद का एक नया दीया जलाएं। आप भी अपने प्रेरणादायक वीडियो संदेश के माध्यम से देशवासियों को जीवन में आगे बढ़ने के लिए प्रेरित एवं प्रोत्साहित करें एवं अपने व्यक्तिगत ब्रांड को आगे बढ़ाएं।
            </p>
            <p className="HomePageFooter-banaoApniPehchan">
              <span style={{ color: "#F96332" }}>बनाओ </span>
              <span style={{ color: "#ffffff" }}>अपनी </span>
              <span style={{ color: "#128807" }}>पहचान</span>
            </p>
          </div>
        </div>
        <div className="bottomContent">
          <a
            href="https://play.google.com/store/apps/details?id=com.workmob"
            target="_blank"
            className="d-block d-md-none appLinknew"
          >
            <img
              className="w-100"
              src="https://cdn.workmob.com/stories_workmob/web_home/googleplaystore.png"
              alt="play store badge"
            />
          </a>
          <p
            className="d-none d-md-block"
            style={{ flex: "1", textAlign: "left", color: "white" }}
          >
            Lets Inspire Together
          </p>
          <p className="HomePageFooter-madeWithLove">
            <span>Made with</span>
            <img
              src="https://www.workmob.com/static/media/heart.33403302.svg"
              alt="heart"
              width="12"
              height="12"
            />
            <span>in India</span>
          </p>
          <a
            href="https://apps.apple.com/in/app/workmob-professional-network/id901802570"
            target="_blank"
            className="d-block d-md-none appLinknew"
          >
            <img
              className="w-100"
              src="https://cdn.workmob.com/stories_workmob/web_home/appstore.png"
              alt="app store badge"
            />
          </a>
          <p
            className="d-none d-md-block"
            style={{ flex: "1", textAlign: "right", color: "white" }}
          >
            We can. India can.
          </p>
        </div>
      </div>
    </>
  );
};

export default SubFooterMain;
