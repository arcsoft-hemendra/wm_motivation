import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import CloseBtn from "../../components/common/CloseBtn/CloseBtn";
import LoaderComponent from "../../components/common/Loader/Loader";
import CommonHeading from "../../components/commonHeading/commonHeading";
import "./../searchpage/searchpage.css";

const LocationCity = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
  let itemCheck = JSON.parse(sessionStorage.getItem(pathname))?.index;

  const [userData, setUserData] = useState([]);
  const [searchVideo, setSearchVideo] = useState("");
  const [loader, setLoader] = useState(true);
  const [paginateData, setPaginateData] = useState(
    itemCheck ? Number(itemCheck) + 20 : 12
  );
  const totalVideos = useRef();

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

  // Handling User Data
  useEffect(() => {
    setLoader(true);
    fetch(`https://cdn.workmob.com/stories_workmob/config/locations/${id}.json`)
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        totalVideos.current = result.length;
        setUserData(result);
      })
      .catch((err) => console.log(err));
  }, []);

  // Handling sending user to other page
  const handlePush = (item, index) => {
    sessionStorage.setItem(
      pathname,
      JSON.stringify({ index: index, position: window.scrollY })
    );
  };

  // Handling filter the videos and paginate
  const filteredDataVideo = userData
    .filter((cate) => {
      if (searchVideo === "") {
        return cate;
      } else {
        return cate.name.toLowerCase().includes(searchVideo);
      }
    })
    .slice(0, paginateData);

  // Handling loader
  if (loader) {
    return <LoaderComponent />;
  }

  return (
    <>
      <CloseBtn locationType={"/"} />
      <CommonHeading />
      <div>
        <div className="categories-main-search">
          <div className="categories-search">
            <i className="categories-searchIcon bi bi-search"></i>
            <input
              className="categories-optionsInput"
              placeholder={"Search Video"}
              onChange={(e) => setSearchVideo(e.target.value)}
              value={searchVideo}
            />
          </div>
        </div>

        {filteredDataVideo && filteredDataVideo.length > 0 ? (
          <div className="greetingVideoContainer">
            {filteredDataVideo.map((item, index) => {
              return (
                <section
                  key={index}
                  id="vid_section"
                  className={`greetVidSection`}
                  onClick={() => handlePush(item, index)}
                >
                  <img
                    className="videoLandscapeThumb"
                    src={item?.video_landscape_thumb}
                    alt="thumb"
                  />
                  <div className="playIconContainer">
                    <i className={`icon icon-play playIcon`} />
                  </div>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="no-category">No Video Available.</div>
        )}
      </div>
    </>
  );
};

export default LocationCity;
