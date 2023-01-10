import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Layout from "../../components/Layout/Layout";
import GreetingVideoComponent from "../../components/greetingVideo/greetingVideoComponent";
import SkeletonGreetingVideo from "../../components/common/skeleton/GreetingVideo";
import NotFound from "../not-found/NotFound";
import { useLocation } from "react-router-dom";

const GreetingDetail = (props) => {
  const { userId } = props.match.params;
  const [userData, setUserData] = useState(null);
  const [storySlug, setStorySlug] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  let videoObjUrl = `https://cdn.workmob.com/stories_workmob/config/hope-story-detail/${userId}.json`;
  let documentTitle = userData?.metaTitle || "";
  let metaDescription = userData?.metaDesc || "";
  const { pathname } = useLocation();

  const apiOn = (url) => {
    return fetch(url)
      .then((response) => response.json())
      .then((res) => res)
      .catch((err) => setIsLoading(false));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiOn(videoObjUrl);
      if (response) {
        const { instructor } = response;
        setUserData(response);
        setIsLoading(false);
        if (!instructor) return;
        const userJson = await apiOn(
          `https://cdn.workmob.com/stories_workmob/config/instructor/${instructor}.json`
        );
        const slug = userJson?.story[0]?.slug;
        setIsLoading(false);
        if (slug) {
          setStorySlug(slug);
        } else {
          return;
        }
      }
    };
    fetchData();
  }, [userId]);

  if (isLoading) {
    return <SkeletonGreetingVideo />;
  }

  return (
    <Layout>
      <HelmetProvider>
        <Helmet>
          <meta name="description" content={metaDescription} />
          <title>{documentTitle}</title>
        </Helmet>
      </HelmetProvider>
      {userData ? (
        <GreetingVideoComponent userData={userData} storySlug={storySlug} />
      ) : (
        <NotFound title="not found" />
      )}
    </Layout>
  );
};

export default GreetingDetail;
