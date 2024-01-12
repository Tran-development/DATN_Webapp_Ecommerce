import React from "react";
import styles from "../../styles/styles";
import CountDown from "./CountDown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

const EventCard = ({ active, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  }
  return (
    <div
      className={`w-full block bg-white rounded-lg ${
        active ? "unset" : "mb-12"
      } lg:flex p-2 gap-12`}
    >
      <div className="w-full lg:w-[40%]">
        <img className="w-[90%] sm:w-full ml-4 sm:ml-0 m-0 mb-0 lg:m-14 rounded-lg" src={`${data.images[0]?.url}`} alt="" />
      </div>
      <div className="w-full lg:[w-60%] flex flex-col justify-center ml-0 lg:ml-16">
        <h2 className={`${styles.productTitle} m-4 sm:ml-0 mb-0 sm:mb-2`}>{data.name}</h2>
        <p className="text-justify sm:mr-16 m-4 sm:m-0">{data.description}</p>
        <div className="flex py-2 justify-between">
          <div className="flex gap-4">
            <h5 className="font-[500] text-[18px] text-[#d55b45] sm:pr-3 pl-4 sm:pl-0 line-through">
              {data.originalPrice}$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              {data.discountPrice}$
            </h5>
          </div>
          <span className="pr-16 font-[400] text-[17px] text-[#44a55e]">
            {data.sold_out} sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center pl-4 sm:pl-0 mb-6 sm:mb-0">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[#fff] hover:bg-orange-500`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5 hover:bg-orange-500`} onClick={() => addToCartHandler(data)}>Add to cart</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
