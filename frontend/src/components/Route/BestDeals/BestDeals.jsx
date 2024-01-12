import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';


const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out); // max -> min
    // just take five products
    const firstFive = sortedData && sortedData.slice(0, 5);
    setData(firstFive);
  }, [allProducts]);

  const carouselConfig = {
    // ...các tùy chọn khác của AliceCarousel
    responsive: {
      0: { items: 1 }, // 1 sản phẩm cho màn hình dưới 1024px
      1024: { items: 4 }, // 4 sản phẩm cho màn hình 1024px trở lên
    },
    disableDotsControls: true,
  };

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="">
          {data && data.length !== 0 && (
            <AliceCarousel {...carouselConfig}>
            {data.map((product, index) => (
                <div key={index} className="mr-4 z-[999999] gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0"> 
                  <ProductCard data={product} />
                </div>
              ))}
            </AliceCarousel>
          )}
        </div>
      </div>
    </div>
  );
};


export default BestDeals;
