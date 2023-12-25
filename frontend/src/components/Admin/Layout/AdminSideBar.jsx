import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";

const AdminSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* single item */}
      <span className="uppercase text-[#555] text-[12px] font-semibold p-[20px] ">quick link</span>
      <div className="w-full flex items-center p-4 ml-[20px] mb-2">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={20}
            color={`${active === 1 ? "green" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${active === 1 ? "text-organic-600" : "text-gray-900"
              }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <span className="uppercase text-[#555] text-[12px] font-semibold p-[20px] ">catalog</span>
      <div className="w-full flex items-center p-4 ml-[20px]">
        <Link to="/admin-products" className="w-full flex items-center">
          <BsHandbag
            size={20}
            color={`${active === 5 ? "green" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${active === 5 ? "text-organic-600" : "text-gray-900"
              }`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center pl-4 ml-[20px] mb-5">
        <Link to="/admin-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={20}
            color={`${active === 6 ? "green" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${active === 6 ? "text-organic-600" : "text-gray-900"
              }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <span className="uppercase text-[#555] text-[12px] font-semibold p-[20px] ">sale</span>
      <div className="w-full flex items-center p-4 ml-[20px] mb-2">
        <Link to="/admin-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={20}
            color={`${active === 2 ? "green" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${active === 2 ? "text-organic-600" : "text-gray-900"
              }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <span className="uppercase text-[#555] text-[12px] font-semibold p-[20px] ">users</span>
      <div className="w-full flex items-center p-4 ml-[20px]">
        <Link to="/admin-sellers" className="w-full flex items-center">
          <FaRegUser
            size={20}
            color={`${active === 3 ? "green" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${active === 3 ? "text-organic-600" : "text-gray-900"
              }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center pl-4 ml-[20px] mb-5">
        <Link to="/admin-users" className="w-full flex items-center">
          <HiOutlineUserGroup
            size={20}
            color={`${active === 4 ? "green" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${active === 4 ? "text-organic-600" : "text-gray-900"
              }`}
          >
            All Customers
          </h5>
        </Link>
      </div>

      <span className="uppercase text-[#555] text-[12px] font-semibold p-[20px] ">Withdraw</span>
      <div className="w-full flex items-center p-4 ml-[20px]">
        <Link
          to="/admin-withdraw-request"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={20}
            color={`${active === 7 ? "green" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${active === 7 ? "text-organic-600" : "text-gray-900"
              }`}
          >
            Withdraw Request
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/profile"
          className="w-full flex items-center"
        >
          <AiOutlineSetting
            size={20}
            color={`${active === 8 ? "green" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${active === 8 ? "text-organic-600" : "text-gray-900"
              }`}
          >
            Settings
          </h5>
        </Link>
      </div>

    </div>
  );
};

export default AdminSideBar;
