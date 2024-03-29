import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import CloseBtn from "../../components/common/CloseBtn/CloseBtn";
import LoaderComponent from "../../components/common/Loader/Loader";
import Header from "../../components/header/header";
import Socialshare from "../../components/socialshare/socialshare";
import SubFooterMain from "../../components/subfooter/subFooterMain";
import "./insight.css";
import "./../../../node_modules/bootstrap/dist/css/bootstrap.css";
import greetingsData from "../../pages/greetings/greetingsData.json";
import "../../components/commonHeading/commonHeading.css";

const Insight = () => {
  const [insightData, setInsightData] = useState({});
  const [insightDataMain, setInsightDataMain] = useState([]);
  const [loader, setLoader] = useState(true);
  const { pathname } = useLocation();
  const params = useParams();

  
  const { greetingsJson } = greetingsData;
  const heading = greetingsJson.heading;
  const tagline = greetingsJson.tagline;
  const paragraph = greetingsJson.paragraph;

  useEffect(() => {
    setLoader(true);
    fetch("https://cdn.workmob.com/stories_workmob/config/motivation-insightlisting.json")
      .then((res) => res.json())
      .then((res) => {
        const result = res.find(
          (item) => item.slug === pathname?.split("/")[2]
        );
        setInsightData(result);
        setInsightDataMain(res);
        setLoader(false);
      })
      .catch((err) => console.log(err));
  }, [pathname]);

  // Here loader
  if (loader) {
    return <LoaderComponent />;
  }

  if (params?.id) {
    return (
      <>
        {/* <Header heading={"आशा"} type="insights" /> */}
        <div className="greet-div">
          <h1 className={"VideoList-title"}>{heading}</h1>
          <h3 className="VideoList-tagline common-line">{tagline}</h3>
        </div>
        <CloseBtn locationType={"/"} />
        <div className="container mt-2 mt-md-0">
          {/* Heading and Image */}
          <div className="bg-transparent p-0 position-relative pt-3 pt-md-5 mb-4">
            <h1 className="text-white font-weight-bold mb-4 font-50 charter-regular heading">
              {insightData?.storyHeading}
            </h1>
            <img
              className="img-fluid w-100 banner"
              src={insightData?.full}
              alt={"insightIcon"}
            />
          </div>
          {/* Text Content */}
          <div className="row position-relative articleDetail">
            <div className="col-12 text-white content">
              <div
                className="mb-3"
                dangerouslySetInnerHTML={{ __html: insightData?.fullStory }}
              />
            </div>
            <div className="col-12">
              <p className="text-white">{insightData?.date}</p>
            </div>
          </div>
          {/* Social Share */}
          <Socialshare
            emailText={insightData?.metaTitle}
            emailSub="Interesting Read"
            insightData={insightData?.storyHeading}
          />
        </div>
        {/* Footer */}
        <SubFooterMain insightpage={"insightpage"} />
      </>
    );
  } else {
    return (
      <>
        {/* <Header heading={"आशा"} type="insights" /> */}
        <div className="greet-div">
          <h1 className={"VideoList-title"}>{heading}</h1>
          <h3 className="VideoList-tagline common-line">{tagline}</h3>
        </div>
        <CloseBtn locationType={"/"} />
        <div className="greeting-randomvideo-set mt-2">
          <h1
            className="greeting-header-cat"
            style={{
              fontSize: "2rem",
              margin: "2rem",
              color: "white",
              float: "left",
            }}
          >
            INSIGHTS
          </h1>
          <div className="insightDataMain-div">
            {insightDataMain && insightDataMain.length > 0
              ? insightDataMain.slice(0, 2).map((item, index) => {
                  return (
                    <Link
                      to={`/insights/${item.slug}`}
                      key={index}
                      className="insightItemDiv"
                    >
                      <img src={item.thumb} alt="insightIcon" />
                      <div>{item?.storyHeading}</div>
                    </Link>
                  );
                })
              : null}
          </div>
        </div>
        {/* Footer */}
        <SubFooterMain insightpage={"insightpage"} />
      </>
    );
  }
};

export default Insight;
