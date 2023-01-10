import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./VideoThumbnail.module.css";
import SkeletonVideoThumbnail from "../skeleton/videoThumbnail";
import VideoThumbNew from "./videoThumbNew";
import LoaderComponent from "../Loader/Loader";

export default function VideoThumbnail({ categoryName }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const imgRef = useRef();
  const history = useHistory();
  const { pathname } = useLocation();
  const URL = `https://cdn.workmob.com/stories_workmob/config/hope-category-index/${categoryName}.json`;

  useEffect(() => {
    setLoader(true);
    fetch(URL)
      .then((data) => data.json())
      .then((res) => {
        const mainData = res.filter((item) => item.video_landscape_thumb != "");
        setData(mainData);
      });
    setLoader(false);
    return () => {
      setData([]);
    };
  }, [pathname]);

  if (loader) {
    return <LoaderComponent />;
  }

  const onVideoClick = (e, item) => {
    history.push(`/${item.slug}`);
  };

  if (data.length < 1) {
    return <SkeletonVideoThumbnail />;
  }

  return (
    <div>
      <div className={styles.greetingVideoContainer}>
        <VideoThumbNew
          styles={styles}
          data={data}
          imgRef={imgRef}
          onVideoClick={onVideoClick}
          pageLimit={50}
          dataLimit={12}
        />
      </div>
    </div>
  );
}
