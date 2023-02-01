import "./greetingsHome.css";
import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "../../components/Layout/Layout";
import greetingsData from "./greetingsData.json";
import HeaderVideoBar from "../../components/headerVideoBar/headerVideoBar";
import TopVideoHeader from "../../components/topVideo/topVideoHeader";
import CategoryCardMain from "../../components/categorycard/categoryCardMain";
import InsightComp from "../../components/insights/insightcomp";
import SubFooterMain from "../../components/subfooter/subFooterMain";
import Footer from "../../components/footer/greetingsFooter";

const GreetingsHome = () => {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [widthCheck, setWidthCheck] = useState(null);
  const { greetingsJson } = greetingsData;
  const documentTitle = greetingsJson.documentTitle;
  const metaDescription = greetingsJson.metaDescription;

  // Handling GGM header video and footer ups downs and width handling using eventlistner
  useEffect(() => {
    //Clearing the sessionstorage
    sessionStorage.removeItem("/search");

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

  // Handling width
  useEffect(() => {
    // Here we are checking the width for main category card showing condition
    if (window.innerWidth < 950) {
      setWidthCheck(true);
    }
    const widthCheck = () => {
      if (window.innerWidth > 950) {
        setWidthCheck(false);
      } else {
        setWidthCheck(true);
      }
    };
    window.addEventListener("resize", widthCheck);
    return () => {
      window.removeEventListener("resize", widthCheck);
    };
  }, []);

  return (
    <Layout>
      <div className="VideoList">
        <HelmetProvider>
          <Helmet>
            <meta name="description" content={metaDescription} />
            <title>{documentTitle}</title>
          </Helmet>
        </HelmetProvider>

        {/* Handling top header bar where video element and other heading */}
        <HeaderVideoBar />

        {/* Handling the top videos*/}
        <TopVideoHeader widthCheck={widthCheck} />

        {/* Handling the category card */}
        {/* {<CategoryCardMain widthCheck={widthCheck} />} */}

        {/* Handling the insights data of Greetings and Gyan */}
        {<InsightComp />}

        {/* Handling the Sub-footer */}
        <SubFooterMain />

        {/* Handling the footer of application */}
        {<Footer isScrollDown={!isScrollDown} />}
      </div>
    </Layout>
  );
};

export default GreetingsHome;
