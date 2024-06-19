import React from "react";
import "./HomePage.css";
import BannerImage from "../../backgroundimage/home-banner-image.png";
import BackgroundBase from "../../backgroundimage/backgroundBase.png";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const clickExplore = () => {
    navigate("/login");
  };
  return (
    <div className="home-container">
      <div className="background-base">
        <img src={BackgroundBase} alt="" />
      </div>
      <div className="home-banner-container">
        <div className="home-text-section">
          <h1 className="primary-heading">Chooti Putha Fish Company Pvt Ltd</h1>
          <p className="primary-text">
            We are the leading seafood suppliers in Sri Lanka. Located at Galle.
          </p>
          <button className="secondary-button" onClick={clickExplore}>
            Explore More
          </button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
