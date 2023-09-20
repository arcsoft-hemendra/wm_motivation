import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const InsightComp = () => {
  const [insightData, setInsightData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch("https://cdn.workmob.com/stories_workmob/config/motivation-insightlisting.json")
      .then((res) => res.json())
      .then((res) => setInsightData(res));
  }, []);

  const handlePush = (item) => {
    history.push(`/insights/${item.slug}`);
  };

  const handleCategory = () => {
    history.push("/insights");
  };

  return (
    <>
      <div className="greeting-randomvideo-set">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 className="greeting-header-cat">INSIGHTS</h1>
          <i
            onClick={handleCategory}
            style={{ fontSize: "0.8rem", cursor: "pointer" }}
            className="icon icon-right-arrow greeting-header-cat"
          />
        </div>
        <div className="insightDataMain-div">
          {insightData && insightData.length > 0
            ? insightData.slice(0, 2).map((item, index) => {
                return (
                  <Link
                    onClick={() => handlePush(item)}
                    key={index}
                    className="insightItemDiv"
                    to={"#"}
                  >
                    <img src={item.thumb} alt="insightIcon" />
                    <div>{item.storyHeading}</div>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
};

export default InsightComp;
