import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const TopVideoHeader = () => {
  const [topVideoCard, setTopVideoCard] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(
      `https://cdn.workmob.com/stories_workmob/config/hope-stories-hope.json`
    ).then((res) =>
      res.json().then((result) => {
        const mainData = result.filter(
          (item) => item.video_landscape_thumb !== ""
        );
        const data = mainData.slice(0, 12);
        setTopVideoCard(data);
      })
    );
  }, []);

  const handlePush = (item) => {
    history.push(`/${item.slug}`);
  };

  return (
    <React.Fragment>
      {topVideoCard && topVideoCard.length > 0 && (
        <div className="greeting-randomvideo-set">
          <h1 className="greeting-header-cat">Top Videos</h1>
          <div className="greetingVideoContainer">
            {topVideoCard.map((item, index) => {
              return (
                <div key={index}>
                  <section
                    id="vid_section"
                    onClick={() => {
                      handlePush(item);
                    }}
                    className="greetVidSection"
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
                 <p className="text-white">{item.storyHeading}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default TopVideoHeader;
