import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import CreateBlog from "../../components/Shop/CreateBlog";
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

const ShopCreateBlogs = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-center justify-between w-full">
      <div className="w-[330px]">
        <DashboardSideBar active={8} />
      </div>
      <div className="w-full justify-center flex">
        <CreateBlog />
      </div>
    </div>
    </div>
  )
}

export default ShopCreateBlogs