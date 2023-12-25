import React, { useState } from "react";
import { useSelector } from "react-redux";
import BlogCard from "../components/Blogs/BlogCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";


const BlogsPage = () => {
  const { allBlogs, isLoading } = useSelector((state) => state.blogs);
  const [data, setData] = useState([]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section} flex gap-10 sm:flex-wrap`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-4 md:gap-[25px] xl:grid-cols-${grid} lg:gap-[25px] xl:gap-[30px] mb-12">
              {allBlogs.length !== 0 ? (
                allBlogs.map((blog) => (
                  <BlogCard key={blog.name} data={blog} />
                ))
              ) : ( 
                <h4 key="no-blogs">No Blogs available!</h4>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogsPage;
