import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import ReactPaginate from 'react-paginate';
import styles2 from './ProductsPage.module.css'


const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [sort, setSort] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;


  const [grid, setGrid] = useState(5)

  // console.log("allProducts:", allProducts);
  // console.log("categoryData:", categoryData);
  // console.log("sort:", sort);

  useEffect(() => {
    const filterAndSortProducts = () => {
      if (!allProducts) {
        return;
      }
    
      const allProductsData = [...allProducts];
    
      let sortedData = [...allProductsData];
    
      if (sort === "price") {
        sortedData = sortedData.sort((a, b) => a.discountPrice - b.discountPrice);
      } else if (sort === "price-desc") {
        sortedData = sortedData.sort((a, b) => b.discountPrice - a.discountPrice);
      }
    
      if (categoryData) {
        sortedData = sortedData.filter((i) => i.category === categoryData);
      }
    
      setData(sortedData);
    };
    

    filterAndSortProducts();
  }, [allProducts, categoryData, sort]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);


  return (
    <>
      {
        isLoading ? (
          <>
          <Header activeHeading={3} />
          <Loader />
          </>
        ) : (
          <div>
            <Header activeHeading={3} />
            <br />
            <br />
            <div className={`${styles.section} flex gap-10`}>

              <div className="w-full mb-5">

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
                      {/* <option className="sort-by-element" value="soldest">Sold: High to low</option> */}
                    </select>
                  </div>
                  <div className="flex items-center gap-4 mx-3">
                    <span className="totalproducts hidden sm:block">Showing 1–10 products</span>
                    <div className="gap-4 items-center grid grid-flow-col">
                      <img
                        onClick={() => setGrid(3)}
                        src="images/gr.svg"
                        className="cursor-pointer hidden sm:block"
                        alt="grid"
                        width="28px"
                        height="20px"
                      />
                      <img
                        onClick={() => setGrid(4)}
                        src="images/gr4.svg"
                        className="cursor-pointer hidden sm:block"
                        alt="grid"
                        width="30px"
                        height="20px"
                      />
                    </div>
                  </div>
                </div>

                <div className={`grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] xl:grid-cols-${grid} lg:gap-[25px] xl:gap-[30px] mb-12`}>
                {currentProducts.map((i, index) => (
                    <ProductCard data={i} key={index} />
                  ))}

                </div>
                <ReactPaginate
                   nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={2}
                  pageCount={Math.ceil(data?.length / productsPerPage)}
                  previousLabel="< previous"
                  pageClassName={styles2.pageItem}
                  pageLinkClassName={styles2.pageLink}
                  previousClassName={styles2.pageItem}
                  previousLinkClassName={styles2.pageLink}
                  nextClassName={styles2.pageItem}
                  nextLinkClassName={styles2.pageLink}
                  breakLabel="..."
                  breakClassName={styles2.pageItem}
                  breakLinkClassName={styles2.ageLink}
                  containerClassName={styles2.pagination}
                  activeClassName={styles2.active}
                  renderOnZeroPageCount={null}
                />
                {data && data?.length === 0 ? (
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
