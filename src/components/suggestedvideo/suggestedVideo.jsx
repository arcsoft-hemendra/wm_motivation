import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import LoaderComponent from "../common/Loader/Loader";
import styles from "./suggestedVideo.module.css";

const SuggestedVideo = ({ categoryName }) => {
  const [suggestedData, setSuggestedData] = useState([]);
  const [loader, setLoader] = useState(true);
  const { pathname } = useLocation();
  const history = useHistory();
  const URL = `https://cdn.workmob.com/stories_workmob/config/namaste-category-index/${categoryName}.json`;

  useEffect(() => {
    setLoader(true);
    fetch(URL)
      .then((data) => data.json())
      .then((res) => {
        const mainData = res.filter((item) => item.video_landscape_thumb != "");
        if (mainData.length < 4) {
          fetch(
            `https://cdn.workmob.com/stories_workmob/config/namaste-stories-top.json`
          ).then((res) =>
            res.json().then((result) => {
              const newMainData = result.filter(
                (item) => item.video_landscape_thumb !== ""
              );
              const newSlicedData = newMainData.slice(0, 4 - mainData.length);
              const arrayData = mainData.concat(newSlicedData);
              setSuggestedData(arrayData);
            })
          );
        } else {
          const newSlicedData = mainData.slice(0, 12);
          setSuggestedData(newSlicedData);
        }
      });
    setLoader(false);
    return () => {
      setSuggestedData([]);
    };
  }, [pathname]);

  if (loader) {
    return <LoaderComponent />;
  }

  const onVideoClick = (item) => {
    history.push(`/${item.slug}`);
  };

  return (
    <div className={styles.greetingVideoContainer}>
      {suggestedData && suggestedData.length > 0
        ? suggestedData.map((item, index) => (
            <div key={index}>
              <section
                id="vid_section"
                onClick={() => onVideoClick(item)}
                className={styles.greetVidSection}
              >
                <img
                  className={styles.videoLandscapeThumb}
                  src={item?.video_landscape_thumb}
                  alt="thumb"
                />
                <div className={styles.playIconContainer}>
                  <i className={`icon icon-play ${styles.playIcon}`} />
                </div>
              </section>

              <p className="text-white">{item.storyHeading}</p>
            </div>
          ))
        : null}
    </div>
  );
};

export default SuggestedVideo;
