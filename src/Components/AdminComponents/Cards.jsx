import React, { useState } from "react";
import { Link } from "react-router-dom";

const Cards = ({
  countData,
  linkData,
  titleData,
  icon,
  bgImg,
  isRgpData,
  labourPriceCount,
  partsPriceCount,
  vasPriceCount,
  // serviceTypeAmount
}) => {
  return (
    <Link to={linkData}>
      <div
        className="bg-white px-6 text-black rounded-md border relative font-poppins border-[#E8E8E8] flex flex-col justify-between h-[230px] w-full transition-all duration-300 hover:shadow-md"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Top Section */}
        <div>
          <span className="pt-3 rounded-md w-12 mt-1 block">
            <img src={icon} alt="img" className="w-7 z-20" />
          </span>
          <p className="mt-3 text-[15px]">{titleData}</p>
          <p className="text-[23px] mt-2 font-semibold">{countData}</p>
        </div>

        {/* Bottom Section (Only for AMC cards) */}
        {isRgpData && (
          <div className="text-[12px] font-semibold space-y-1 pb-2">
            <p>
              Total VAS Price: {(parseFloat(vasPriceCount) || 0).toFixed(2)}
            </p>
            <p>Total Labour Price: {labourPriceCount}</p>
            <p>Total Parts Price: {partsPriceCount}</p>

            {/* Dropdown Toggle */}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Cards;
