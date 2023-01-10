import React, { useEffect, useState } from "react";
import "./../greetings/greetingsHome.css";
import greetingsData from "./../greetings/greetingsData.json";
import Layout from "../../components/Layout/Layout";
import { useLocation } from "react-router-dom";
import VideoThumbnail from "../../components/common/VideoThumbnail/videothumbnail";
import Footer from "../../components/footer/greetingsFooter";
import FooterScroller from "../../components/fixedscrollbar/footerScroller";

const Categorypagesingle = () => {
  const { pathname } = useLocation();
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [activeClass, setActiveClass] = useState(null);
  const categoryName = pathname.split("/").slice(2);
  const { greetingsJson } = greetingsData;
  const heading = greetingsJson.heading;
  const tagline = greetingsJson.tagline;
  const paragraph = greetingsJson.paragraph;
  const bottomText = (
    <>
      <span>{greetingsJson.spanMain}</span>
      <span>{greetingsJson.spanSub}</span>
    </>
  );

  // Handling categories api
  useEffect(() => {
    fetch(
      `https://cdn.workmob.com/stories_workmob/config/hope-category.json`
    ).then((res) =>
      res.json().then((result) => {
        setCategoryList(result);
        const resultData = [...result]
          .reverse()
          .findIndex((item) => item.category === categoryName[0]);
        setActiveClass(resultData);
      })
    );
  }, []);


  useEffect(() => {
    // Here we are handling the state for footer ups and down
    let lastScroll;
    let isThrottle;
    function listenScroll() {
      if (isThrottle) return;
      isThrottle = true;
      setTimeout(() => {
        const currentScroll = window.scrollY;
        if (lastScroll < currentScroll) {
          setIsScrollDown(true);
        } else {
          setIsScrollDown(false);
        }
        lastScroll = currentScroll;
        isThrottle = false;
      }, 100);
    }
    document.addEventListener("scroll", listenScroll);
    return () => {
      document.removeEventListener("scroll", listenScroll);
    };
  }, []);

  return (
    <Layout>
      <div className="VideoList">
        {/* <Helmet> */}
          {/* <meta name="description" content={metaDescription} />
          <title>{documentTitle}</title> */}
        {/* </Helmet> */}

        {/* Handling top header bar where video element and other heading */}
        <div>
          <h1 className={"VideoList-title VideoList-greetingsTitle"}>
            {heading}
          </h1>
          <h3 className="VideoList-tagline">{tagline}</h3>
          <p className="VideoList-paragraph">{paragraph}</p>
        </div>

        {/* Handling the video cards */}
        {!!categoryName && (
          <VideoThumbnail
            categoryName={categoryName}
          />
        )}

        {/* Handling the fixed category card */}
        {
          <FooterScroller
            isScrollDown={isScrollDown}
            categoryList={categoryList}
            activeClass={activeClass}
            setActiveClass={setActiveClass}
          />
        }

        {/* Handling the footer of application */}
        {<Footer bottomText={bottomText} isScrollDown={isScrollDown} />}
      </div>
    </Layout>
  );
};

export default Categorypagesingle;
