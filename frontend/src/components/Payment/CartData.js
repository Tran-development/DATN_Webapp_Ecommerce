import React, { useState } from "react";

export const CartData = ({ orderData, covertMoney  }) => {
    const shipping = orderData?.shipping?.toFixed(2);
    console.log("covertMoney",covertMoney);
    return (
      <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
          <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
        </div>
        <br />
        <div className="flex justify-between">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
          <h5 className="text-[18px] font-[600]">${shipping}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
          <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
          <h5 className="text-[18px] font-[600]">{orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}</h5>
        </div>
        <h5 className="text-[18px] font-[600] text-end pt-3">
          ${orderData?.totalPrice}
        </h5>
        <h3>ETH: {covertMoney }</h3>
        <br />
      </div>
    );
  };