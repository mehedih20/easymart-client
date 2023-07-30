import React, { useEffect, useState } from "react";
import "./Banner.css";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiSolidCircle } from "react-icons/bi";
import { FaRegPaperPlane } from "react-icons/fa";
import bannerImg1 from "../../../../assets/Banner/Slide1.webp";
import bannerImg2 from "../../../../assets/Banner/Slide2.webp";

const Banner = () => {
  const [left, setLeft] = useState("");
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [right, setRight] = useState("translate-pos");

  const rightBtn = () => {
    setLeft("translate-neg");
    setRight("");
    setRightCount(rightCount + 1);
  };
  const leftBtn = () => {
    setLeft("");
    setRight("translate-pos");
    setLeftCount(leftCount + 1);
  };

  useEffect(() => {
    if (leftCount > 1) {
      rightBtn();
      setLeftCount(0);
      setRightCount(0);
    }
    if (rightCount > 1) {
      leftBtn();
      setLeftCount(0);
      setRightCount(0);
    }
  }, [leftCount, rightCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      rightBtn();
    }, 5000);
    return () => clearInterval(interval);
  }, [rightBtn]);

  return (
    <div className="banner-container">
      <div className="banner-slider">
        <div className={`banner-slide ${left}`}>
          <img src={bannerImg1} alt="banner-img-1" />
        </div>
        <div className={`banner-slide ${right}`}>
          <img src={bannerImg2} alt="banner-img-2" />
        </div>
      </div>
      <div className="dots">
        <span className={`${left === "" && "dot-active"}`}>
          <BiSolidCircle />{" "}
        </span>
        <span className={`${left !== "" && "dot-active"}`}>
          <BiSolidCircle />{" "}
        </span>
      </div>
      <div className="banner-subscribe">
        <FaRegPaperPlane />
        <input type="text" placeholder="Your email address" />
        <button className="subs-btn">Subscribe</button>
      </div>
      <div className="banner-btn">
        <button onClick={leftBtn}>{<AiOutlineLeft />}</button>
        <button onClick={rightBtn}>{<AiOutlineRight />}</button>
      </div>
    </div>
  );
};

export default Banner;