import { useCallback, useEffect, useMemo, useState } from "react";
import { GroupedInput } from "../Components/Input";
import { createdDate } from "../helper/commonHelperFunc";
import Nav from "./Nav";
import { toast } from "react-toastify";
import { addNewInovoice, editInovoice } from "../features/adminApi";
import { useLocation, useNavigate } from "react-router-dom";
import {
  fetchInvoiceById,
  setEmptyInvoiceData,
} from "../features/InvoiceSlice";
import { useDispatch, useSelector } from "react-redux";

import { updatergpStatus } from "../features/RGPapi";
import Header from "../Components/Header";
import { fetchrgpDataById } from "../features/RGPSlice";
import { numberToWords } from "../../Util/UtilityFunction";

const initialInvoiceData = {
  invoiceType: "",
  serviceId: "",
  billingDetail: {
    customerName: "",
    address: "",
    contact: "",
    email: "",
    pan: "",
    customerGst: "",
    zipCode: "",
    stateCode: "",
  },
  shippingDetails: {
    customerName: "",
    address: "",
    contact: "",
    email: "",
    pan: "",
    customerGst: "",
    zipCode: "",
    stateCode: "",
  },
  vehicleDetails: {
    hypothecated: "",
    vinNumber: "",
    branchName: "",
    model: "",
    gstAmount: "",
    initialGstAmount: "",
    cgst: 0,
    sgst: 0,
    rmEmail: "",
    rmName: "",
    rmEmployeeId: "",
    gmEmail: "",
    totalValue: "",
    discountPercent: "",

    taxableValue: "",
    totalAssessableValue: "",
    totalGst: "",
    totalInvoiceValue: "",
    taxPayableAmtinWord: "",
    invoiceValueAmtInWord: "",
  },
};

const InvoiceForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { invoiceById } = useSelector((state) => state.invoice);
  const { rgpByIdorStatus } = useSelector((state) => state.rgp);

  const { users } = useSelector((state) => state.users);
  const [isLoading, setisLoading] = useState(false);
  const createdBy = users?._id;
  const invoiceId = location?.state?.invoiceId;
  const id = location?.state?.id;
  const typeData = location?.state?.type;
  const [invoiceData, setInvoiceData] = useState({
    ...initialInvoiceData,
    invoiceType: typeData,
    serviceId: id,
  });

  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [errors, setErrors] = useState({});
  const formattedDate = createdDate();
  const rightFields = [
    {
      name: "customerName",
      type: "text",
      placeholder: "Name",
      label: "Name",
      required: true,
    },
    {
      name: "zipCode",
      type: "text",
      placeholder: "Zip Code",
      label: "Zip Code",
    },
    {
      name: "contact",
      type: "number",
      placeholder: "Contact Number",
      label: "Conatct Number",
      required: true,
    },
    {
      name: "customerGst",
      type: "text",
      placeholder: "GSTIN",
      label: "GSTIN Number",
    },
  ];
  const leftFields = [
    { name: "address", type: "text", placeholder: "Address", label: "Address" },
    {
      name: "stateCode",
      type: "text",
      placeholder: "State Code",
      label: "State Code",
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email Id",
      label: "Email Id",
      required: true,
    },
    {
      name: "pan",
      type: "text",
      placeholder: "PAN Number",
      label: "PAN Number",
    },
  ];

  const rightVehicleFields = [
    {
      name: "branchName",
      type: "text",
      placeholder: "Branch Name",
      label: "Branch Name",
    },
    {
      name: "vinNumber",
      type: "text",
      placeholder: "Vin Number",
      label: "Vin Number",
      required: true,
    },
    {
      name: "gstAmount",
      type: "number",
      placeholder: "Pre Gst Amount",
      label: "Pre Gst Amount",
      required: true,
    },
    {
      name: "totalValue",
      type: "text",
      placeholder: "Total Value",
      label: "Total Value",
    },

    {
      name: "sgst",
      type: "number",
      placeholder: "SGST 9%",
      label: "SGST 9%",
      required: true,
    },
    {
      name: "taxableValue",
      type: "text",
      placeholder: "Taxable Value",
      label: "Taxable Value",
    },
    {
      name: "totalInvoiceValue",
      type: "text",
      placeholder: "Total Invoice Value",
      label: "Total Invoice Value",
    },
    

    {
      name: "rmName",
      type: "text",
      placeholder: "Relationship Manager / Service Advisor Name",
      label: "Name of Relationship Manager / Service Advisor ",
      required: true,
    },

    {
      name: "rmEmployeeId",
      type: "text",
      placeholder: "Employee Id of Relationship Manager/ Service Advisor",
      label: "Employee Id of Relationship Manager/ Service Advisor",
      required: true,
    },
     {
      name: "gmEmail",
      type: "email",
      placeholder: "General Manager Email Id",
      label: "General Manager Email",
    },
  ];
  const leftVehicleFields = [
    {
      name: "hypothecated",
      type: "text",
      placeholder: "Hypothecated To",
      label: "Hypothecated To",
    },
    {
      name: "model",
      type: "text",
      placeholder: "Model",
      label: "Model",
      required: true,
    },
    {
      name: "hsnCode",
      type: "text",
      placeholder: "HSN/SAC code",
      label: "HSN/SAC code",
      required: true,
    },
    {
      name: "discountPercent",
      type: "text",
      placeholder: "Discount %",
      label: "Discount %",
    },

    {
      name: "cgst",
      type: "number",
      placeholder: "CGST 9%",
      label: "CGST 9%",
      required: true,
    },
     {
      name: "totalGst",
      type: "text",
      placeholder: "Total GST Value",
      label: "Total GST Value",
    },
   
    {
      name: "totalAssessableValue",
      type: "text",
      placeholder: "Total Assessable Value",
      label: "Total Assessable Value",
    },
    {
      name: "invoiceValueAmtInWord",
      type: "text",
      placeholder: "Invoice Value Amount In Words",
      label: "Invoice Value Amount In Words",
    },
    {
      name: "taxPayableAmtinWord",
      type: "text",
      placeholder: "Tax Payable Amount in Words",
      label: "Tax Payable Amount in Words",
    },
    {
      name: "rmEmail",
      type: "email",
      placeholder: "Relationship Manager/ Service Advisor Email Id",
      label: "Email Id of Relationship Manager/ Service Advisor ",
      required: true,
    },
   
  ];

  const handleInput = (e) => {
    const { name, value, dataset } = e.target;
    const section = dataset?.section;

    setInvoiceData((prevState) => {
      const updatedSection = {
        ...prevState[section],
        [name]: value,
      };

      const toTwoDecimal = (num) => Number(num.toFixed(2));

      // Always read base values
      const gstAmount = Number(updatedSection.gstAmount || 0);
      const discountPercent = Number(updatedSection.discountPercent || 0);
      const cgst = Number(updatedSection.cgst || 0);
      const sgst = Number(updatedSection.sgst || 0);

      // 🔒 Default existing values (do NOT recalc unless discount changes)
      let totalValue = prevState[section]?.totalValue || gstAmount;
      let taxableValue = prevState[section]?.taxableValue +cgst +sgst|| totalValue;
      let totalAssessableValue =
        prevState[section]?.totalAssessableValue || totalValue;

      // ✅ Recalculate ONLY when discountPercent changes
      if (name === "discountPercent") {
        const discountAmount = toTwoDecimal(
          (gstAmount * discountPercent) / 100
        );

        totalValue = toTwoDecimal(gstAmount - discountAmount);
      taxableValue = Number(totalValue + sgst + cgst).toFixed(2);

        totalAssessableValue = totalValue;
      }

      const totalGst = toTwoDecimal(cgst + sgst);

      const totalInvoiceValue = toTwoDecimal(
        totalValue + totalAssessableValue + totalGst
      );

      const taxPayableAmtinWord = numberToWords(Math.round(totalGst)) + " Only";

      const invoiceValueAmtInWord =
        numberToWords(Math.round(totalInvoiceValue)) + " Only";

      return {
        ...prevState,
        [section]: {
          ...updatedSection,
          totalValue,
          taxableValue,
          totalAssessableValue,
          totalGst,
          totalInvoiceValue,
          taxPayableAmtinWord,
          invoiceValueAmtInWord,
        },
      };
    });
  };

  useEffect(() => {
    return () => {
      setInvoiceData({ ...initialInvoiceData });
      dispatch(setEmptyInvoiceData());
    };
  }, []);

  const calculateVehicleDetails = useCallback(() => {
    setInvoiceData((prevState) => {
      const inputGst = Number(prevState.vehicleDetails?.initialGstAmount || 0);

      if (!inputGst) return prevState; // No input, don't calculate

      // Compute base amount and taxes
      const baseAmount = Number((inputGst / 1.18).toFixed(2));
      const totalGst = Number((inputGst - baseAmount).toFixed(2));
      const cgst = Number((totalGst / 2).toFixed(2));
      const sgst = Number((totalGst - cgst).toFixed(2));
      const totalAmount = Number((baseAmount + cgst + sgst).toFixed(2));

      // Avoid unnecessary updates
      if (
        prevState.vehicleDetails?.cgst === cgst &&
        prevState.vehicleDetails?.sgst === sgst &&
        prevState.vehicleDetails?.totalAmount === totalAmount
      ) {
        return prevState;
      }

      return {
        ...prevState,
        vehicleDetails: {
          ...prevState.vehicleDetails,
          cgst,
          sgst,
          totalAmount,
          gstAmount: baseAmount,
        },
      };
    });
  }, []);

  useEffect(() => {
    if (invoiceData.vehicleDetails?.gstAmount) {
      calculateVehicleDetails();
    }
  }, [invoiceData.vehicleDetails?.gstAmount, calculateVehicleDetails]);

  // console.log(invoiceData.vehicleDetails, invoiceData.vehicleDetails.gstAmount)
  const handleCheckboxChange = (e) => {
    setSameAsBilling(e.target.checked);
    if (e.target.checked) {
      setInvoiceData((prevState) => ({
        ...prevState,
        shippingDetails: { ...prevState.billingDetail },
      }));
    }
  };

  const validateFields = () => {
    const notRequiredVehicleFields = [
      "vehicleDetails.gmEmail",
      "vehicleDetails.hypothecated",
      "vehicleDetails.branchName",
      "vehicleDetails.totalAmountInWords",
    ];
    const notRequiredCustomerFields = [
      "billingDetail.address",
      "billingDetail.pan",
      "billingDetail.stateCode",
      "billingDetail.customerGst",
      "billingDetail.zipCode",
    ];
    const notRequiredShippingDetails = [
      "shippingDetails.address",
      "shippingDetails.pan",
      "shippingDetails.stateCode",
      "shippingDetails.customerGst",
      "shippingDetails.zipCode",
    ];

    const billingDetail = invoiceData?.billingDetail || {};
    const shippingDetails = invoiceData?.shippingDetails || {};
    const vehicleDetails = invoiceData?.vehicleDetails || {};

    const requiredFields = {
      ...Object.keys(billingDetail).reduce(
        (acc, key) =>
          notRequiredCustomerFields.includes(`billingDetail.${key}`)
            ? acc
            : {
                ...acc,
                [`billingDetail.${key}`]: `${key} in Billing Details is required`,
              },
        {}
      ),
      ...Object.keys(shippingDetails).reduce(
        (acc, key) =>
          notRequiredShippingDetails.includes(`shippingDetails.${key}`)
            ? acc
            : {
                ...acc,
                [`shippingDetails.${key}`]: `${key} in Shipping Details is required`,
              },
        {}
      ),
      ...Object.keys(vehicleDetails).reduce(
        (acc, key) =>
          notRequiredVehicleFields.includes(`vehicleDetails.${key}`)
            ? acc
            : {
                ...acc,
                [`vehicleDetails.${key}`]: `${key} in Vehicle Details is required`,
              },
        {}
      ),
    };

    const errors = {};

    Object.keys(requiredFields).forEach((fieldPath) => {
      const value = fieldPath
        .split(".")
        .reduce(
          (o, key) => (o && typeof o === "object" ? o[key] : undefined),
          invoiceData
        );

      if (value === undefined || value === null || value === "") {
        errors[fieldPath] = requiredFields[fieldPath];
      }
    });

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    if (invoiceId) {
      dispatch(fetchInvoiceById({ invoiceId }));
    }
    if (id) {
      dispatch(fetchrgpDataById({ id, option: null }));
    }
  }, [id, invoiceId]);

  useEffect(() => {
    if (location.pathname === "/admin/invoice-edit" && invoiceById?.invoice) {
      const totalValue = Number(
        invoiceById?.invoice?.vehicleDetails?.totalValue || 0
      ).toFixed(2);

      setInvoiceData((prev) => ({
        ...prev,
        ...invoiceById?.invoice,
        vehicleDetails: {
          ...invoiceById?.invoice?.vehicleDetails,
          taxableValue: Number(totalValue),
          totalAssessableValue: Number(totalValue),
        },
      }));
    }
  }, [invoiceById?.invoice, location.pathname]);

  const mergedData = useMemo(() => {
    if (!typeData) return {};

    return {
      ...rgpByIdorStatus?.data,
    };
  }, [typeData, rgpByIdorStatus]);
  useEffect(() => {
    if (typeData !== "edit") {
      setInvoiceData((prevState) => ({
        ...prevState,
        invoiceType: mergedData.invoiceType || prevState.invoiceType || "",
        email: mergedData.email || prevState.email || "",
        billingDetail: {
          customerName: mergedData?.customerDetails?.customerName || "",
          address: mergedData?.customerDetails?.address || "",
          contact: mergedData?.customerDetails?.contact || "",
          email: mergedData?.customerDetails?.email || "",
          pan: mergedData?.customerDetails?.pan || "",
          customerGst: mergedData?.customerDetails?.customerGst || "",
          zipCode: mergedData?.customerDetails?.zipCode || "",
          stateCode: mergedData?.customerDetails?.stateCode || "",
        },
        vehicleDetails: {
          vinNumber: mergedData.vehicleDetails?.vinNumber || "",
          model:
            mergedData.vehicleDetails?.model ||
            mergedData.vehicleDetails?.vehicleModel ||
            "",
          gstAmount:
            mergedData.vehicleDetails?.total ||
            mergedData.vehicleDetails?.totalPayment ||
            mergedData.ewDetails?.warrantyAmount ||
            "",

          initialGstAmount:
            mergedData.vehicleDetails?.total ||
            mergedData.vehicleDetails?.totalPayment ||
            mergedData.ewDetails?.warrantyAmount ||
            "",
          rmEmail: mergedData.vehicleDetails?.rmEmail || "",
          rmName: mergedData.vehicleDetails?.rmName || "",
          rmEmployeeId: mergedData.vehicleDetails?.rmEmployeeId || "",
          gmEmail: mergedData.vehicleDetails?.gmEmail || "",
        },
      }));
    }
  }, [typeData, mergedData]);

  const payload = {
    ...invoiceData,
    ...(createdBy && { createdBy }),
    ...(mergedData?.vehicleDetails?.dealerLocation && {
      location: mergedData.vehicleDetails.dealerLocation,
    }), // Add only if location exists
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateFields();

    if (isValid) {
    } else {
      console.log("Validation errors:", errors);
      toast.error("Please fill in all required fields");
      return;
    }

    // const getChangedFields = (current, original) => {
    //   return Object.keys(current).reduce((changes, key) => {
    //     if (JSON.stringify(current[key]) !== JSON.stringify(original[key])) {
    //       changes[key] = current[key];
    //     }
    //     return changes;
    //   }, {});
    // };

    // const getChangedFields = (current, original) => {
    //   return Object.keys(current).reduce((changes, key) => {
    //     if (key === "vehicleDetails" && current[key]?.vinNumber) {
    //       changes.vehicleDetails = {
    //         ...changes.vehicleDetails,
    //         vinNumber: current[key].vinNumber,
    //         rmEmail: current[key].rmEmail,
    //         gmEmail: current[key].gmEmail,
    //       };
    //     }

    //     if (JSON.stringify(current[key]) !== JSON.stringify(original[key])) {
    //       changes[key] = current[key];
    //     }

    //     if (key === "billingDetail" && current[key]?.email) {
    //       changes.billingDetail = {
    //         ...changes.billingDetail,
    //         email: current[key].email,
    //       };
    //     }

    //     return changes;
    //   }, {});
    // };

    const role = localStorage.getItem("roleType");
    try {
      setisLoading(true);
      let res;

      if (invoiceId) {
        const { createdBy, createdAt, ...editPayload } = invoiceData;
        res = await editInovoice(editPayload, invoiceId);
        toast.success(res?.message || "Invoice updated successfully");
      } else {
        const updateResponse = await updatergpStatus(id, "approved", null);

        if (updateResponse.status === 200) {
          res = await addNewInovoice(payload, role);
          toast.success(res?.message || "Invoice added successfully");
        }
      }
      setisLoading(false);
      navigate("/admin/invoice-lists");
    } catch (error) {
      console.log(error);
      setisLoading(false);

      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      <div className="fixed">
        <span className="absolute">{<Nav />}</span>
      </div>
      <div>
        <Header />
      </div>
      <span className="flex md:flex-row flex-col md:items-center justify-between md:mx-36 mx-6 font-head md:pt-12 pt-12 ">
        <p className="md:text-[23px] text-[18px] font-semibold pt-12 md:ml-[13.5%] sm:ml-[25%]">
          Add New Invoice
        </p>
        <p className="md:text-[18px] text-[16px] font-medium md:pt-12 pt-4 sm:ml-[25%]">
          Invoice Issue Date - {formattedDate}
          {/* id ? formatDate(isCreatedDate) :  */}
        </p>
      </span>
      <div className="sm:ml-[26.5%] md:ml-[21%]  w-full">
        <p className="text-[20px] font-head font-semibold mt-5">
          Customer Bill to Details
        </p>

        <GroupedInput
          leftFields={leftFields}
          rightFields={rightFields}
          stateName={invoiceData.billingDetail}
          errors={errors || {}}
          onChange={(e) => {
            const { name, value } = e.target;
            handleInput({
              target: { name, value, dataset: { section: "billingDetail" } },
            });
          }}
        />
        <p className="text-[20px] font-head font-semibold mt-5">
          Customer Shipped to
        </p>
        <div className="mt-5 flex items-center gap-2 ">
          <input
            type="checkbox"
            id="sameAsBilling"
            checked={sameAsBilling}
            onChange={(e) => handleCheckboxChange(e)}
          />
          <label htmlFor="sameAsBilling">Same as above</label>
        </div>
        <GroupedInput
          leftFields={leftFields}
          rightFields={rightFields}
          stateName={invoiceData.shippingDetails}
          errors={errors || {}}
          onChange={(e) => {
            const { name, value } = e.target;
            handleInput({
              target: { name, value, dataset: { section: "shippingDetails" } },
            });
          }}
        />

        <p className="text-[20px] font-head font-semibold mt-5">
          Vehicle Details
        </p>
        <GroupedInput
          leftFields={leftVehicleFields}
          rightFields={rightVehicleFields}
          stateName={invoiceData.vehicleDetails}
          errors={errors || {}}
          onChange={(e) => {
            const { name, value } = e.target;
            handleInput({
              target: { name, value, dataset: { section: "vehicleDetails" } },
            });
          }}
        />
        <div className="mt-9 mb-20">
          <span
            onClick={handleSubmit}
            className="bg-primary text-white px-6 rounded-md py-2 cursor-pointer"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </span>
        </div>
      </div>
    </>
  );
};

export default InvoiceForm;
