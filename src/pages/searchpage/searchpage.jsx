import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CloseBtn from "../../components/common/CloseBtn/CloseBtn";
import LoaderComponent from "../../components/common/Loader/Loader";
import CommonHeading from "../../components/commonHeading/commonHeading";
import "./searchpage.css";

const Searchpage = () => {
  const { pathname } = useLocation();
  let itemCheck = JSON.parse(sessionStorage.getItem(pathname))?.index;
  const [allVideo, setAllVideo] = useState([]);
  const [searchVideo, setSearchVideo] = useState("");
  const [paginateData, setPaginateData] = useState(
    itemCheck ? Number(itemCheck) + 20 : 12
  );
  const [loader, setLoader] = useState(true);
  const totalVideos = useRef();
  const history = useHistory();

  // Handling scroller
  useEffect(() => {
    const scroller = window.addEventListener("scroll", (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= Number(scrollHeight) - 50) {
        if (paginateData <= totalVideos.current) {
          setPaginateData((prev) => prev + 17);
        }
      }
    });
    return () => {
      window.removeEventListener("scroll", scroller);
    };
  }, [paginateData]);

  // Handling videos api
  useEffect(() => {
    setLoader(true);
    const grettingsCardApi = fetch(
      `https://cdn.workmob.com/stories_workmob/config/hope-stories-hope.json`
    );
    grettingsCardApi
      .then((values) => values.json())
      .then((result) => {
        setLoader(false);
        const mainData = result.filter(
          (item) => item.video_landscape_thumb !== ""
        );
        totalVideos.current = mainData.length;
        setAllVideo(mainData);
      })
      .catch((err) => console.log(err));
  }, [pathname]);

  // Handling scrollPosition
  useEffect(() => {
    let itemCheckNew = JSON.parse(sessionStorage.getItem(pathname))?.position;
    window.scrollTo(0, itemCheckNew);
  }, [allVideo]);

  // Handling filter the videos and paginate
  const filteredDataVideo = allVideo
    .filter((cate) => {
      if (searchVideo === "") {
        return cate;
      } else {
        return (
          cate.name.toLowerCase().includes(searchVideo) ||
          cate.storyType
            .toLowerCase()
            .replace(/ /g, "-")
            .includes(searchVideo.toLowerCase().replace(/ /g, "-"))
        );
      }
    })
    .slice(0, paginateData);

  // Handling sending user to other page
  const handlePush = (item, index) => {
    sessionStorage.setItem(
      pathname,
      JSON.stringify({ index: index, position: window.scrollY })
    );
    history.push(`/${item.slug}`);
  };

  // Handling loader
  if (loader) {
    return <LoaderComponent />;
  }

  return (
    <>
      <CloseBtn locationType={"/"} />
      <CommonHeading />
      <div>
        <div className="search_categories-main-search">
          <div className="search_categories-search">
            <i className="search_categories-searchIcon bi bi-search"></i>
            <input
              className="categories-optionsInput"
              placeholder={"Search Video"}
              onChange={(e) => setSearchVideo(e.target.value)}
              value={searchVideo}
            />
          </div>
        </div>

        {filteredDataVideo && filteredDataVideo.length > 0 ? (
          <div className="search_greetingVideoContainer">
            {filteredDataVideo.map((item, index) => {
              return (
                <section
                  key={index}
                  id="vid_section"
                  className={`search_greetVidSection`}
                  onClick={() => handlePush(item, index)}
                >
                  <img
                    className="search_videoLandscapeThumb"
                    src={item?.video_landscape_thumb}
                    alt="thumb"
                  />
                  <div className="search_playIconContainer">
                    <i className={`icon icon-play search_playIcon`} />
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="search_no-category">No Video Available.</div>
        )}
      </div>
    </>
  );
};

export default Searchpage;
