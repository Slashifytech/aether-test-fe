import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import Loader from "../Components/Loader";
import { getInvoiceById } from "../features/InvoiceApi";
import { formatDate } from "../helper/commonHelperFunc";

/* =======================
   INVOICE COPY COMPONENT
======================= */
const InvoiceCopy = ({ data, title }) => {
  return (
    <div
      style={{
        width: "900px",
        margin: "0 auto",
        marginTop: "20px",
        marginBottom: "50px",
        border: "1px solid #000",
        fontFamily: "Arial",
        fontSize: "11px",
      }}
    >
      {" "}
      {/* TITLE */}{" "}
      <div
        style={{
          textAlign: "center",
          borderBottom: "1px solid #000",
          padding: "4px 0",
        }}
      >
        {" "}
        <div style={{ fontWeight: "bold" }}>TAX INVOICE</div>{" "}
        <div>(Under Rule 46)</div>{" "}
        <div style={{ fontWeight: "bold" }}>{title}</div>{" "}
      </div>{" "}
      {/* HEADER INFO */}{" "}
      <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
        {" "}
        <div style={{ width: "70%", padding: "4px" }}>
          {" "}
          <div>
            {" "}
            <b>Invoice No :</b> {data?.invoiceId}{" "}
          </div>{" "}
          <div>
            {" "}
            <b>ATH - Attapur Service</b>{" "}
          </div>{" "}
          <div>2-4-126/4, Plot No.8 & 9, Survey No.18/4</div>{" "}
          <div>Upperpally Village, ATTAPUR</div>{" "}
          <div>GSTIN : 36ABGFR0134F1ZL</div> <div>PAN No : ABGFR0134F</div>{" "}
        </div>{" "}
        <div style={{ width: "30%", textAlign: "right", padding: "4px" }}>
          {" "}
          <div>
            {" "}
            <b>Invoice Date :</b> {formatDate(data?.createdAt)}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* BUYER & SHIPPING */}{" "}
      <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
        {" "}
        <div
          style={{
            width: "50%",
            borderRight: "1px solid #000",
            padding: "4px",
          }}
        >
          {" "}
          <b>Buyer’s Details</b>{" "}
          <div>
            {" "}
            {data?.billingDetail?.customerName} -{" "}
            {data?.vehicleDetails?.vinNumber}{" "}
          </div>{" "}
          <div style={{ marginTop: "18px" }}>GSTIN : Unregistered</div>{" "}
        </div>{" "}
        <div style={{ width: "50%", padding: "4px" }}>
          {" "}
          <b>Shipping Details (Place of Supply)</b>{" "}
          <div>{data?.shippingDetails?.customerName}</div>{" "}
          <div style={{ marginTop: "18px" }}>GSTIN : Unregistered</div>{" "}
        </div>{" "}
      </div>{" "}
      {/* PO DETAILS */}{" "}
      <div style={{ display: "flex", borderBottom: "1px solid #000" }}>
        {" "}
        <div style={{ width: "50%", padding: "4px" }}>PO No :</div>{" "}
        <div style={{ width: "50%", padding: "4px" }}>PO Date :</div>{" "}
      </div>{" "}
      {/* ITEM TABLE */}{" "}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        {" "}
        <thead>
          {" "}
          <tr>
            {" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Sl No{" "}
            </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Description of Goods / Services{" "}
            </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              HSN / SAC{" "}
            </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              Qty
            </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}> Rate </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Disc (%){" "}
            </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Total Value{" "}
            </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Taxable Value{" "}
            </th>{" "}
            <th
              style={{ border: "1px solid #000", padding: "3px" }}
              colSpan={2}
            >
              {" "}
              CGST{" "}
            </th>{" "}
            <th
              style={{ border: "1px solid #000", padding: "3px" }}
              colSpan={2}
            >
              {" "}
              SGST{" "}
            </th>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th
              style={{ border: "1px solid #000", padding: "3px" }}
              colSpan={8}
            ></th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}> Rate </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Amount{" "}
            </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Rate{" "}
            </th>{" "}
            <th style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Amount{" "}
            </th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          <tr style={{ height: "90px" }}>
            {" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>1</td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              Raam Group Package{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.hsnCode}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              1 Nos{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.gstAmount}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.discountPercent}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.totalValue}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.totalValue}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>9%</td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.cgst}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>9%</td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.sgst}{" "}
            </td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <td
              style={{ border: "1px solid #000", padding: "3px" }}
              colSpan={3}
            >
              {" "}
              <b>Total</b>{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}> 1.00 </td>{" "}
            <td
              style={{ border: "1px solid #000", padding: "3px" }}
              colSpan={3}
            >
              {" "}
              {data?.vehicleDetails?.gstAmount}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.totalValue}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}></td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.cgst}{" "}
            </td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}></td>{" "}
            <td style={{ border: "1px solid #000", padding: "3px" }}>
              {" "}
              {data?.vehicleDetails?.sgst}{" "}
            </td>{" "}
          </tr>{" "}
        </tbody>{" "}
      </table>{" "}
      {/* TOTALS */}{" "}
      <div style={{ display: "flex", borderTop: "1px solid #000" }}>
        {" "}
        <div style={{ width: "60%", padding: "6px" }}>
          {" "}
          <div>
            {" "}
            Tax Payable : {data?.vehicleDetails?.taxPayableAmtinWord}{" "}
          </div>{" "}
          <div style={{ marginTop: "4px" }}>
            {" "}
            Invoice Value : {data?.vehicleDetails?.invoiceValueAmtInWord}{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{ width: "40%", borderLeft: "1px solid #000", padding: "6px" }}
        >
          {" "}
          <div>Total Value : {data?.vehicleDetails?.totalValue}</div>{" "}
          <div>
            {" "}
            Total Assessable Value : {data?.vehicleDetails?.totalValue}{" "}
          </div>{" "}
          <div>
            {" "}
            Total Taxable Value :{" "}
            {data?.vehicleDetails?.cgst + data?.vehicleDetails?.sgst}{" "}
          </div>{" "}
          <div style={{ fontWeight: "bold", marginTop: "4px" }}>
            {" "}
            Total Invoice Value : {data?.vehicleDetails?.totalInvoiceValue}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* FOOTER */}{" "}
      <div style={{ borderTop: "1px solid #000", fontSize: "11px" }}>
        {" "}
        <div style={{ padding: "6px" }}>
          {" "}
          <div>Transporter :</div> <div>Vehicle No :</div>{" "}
        </div>{" "}
        <div
          style={{
            borderTop: "1px solid #000",
            padding: "4px 6px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <div>Bank Name : ICICI BANK</div> <div>A/C No : 068105500904</div>{" "}
          <div>IFSC Code : ICIC0000681</div> <div>Swift Code :</div>{" "}
        </div>{" "}
        <div style={{ borderTop: "1px solid #000", padding: "4px 6px" }}>
          {" "}
          Narration : {data?.vehicleDetails?.vinNumber}{" "}
        </div>{" "}
        <div style={{ borderTop: "1px solid #000", padding: "4px 6px" }}>
          {" "}
          <div>
            {" "}
            <b>Terms & Conditions :</b>{" "}
          </div>{" "}
          <div>
            {" "}
            1. Interest will be charged @18% p.a. all amount paid on due date.{" "}
          </div>{" "}
          <div>2. Please pay by A/c payee cheque/RTGS.</div>{" "}
        </div>{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 6px 6px",
            borderTop: "1px solid #000",
          }}
        >
          {" "}
          <div>
            {" "}
            PLACE :{" "}
            <div
              style={{
                borderBottom: "1px solid #000",
                width: "120px",
                marginTop: "12px",
              }}
            ></div>{" "}
          </div>{" "}
          <div style={{ textAlign: "right" }}>
            {" "}
            Authorised Signatory{" "}
            <div
              style={{
                borderBottom: "1px solid #000",
                width: "160px",
                marginTop: "12px",
              }}
            ></div>{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{
            borderTop: "1px solid #000",
            textAlign: "center",
            fontSize: "10px",
            padding: "4px 0",
          }}
        >
          {" "}
          SUBJECT TO JURISDICTION OF{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};

/* =======================
   MAIN COMPONENT
======================= */
const InvoiceView = forwardRef(({ id }, ref) => {
  const [data, setData] = useState(null);
  const pdfRef = useRef();
    const { invoiceToken } = useParams();
const invoiceId = id ? id : invoiceToken;

  useEffect(() => {
    if (!invoiceId) return;
    getInvoiceById(invoiceId)
      .then((res) => setData(res?.invoice))
      .catch(console.error);
  }, [invoiceId]);

  const handleDownloadPDF = () => {
    html2pdf()
      .from(pdfRef.current)
      .set({
        margin: 0,
        filename: `${data?.invoiceId}_Invoice.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a3", orientation: "portrait" },
      })
      .save();
  };

  useImperativeHandle(ref, () => ({ handleDownloadPDF }));

  if (!data) {
    return (
      <div className="mt-16 flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div ref={pdfRef}>
      <div style={{ pageBreakAfter: "always" }}>
        <InvoiceCopy data={data} title="ORIGINAL FOR RECIPIENT" />
      </div>

      <div style={{ pageBreakAfter: "always" }}>
        <InvoiceCopy data={data} title="DUPLICATE FOR TRANSPORTER" />
      </div>

      <InvoiceCopy data={data} title="TRIPLICATE FOR CONSIGNEE" />
    </div>
  );
});

export default InvoiceView;
