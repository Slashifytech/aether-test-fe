import React, { useEffect, useState } from "react";
import HeaderTab from "./HeaderTabs";
import Nav from "./Nav";
import Header from "../Components/Header";
import Cards from "../Components/AdminComponents/Cards";
import { toast } from "react-toastify";
import { getDashboardData } from "../features/adminApi";
import { graphLine, icon, TwoUser } from "../assets";
import { useSelector } from "react-redux";
import { CustomInput, CustomSelect, SelectInput } from "../Components/Input";
import { locationOption, modelOption } from "../data";
import Loader from "../Components/Loader";

const DashboardComponent = () => {
  const { roleType, agentName, email } = useSelector(
    (state) => state.users.users
  );
  const [loading, setLoading] = useState(true);

  const [rgpData, setrgpData] = useState({
    location: "",
    vehicleModel: "",
    startDate: "",
    endDate: "",
    totalrgp: "",
    totalRevenue: "",
    totalExpense: "",
    vasPriceCount: "",
    partsPriceCount: "",
    labourPriceCount: "",
    serviceTypeAmount: "",
  });

  const rgpPath = "/rgp-stats-data";

  const handleInputChange = (e, dataType) => {
    const { name, value } = e.target;

    setrgpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getrgpData = async () => {
    try {
      const res = await getDashboardData(
        rgpPath,
        rgpData.location,
        rgpData.vehicleModel,
        rgpData.startDate,
        rgpData.endDate
      );
      setrgpData((prev) => ({
        ...prev,
        totalrgp: res?.totalrgpCount,
        totalRevenue: res?.totalRevenue,
        totalExpense: res?.totalExpense,
        vasPriceCount: res?.totalVasPrice,
        partsPriceCount: res?.totalPartsPrice,
        labourPriceCount: res?.totalLabourPrice,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getrgpData();
  }, [
    rgpData.endDate,
    rgpData.startDate,
    rgpData.location,
    rgpData.vehicleModel,
  ]);

  const rgpCardData = [
    {
      countData: rgpData?.totalrgp,
      title: "Total RGP Policies",
      bgImg: graphLine,
      icon: TwoUser,
    },
    {
      countData: rgpData?.totalRevenue,
      title: "Total RGP Revenue",
      icon: icon,
    },
    {
      countData: rgpData?.totalExpense,
      title: "Total RGP Expense",
      icon: icon,
      isRgpData: true,
      vasPriceCount: rgpData?.vasPriceCount,
      partsPriceCount: rgpData?.partsPriceCount,
      labourPriceCount: rgpData?.labourPriceCount,
      serviceTypeAmount: rgpData?.serviceTypeAmount,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <div className="fixed">
        <span className="absolute">
          <Nav />
        </span>
      </div>
      <div>
        <Header />
      </div>

      <div className="ml-0 sm:ml-[28%] md:ml-[20%] mt-20 ">
        <p className="text-[30px] font-bold">Dashboard</p>
        <p className="text-[16px] font-normal">
          Hi, {agentName} welcome back to RaamGroup Portal!
        </p>
      </div>

      {loading ? (
        <div className="mt-28 flex justify-center md:ml-32 sm:ml-32">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-row items-center gap-6 sm:ml-[28%] md:ml-[20%] mr-6 mt-6">
            <CustomSelect
              options={locationOption}
              name={"location"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={rgpData.location}
              onChange={(e) => handleInputChange(e, "rgp")}
              placeholder={"Choose Location"}
            />
            <CustomSelect
              options={modelOption}
              name={"vehicleModel"}
              customClass="bg-white w-60 rounded-md h-10 border border-black"
              value={rgpData.vehicleModel}
              onChange={(e) => handleInputChange(e, "rgp")}
              placeholder={"Choose Model"}
            />
            <CustomInput
              type={"date"}
              name={"startDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={rgpData.startDate}
              onChange={(e) => handleInputChange(e, "rgp")}
            />
            <CustomInput
              type={"date"}
              name={"endDate"}
              className="bg-white w-full rounded-md h-10 border border-black -mt-6 px-3"
              value={rgpData.endDate}
              onChange={(e) => handleInputChange(e, "rgp")}
            />
          </div>

          <div className="ml-8 sm:ml-[33%] md:ml-[20%] md:w-[70%] gap-9 pt-3 pb-6 grid grid-cols-3">
            {rgpCardData.map((item, index) => (
              <Cards
                key={index}
                countData={item.countData}
                titleData={item.title}
                bgImg={item.bgImg}
                icon={item.icon}
                vasPriceCount={item.vasPriceCount}
                partsPriceCount={item.partsPriceCount}
                labourPriceCount={item.labourPriceCount}
                isRgpData={item.isRgpData}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default DashboardComponent;
