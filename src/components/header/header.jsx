import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

const Header = ({ heading }) => {
  const headerRef = useRef();
  const history = useHistory();

  useEffect(() => {
    let isThrottle;
    function changeHeaderBg() {
      if (isThrottle) return;
      isThrottle = true;
      setTimeout(() => {
        const header = headerRef.current;
        if (header) {
          if (window.scrollY) {
            header.style.background = "black";
            header.style.boxShadow = "rgba(255, 255, 255, 0.2) 0px 3px 6px";
          } else {
            header.removeAttribute("style");
          }
        }
        isThrottle = false;
      }, 100);
    }
    document.addEventListener("scroll", changeHeaderBg);
    return () => document.removeEventListener("scroll", changeHeaderBg);
  }, []);

  const handleShare = () => {
    history.push("/motivationkahani");
  };

  const handleSearch = () => {
    history.push("/search");
  };

  const handleCategory = () => {
    history.push("/events");
  };

  const handleLocation = () => {
    history.push("/location");
  };

  return (
    <div className="newGreetingsHeader" ref={headerRef}>
      <nav className="navbarMainGreet">
        <div className="headerLogosGreet">
          {/* <i className="locationIconG" onClick={() => handleLocation()}>
            <svg viewBox="0 0 384 512" fill="white" width="50%">
              <path d="M192 0C85.97 0 0 85.97 0 192c0 77.41 26.97 99.03 172.3 309.7C177 508.6 184.5 512 192 512s14.95-3.441 19.72-10.32C357 291 384 269.4 384 192C384 85.97 298 0 192 0zM198.6 492.6C196.5 495.6 193.6 495.1 192 495.1s-4.496-.4473-6.549-3.41c-25.93-37.59-48.1-69.17-67.02-96.12C31.64 272.8 16 250.6 16 192c0-97.05 78.95-176 176-176s176 78.95 176 176c0 58.55-15.64 80.83-102.4 204.5C246.6 423.4 224.5 454.1 198.6 492.6zM192 111.1c-44.18 0-80 35.82-80 80c0 44.18 35.82 80 80 80s80-35.82 80-80C272 147.8 236.2 111.1 192 111.1zM192 256c-35.29 0-64-28.71-64-64c0-35.29 28.71-64 64-64s64 28.71 64 64C256 227.3 227.3 256 192 256z"></path>
            </svg>
          </i> */}
          <div className="CategoryIconG" onClick={() => handleCategory()}>
            <svg viewBox="0 0 32 32" width="100%" height="100%">
              <g>
                <path d="M12,0H2C0.895,0,0,0.895,0,2v10c0,1.104,0.895,2,2,2h10c1.105,0,2-0.896,2-2V2C14,0.895,13.105,0,12,0z    M12,12H2V2h10V12z" />
                <path d="M30,0H20c-1.105,0-2,0.895-2,2v10c0,1.104,0.895,2,2,2h10c1.104,0,2-0.896,2-2V2C32,0.895,31.104,0,30,0z    M30,12H20V2h10V12z" />
                <path d="M30,18H20c-1.105,0-2,0.896-2,2v10c0,1.105,0.895,2,2,2h10c1.104,0,2-0.895,2-2V20   C32,18.895,31.104,18,30,18z M30,30l-10,0V20h10V30z" />
                <path d="M12,18H2c-1.105,0-2,0.896-2,2v10c0,1.105,0.895,2,2,2h10c1.105,0,2-0.895,2-2V20   C14,18.895,13.105,18,12,18z M12,30L2,30V20h10V30z" />
              </g>
            </svg>
          </div>
          <i className="SearchIconG" onClick={() => handleSearch()}>
            <svg viewBox="0 0 512 512" fill="white" width="100%">
              <path d="M507.3 484.7l-141.5-141.5C397 306.8 415.1 259.7 415.1 208c0-114.9-93.13-208-208-208S-.0002 93.13-.0002 208S93.12 416 207.1 416c51.68 0 98.85-18.96 135.2-50.15l141.5 141.5C487.8 510.4 491.9 512 496 512s8.188-1.562 11.31-4.688C513.6 501.1 513.6 490.9 507.3 484.7zM208 384C110.1 384 32 305 32 208S110.1 32 208 32S384 110.1 384 208S305 384 208 384z"></path>
            </svg>
          </i>
        </div>
        <Link className="mainCenterGreetText" to="/">
          {heading}
        </Link>
        <div className="shareButtonGreet">
          <div onClick={handleShare} className="greetShreButtonMain">
            Share motivation
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
