import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './Loader.css';

const LoaderComponent = () => {
    return(
        <div className="loader">
            <Loader type="Bars" color="#f96332" height={100} width={100} />
        </div>
    )
}

export default LoaderComponent;