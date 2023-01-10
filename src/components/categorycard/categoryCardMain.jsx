import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CategoryCardMain = () => {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    fetch(
      `https://cdn.workmob.com/stories_workmob/config/hope-category.json`
    ).then((res) =>
      res.json().then((result) => {
        setCategoryList(result);
      })
    );
  }, []);

  return (
    <>
      {categoryList && categoryList.length > 0 ? (
        <>
          <h1 className="greeting-header-cat">CATEGORY</h1>
          <div className="noScrollbar categories-gridContainer">
            <div
              className={`categories-topRow categories-categoryTopRow ${
                categoryList.length < 4 ? " filteredDataItem" : " "
              }`}
            >
              {categoryList.length > 0
                ? [...categoryList]
                    .reverse()
                    .slice(0, 6)
                    .map((categories, index) => {
                      return (
                        <Link
                          className="categories-locationLink"
                          key={index}
                          to={`/events/${categories.category}`}
                        >
                          <img
                            className="categories-optionsImage"
                            src={`https://cdn.workmob.com/stories_workmob/images/category-bg/${categories.category.toLowerCase()}.png`}
                            alt={`${categories.category} imageIcon`}
                          />
                        </Link>
                      );
                    })
                : null}
            </div>
          </div>

          <div className={`categories-topRow categories-categoryTopRow`}>
            {categoryList.length > 11
              ? [...categoryList]
                  .reverse()
                  .slice(6, 12)
                  .map((categories, index) => {
                    return (
                      <Link
                        className="categories-locationLink"
                        key={index}
                        to={`/events/${categories.category}`}
                      >
                        <img
                          className="categories-optionsImage"
                          src={`https://cdn.workmob.com/stories_workmob/images/greetings_category/${categories.category}.png`}
                          alt={`${categories.category} imageIcon`}
                        />
                      </Link>
                    );
                  })
              : null}
          </div>
        </>
      ) : null}
    </>
  );
};

export default CategoryCardMain;
