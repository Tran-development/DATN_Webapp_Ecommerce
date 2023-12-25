import React from "react";
import styles from "../../styles/styles";
import Marquee from "react-fast-marquee";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >

      <Marquee className="flex justify-center w-full items-center">
        <div className="flex items-center justify-center gap-20 mx-10">
          <img
            src="images/brand-01.png"
            style={{ width: "150px", objectFit: "contain" }}
          />
          <img
            src="images/brand-02.png"
            style={{ width: "150px", objectFit: "contain" }}
          />
          <img
            src="images/brand-03.png"
            style={{ width: "150px", objectFit: "contain" }}
          />
          <img
            src="images/brand-04.png"
            style={{ width: "150px", objectFit: "contain" }}
          />
          <img
            src="images/brand-05.png"
            style={{ width: "150px", objectFit: "contain" }}
          />
          <img
            src="images/brand-06.png"
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
      </Marquee>
    </div>
  );
};

export default Sponsored;
