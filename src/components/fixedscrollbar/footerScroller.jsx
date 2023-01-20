import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import { Link, useLocation } from "react-router-dom";

const FooterScroller = ({
  isScrollDown,
  categoryList,
  setActiveClass,
  activeClass,
}) => {
  const { pathname } = useLocation();
  const categoryName = pathname.split("/").slice(2);

  return (
    <>
      {pathname === `/categories/${categoryName[0]}` ? (
        <div className={"small-fixed-section fixed-bottom"}>
          <div
            className={
              "small-fixed-section-container" +
              (isScrollDown ? " container-animate-footer" : "")
            }
          >
            <ScrollContainer className="scroll-container fixed-container-child">
              {[...categoryList]
                .reverse()
                .slice(0, 4)
                .map((category, index) => {
                  return (
                    <Link
                      key={index}
                      className={activeClass === index ? "text-red" : ""}
                      to={`/categories/${category.category}`}
                      onClick={() => {
                        setActiveClass(index);
                      }}
                    >
                      <img
                        className={
                          activeClass === index
                            ? "text-red-image"
                            : "text-red-image-opacity"
                        }
                        alt={category.category}
                        src={`https://cdn.workmob.com/stories_workmob/images/greetings_category/${category.category}.png`}
                      />
                    </Link>
                  );
                })}
              <Link to={"/categories"} className="more-cateogories">
                <p>More</p>
              </Link>
            </ScrollContainer>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FooterScroller;
