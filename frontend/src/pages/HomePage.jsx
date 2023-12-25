import React from 'react'
import Header from "../components/Layout/Header";
import Slide from "../components/Route/Slide/Slide";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Blogs from "../components/Blogs/Blogs";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";

const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <Slide />
        <Categories />
        <BestDeals />
        <Events />
        <FeaturedProduct />
        <Blogs />
        <Sponsored />
        <Footer />
    </div>
  )
}

export default HomePage