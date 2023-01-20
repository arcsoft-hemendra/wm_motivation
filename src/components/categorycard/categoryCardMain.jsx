import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import ScrollContainer from "react-indiana-drag-scroll";

const CategoryCardMain = ({ widthCheck }) => {
  const [categoryList, setCategoryList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch(
      `https://cdn.workmob.com/stories_workmob/config/hope-category.json`
    ).then((res) =>
      res.json().then((result) => {
        setCategoryList(result);
      })
    );
  }, []);

  const handleCategory = () => {
    history.push("/categories");
  };

  return (
    <>
      {!widthCheck && categoryList && categoryList.length > 0 ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 className="greeting-header-cat">CATEGORY</h1>
            <i
              onClick={handleCategory}
              style={{ fontSize: "0.8rem", cursor: "pointer" }}
              className="icon icon-right-arrow greeting-header-cat"
            />
          </div>
          <div className="noScrollbar categories-gridContainer">
            <div
              className={`categories-topRow categories-categoryTopRow ${
                categoryList.length < 4 ? " filteredDataItem" : " "
              }`}
            >
              {[...categoryList]
                .reverse()
                .slice(0, 6)
                .map((categories, index) => {
                  return (
                    <Link
                      className="categories-locationLink"
                      key={index}
                      to={`/categories/${categories.category.toLowerCase()}`}
                    >
                      <img
                        className="categories-optionsImage"
                        src={`https://cdn.workmob.com/stories_workmob/images/category-bg/${categories.category.toLowerCase()}.png`}
                        alt={`${categories.category.toLowerCase()} imageIcon`}
                      />
                    </Link>
                  );
                })}
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
                        to={`/categories/${categories.category.toLowerCase()}`}
                      >
                        <img
                          className="categories-optionsImage"
                          src={`https://cdn.workmob.com/stories_workmob/images/category-bg/${categories.category.toLowerCase()}.png`}
                          alt={`${categories.category.toLowerCase()} imageIcon`}
                        />
                      </Link>
                    );
                  })
              : null}
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 className="greeting-header-cat">CATEGORY</h1>
            <i
              onClick={handleCategory}
              style={{ fontSize: "0.8rem" }}
              className="icon icon-right-arrow greeting-header-cat"
            />
          </div>
          <ScrollContainer>
            <div style={{ display: "flex", margin: "0rem 1rem" }}>
              {[...categoryList]
                .reverse()
                .slice(0, 4)
                .map((categories, index) => {
                  return (
                    <Link
                      className=""
                      key={index}
                      to={`/categories/${categories.category.toLowerCase()}`}
                    >
                      <img
                        className="m-2"
                        src={`https://cdn.workmob.com/stories_workmob/images/category-bg/${categories.category.toLowerCase()}.png`}
                        alt={`${categories.category.toLowerCase()} imageIcon`}
                      />
                    </Link>
                  );
                })}
            </div>
          </ScrollContainer>
        </>
      )}
    </>
  );
};

export default CategoryCardMain;
