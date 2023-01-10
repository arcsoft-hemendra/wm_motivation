import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';
import { logo } from "../../constants/requiredAssets";
import Layout from "../../components/Layout/Layout";

const title = "Page Not Found";

const NotFound = () => {
  return (
    <Layout>
      <div className={"root"}>
        <div className="NotFound-container">
          <div className="text-center">
            <img src={logo} alt="logo" />
          </div>
          <div className="NotFound-content">
            <h1 className="not-found-title">{title}</h1>
            <Link to="/" className="not-found-title">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
