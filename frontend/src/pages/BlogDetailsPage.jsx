import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import BlogDetails from "../components/Blogs/BlogDetails";
import SuggestedProduct from "../components/Products/SuggestedProduct";
import { useSelector } from "react-redux";

const BlogDetailsPage = () => {
    const [data, setData] = useState(null);
    const { allBlogs } = useSelector((state) => state.blogs)
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const blogData = searchParams.get("isBlog");


    // console.log(allBlogs);

    useEffect(() => {
      if (blogData == null) {
        const data = allBlogs && allBlogs.find((i) => i._id === id);
        setData(data);
      }
    }, [allBlogs]);

  return (
    <div>
      <Header />
      <BlogDetails data={data} />       

      <Footer />
    </div>
  );
};

export default BlogDetailsPage;
