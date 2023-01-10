import React, { useState } from "react";
import "./categorypage.css";
import "./../searchpage/searchpage.css";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import CloseBtn from "../../components/common/CloseBtn/CloseBtn";
import LoaderComponent from "../../components/common/Loader/Loader";
import CommonHeading from "../../components/commonHeading/commonHeading";
import { Helmet, HelmetProvider } from "react-helmet-async";
import greetingsData from "./../greetings/greetingsData.json";

const Categorypage = () => {
  const [searchString, setSearchString] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [widthCheck, setWidthCheck] = useState(null);
  const [loader, setLoader] = useState(true);
  const { pathname } = useLocation();
  const history = useHistory();
  const { greetingsJson } = greetingsData;
  const documentTitle = greetingsJson.documentTitle;
  const metaDescription = greetingsJson.metaDescription;

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

  // Handling category api
  useEffect(() => {
    setLoader(true);
    const greetingsCategoryApi = fetch(
      `https://cdn.workmob.com/stories_workmob/config/hope-category.json`
    );
    greetingsCategoryApi
      .then((values) => values.json())
      .then((result) => {
        setLoader(false);
        const mainData = result.filter(
          (item) => item.video_landscape_thumb !== ""
        );
        setCategoryList(mainData);
      })
      .catch((err) => console.log(err));
  }, [pathname]);

  // Here filter the videos
  const filteredDataVideo = categoryList.filter((cate) => {
    if (searchString === "") {
      return cate;
    } else {
      return cate.category.toLowerCase().includes(searchString);
    }
  });

  // Here sending user to other page
  const handlePush = (item) => {
    const itemmain = item.category.replace(/_/g, "-");
    history.push(`/events/${itemmain}`);
  };

  // Here loader
  if (loader) {
    return <LoaderComponent />;
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content={metaDescription} />
          <title>{documentTitle}</title>
        </Helmet>
      </HelmetProvider>
      <CloseBtn locationType={"/"} />
      <CommonHeading />
      <div className="categories-main-search">
        <div className="categories-search">
          <i className="categories-searchIcon bi bi-search"></i>
          <input
            className="categories-optionsInput"
            placeholder={"Search Category"}
            onChange={(e) => setSearchString(e.target.value)}
            value={searchString}
          />
        </div>
      </div>
      {filteredDataVideo.length > 0 ? (
        <div className="categories-gridContainer">
          <div
            className={`categories-topRow categories-categoryTopRow ${
              searchString.length === 0 && !widthCheck ? "" : "d-none"
            }`}
          >
            {[...filteredDataVideo]
              .reverse()
              .slice(0, 5)
              .map((category, index) => {
                return (
                  <section
                    className={"categories-locationLink"}
                    key={index}
                    onClick={() => handlePush(category)}
                  >
                    <img
                      className="categories-optionsImage"
                      src={`https://cdn.workmob.com/stories_workmob/images/category-bg/${category.category.toLowerCase()}.png`}
                      alt={`${category.category} imageIcon`}
                    />
                  </section>
                );
              })}
          </div>
          <div className="greeting-category">
            {[...filteredDataVideo]
              .reverse()
              .slice(widthCheck || searchString.length != 0 ? 0 : 5)
              .map((category, index) => (
                <section key={index} onClick={() => handlePush(category)}>
                  <img
                    src={`https://cdn.workmob.com/stories_workmob/images/category-bg/${category.category.toLowerCase()}.png`}
                    alt={`${category.category} imageIcon`}
                  />
                </section>
              ))}
          </div>
        </div>
      ) : (
        <div className="no-category">No Category Available.</div>
      )}
    </>
  );
};

export default Categorypage;
