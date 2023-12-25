import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(null)


  const [grid, setGrid] = useState(5)

  console.log(sort);

  useEffect(() => {
    const filterAndSortProducts = () => {
      const allProductsData = allProducts ? [...allProducts] : [];
  
      if (categoryData === null) {
        setData(allProductsData);
      } else {
        let sortedData = [...allProductsData];
  
        if (sort === "price") {
          sortedData = sortedData.sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (sort === "price-desc") {
          sortedData = sortedData.sort((a, b) => b.discountPrice - a.discountPrice);
        }
  
        const filteredData = sortedData.filter((i) => i.category === categoryData);
        setData(filteredData);
        console.log("Filtered and sorted data:", filteredData);
      }
    };
  
    filterAndSortProducts();
  }, [allProducts, categoryData, sort]);
  

  
  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <div>
            <Header activeHeading={3} />
            <br />
            <br />
            <div className={`${styles.section} flex gap-10`}>

              <div className="w-full">

                <div className="flex h-[40px] justify-between items-center bg-white rounded-lg mb-3">
                  <div className="flex items-center gap-10 mx-3">
                    <p className="mb-0 sort-by">Sort:</p>
                    <select
                      name=""
                      defaultValue="manula"
                      className="form-select"
                      id="SortBy"
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option className="sort-by-element" value="price">Price: Low to high</option>
                      <option className="sort-by-element" value="price-desc">Price: High to low</option>
                      <option className="sort-by-element" value="soldest">Sold: High to low</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-5 mx-3">
                    <span className="totalproducts">Showing 1–10 products</span>
                    <div className="gap-5 items-center grid grid-flow-col">
                      <img
                        onClick={() => setGrid(3)}
                        src="images/gr2.svg"
                        className="block cursor-pointer"
                        alt="grid"
                        width="12px"
                        height="12px"
                      />
                      <img
                        onClick={() => setGrid(4)}
                        src="images/gr4.svg"
                        className="block cursor-pointer"
                        alt="grid"
                        width="30px"
                        height="20px"
                      />
                    </div>
                  </div>
                </div>

                <div className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] xl:grid-cols-${grid} lg:gap-[25px] xl:gap-[30px] mb-12`}>
                  {data && data.map((i, index) =>
                    <ProductCard data={i} key={index} />
                  )}
                </div>
                {data && data.length === 0 ? (
                  <h1 className="text-center w-full pb-[100px] text-[20px]">
                    No products Found!
                  </h1>
                ) : null}
              </div>
            </div>
            <Footer />
          </div>
        )
      }
    </>
  );
};

export default ProductsPage;
