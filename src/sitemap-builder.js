require("@babel/register");
const fetch = require("axios");

const router = require("./routes").default;
const Sitemap = require("react-router-sitemap").default;

const categoryUrl = `https://cdn.workmob.com/stories_workmob/config/hope-category.json`;
const storiesTopUrl =
  "https://cdn.workmob.com/stories_workmob/config/hope-stories-hope.json";

async function fetchUrlData() {
  const categoryUrlAPI = await fetch(categoryUrl);
  const storiesApi = await fetch(storiesTopUrl);
  return {
    category: categoryUrlAPI.data,
    top: storiesApi.data,
  };
}

fetchUrlData().then((resp) => {
  generateSitemap(resp);
});

function generateSitemap(data) {
  const categoryId = data?.category?.map((category) => ({
    id: category?.category,
  }));
  const topVideoId = data?.top?.map((category) => ({
    userId: category?.slug,
  }));

  const paramsConfig = {
    "/categories/:id": categoryId,
    "/:userId": topVideoId,
  };

  return new Sitemap(router)
    .applyParams(paramsConfig)
    .build("http://hope.workmob.com")
    .save("./public/sitemap.xml");
}
