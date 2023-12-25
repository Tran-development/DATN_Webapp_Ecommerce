import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { dataSlide } from "./dataSlide";


const Slide = () => {

  const items = dataSlide.map((item) => (
    <div
      className={`relative sm:text-[35px] leading-[1.2] 800px:text-[60px] sm:min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: "100% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <span className="text-[#3cb815] uppercase text-[10px] sm:text-[18px]">
          <span className="text-[20px] font-bold  border-spacing-5"> - </span>
          {item?.head}
          <span className="text-[20px] font-bold  border-spacing-5"> - </span>
        </span>
        <h1
          className={`text-[16px] sm:pt-2 sm:text-[30px] leading-[1.2] 800px:text-[50px] text-[#3d3a3a] font-[600] capitalize`}
        >
          {item?.title} <br />
          {item?.subtitle} <br />
          {/* {item?.des} */}
        </h1>
        <p className="pt-2 hidden sm:block sm:pt-5 text-[12px] sm:text-[16px] w-[40%] font-[Poppins] font-[400] text-[#000000ba]">
          {item?.des} <br />
          {/* <span className="text-[#3cb815] text-[10px] sm:text-[14px]">Join us now!</span> */}
        </p>
        <Link to="/products" className="inline-block">
          <span className="text-[#fff] font-[Poppins]">
            {/* button */}
            <div className={`${styles.button} mt-7 sm:mt-5 mb-2 sm:mb-0`}>
              <h2 className="sm:text-sm text-[10px]">Shop Now</h2>
              {/* shine box */}
              <div className="absolute top-0 -inset-full h-full w-1/2  z-5 block transform -skew-x-12 l-[-40px] bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
            </div>
          </span>
        </Link>
      </div>
    </div>
  ))



  return (
    <AliceCarousel
      mouseTracking
      items={items}
      disableButtonsControls
      autoPlay
      autoPlayInterval={5000}
      infinite
    />
  )
};

export default Slide;
