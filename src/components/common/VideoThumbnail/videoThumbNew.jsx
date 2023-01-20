import { useLayoutEffect, useState } from "react";

const VideoThumbNew = ({ styles, data, imgRef, onVideoClick, dataLimit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [slice, setSlice] = useState(9);

  useLayoutEffect(() => {
    sessionStorage.setItem("endSlice", 9);
    window.addEventListener("wheel", goToNextPage);
    window.addEventListener("scroll", goToNextPage);
    return () => {
      window.removeEventListener("wheel", goToNextPage);
      window.removeEventListener("scroll", goToNextPage);
      sessionStorage.setItem("endSlice", sessionStorage.getItem("endSlice"));
    };
  }, []);

  function goToNextPage() {
    let getEndSlice = Number(sessionStorage.getItem("endSlice"));
    if (
      window.innerHeight + document.documentElement.scrollTop + 5 >
      document.documentElement.offsetHeight
    ) {
      setCurrentPage((page) => page + 1);
      if (getEndSlice <= data.length) {
        setSlice((prevSlice) => prevSlice + 9);
        sessionStorage.setItem("endSlice", getEndSlice + 9);
      }
    }
  }

  const getPaginatedData = () => {
    let getLastSlice = Number(sessionStorage.getItem("endSlice"));
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    data = [...data].reverse();
    return data?.slice(0, getLastSlice > 9 ? getLastSlice : endIndex);
  };

  return (
    <>
      {getPaginatedData()?.map((item, index) => (
        <div key={index}>
          <section
            key={index}
            ref={imgRef}
            id="vid_section"
            onClick={(e) => onVideoClick(e, item, data)}
            className={styles.greetVidSection}
          >
            <img
              className={styles.videoLandscapeThumb}
              src={item.video_landscape_thumb}
            />
            <div className={styles.playIconContainer}>
              <i className={`icon-play ${styles.playIcon}`} />
            </div>
          </section>
         {/* <p className="text-white m-0 px-5">{item.storyHeading}</p> */}
        </div>
      ))}
    </>
  );
};

export default VideoThumbNew;
