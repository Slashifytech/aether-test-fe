import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import Loader from "../Components/Loader";
import html2pdf from "html2pdf.js";
import { getInvoiceById } from "../features/InvoiceApi";
import { formatDate } from "../helper/commonHelperFunc";

/* ===========================
   SINGLE INVOICE COPY
=========================== */
const InvoiceCopy = ({ data, copyTitle }) => {
  const B = "1px solid #000";

  const cell = {
    border: B,
    padding: "3px",
    fontSize: "11px",
    verticalAlign: "top",
  };

  return (
    <div
      style={{
        width: "1200px",
        margin: "0 auto",
        marginTop: "20px",
        border: B,
        fontFamily: "Arial",
        fontSize: "11px",
      }}
    >
      {/* TITLE */}
      <div style={{ textAlign: "center", borderBottom: B, padding: "4px 0" }}>
        <div style={{ fontWeight: "bold" }}>TAX INVOICE</div>
        <div>(Under Rule 46)</div>
        <div style={{ fontWeight: "bold" }}>{copyTitle}</div>
      </div>
      <div style={{ display: "flex", borderBottom: B }}>
        {" "}
        <div style={{ width: "70%", padding: "4px" }}>
          {" "}
          <div>
            <b>Invoice No :</b> {data?.invoiceId}
          </div>{" "}
          <div>
            <b>ATH - Attapur Service</b>
          </div>{" "}
          <div>2-4-126/4, Plot No.8 & 9, Survey No.18/4</div>{" "}
          <div>Upperpally Village, ATTAPUR</div>{" "}
          <div>GSTIN : 36ABGFR0134F1ZL</div> <div>PAN No : ABGFR0134F</div>{" "}
        </div>{" "}
        <div style={{ width: "30%", textAlign: "right", padding: "4px" }}>
          {" "}
          <div>
            <b>Invoice Date :</b> {formatDate(data?.createdAt)}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* BUYER & SHIPPING */}{" "}
      <div style={{ display: "flex", borderBottom: B }}>
        {" "}
        <div style={{ width: "50%", borderRight: B, padding: "4px" }}>
          {" "}
          <b>Buyer’s Details</b> <div>{data?.billingDetail?.customerName}</div>{" "}
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
      <div style={{ display: "flex", borderBottom: B }}>
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
            <th style={cell}>Sl No</th>{" "}
            <th style={cell}>Description of Goods / Services</th>{" "}
            <th style={cell}>HSN / SAC</th> <th style={cell}>Qty</th>{" "}
            <th style={cell}>Rate</th> <th style={cell}>Disc (%)</th>{" "}
            <th style={cell}>Total Value</th>{" "}
            <th style={cell}>Taxable Value</th>{" "}
            <th style={cell} colSpan={2}>
              CGST
            </th>{" "}
            <th style={cell} colSpan={2}>
              SGST
            </th>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <th style={cell} colSpan={8}></th> <th style={cell}>Rate</th>{" "}
            <th style={cell}>Amount</th> <th style={cell}>Rate</th>{" "}
            <th style={cell}>Amount</th>{" "}
          </tr>{" "}
        </thead>{" "}
        <tbody>
          {" "}
          <tr style={{ height: "90px" }}>
            {" "}
            <td style={cell}>1</td> <td style={cell}>Raam Group Package</td>{" "}
            <td style={cell}>{data?.vehicleDetails?.hsnCode}</td> <td style={cell}>1 Nos</td>{" "}
            <td style={cell}>{data?.vehicleDetails?.gstAmount}</td>{" "}
            <td style={cell}>{data?.vehicleDetails?.discountPercent}</td>{" "}
            <td style={cell}>{data?.vehicleDetails?.totalValue}</td>{" "}
            <td style={cell}>{data?.vehicleDetails?.totalValue}</td>{" "}
            <td style={cell}>9%</td>{" "}
            <td style={cell}>{data?.vehicleDetails?.cgst}</td>{" "}
            <td style={cell}>9%</td>{" "}
            <td style={cell}>{data?.vehicleDetails?.sgst}</td>{" "}
          </tr>{" "}
          <tr>
            {" "}
            <td style={cell} colSpan={3}>
              <b>Total</b>
            </td>{" "}
            <td style={cell}>1.00</td>{" "}
            <td style={cell} colSpan={3}>
              {data?.vehicleDetails?.gstAmount}
            </td>{" "}
            <td style={cell}>{data?.vehicleDetails?.totalValue}</td>{" "}
            <td style={cell}></td>{" "}
            <td style={cell}>{data?.vehicleDetails?.cgst}</td>{" "}
            <td style={cell}></td>{" "}
            <td style={cell}>{data?.vehicleDetails?.sgst}</td>{" "}
          </tr>{" "}
        </tbody>{" "}
      </table>{" "}
      {/* TOTALS SECTION */}{" "}
      <div style={{ display: "flex", borderTop: B }}>
        {" "}
        <div style={{ width: "60%", padding: "6px" }}>
          {" "}
          <div>
            Tax Payable : {data?.vehicleDetails?.taxPayableAmtinWord}
          </div>{" "}
          <div style={{ marginTop: "4px" }}>
            {" "}
            Invoice Value : {data?.vehicleDetails?.invoiceValueAmtInWord}{" "}
          </div>{" "}
        </div>{" "}
        <div style={{ width: "40%", borderLeft: B, padding: "6px" }}>
          {" "}
          <div>Total Value : {data?.vehicleDetails?.totalValue}</div>{" "}
          <div>Total Assessable Value : {data?.vehicleDetails?.totalValue}</div>{" "}
          <div>Total CGST Value : {data?.vehicleDetails?.cgst}</div>{" "}
          <div>Total SGST Value : {data?.vehicleDetails?.sgst}</div>{" "}
          <div style={{ fontWeight: "bold", marginTop: "4px" }}>
            {" "}
            Total Invoice Value : {data?.vehicleDetails?.totalInvoiceValue}{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {/* FOOTER */} {/* FOOTER – EXACT LIKE IMAGE */}{" "}
      <div style={{ borderTop: B, fontSize: "11px" }}>
        {" "}
        {/* Transport + Vehicle */}{" "}
        <div style={{ padding: "6px" }}>
          {" "}
          <div>Transporter :</div> <div>Vehicle No :</div>{" "}
        </div>{" "}
        {/* Bank single line */}{" "}
        <div
          style={{
            borderTop: B,
            padding: "4px 6px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {" "}
          <div>Bank Name : ICICI BANK</div> <div>A/C No : 068105500904</div>{" "}
          <div>IFSC Code : ICIC0000681</div> <div>Swift Code :</div>{" "}
        </div>{" "}
        {/* Narration */}{" "}
        <div style={{ borderTop: B, padding: "4px 6px" }}>
          {" "}
          Narration : MYHAAACAPB64892{" "}
        </div>{" "}
        {/* Terms & Conditions */}{" "}
        <div style={{ borderTop: B, padding: "4px 6px" }}>
          {" "}
          <div>
            <b>Terms & Conditions :</b>
          </div>{" "}
          <div>
            1. Interest will be charged @18% p.a. all amount paid on due date.
          </div>{" "}
          <div>2. Please pay by A/c payee cheque/RTGS.</div>{" "}
        </div>{" "}
        {/* Place & Signature */}{" "}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px 6px 6px",
            borderTop: B,
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
            />{" "}
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
            />{" "}
          </div>{" "}
        </div>{" "}
        {/* Jurisdiction */}{" "}
        <div
          style={{
            borderTop: B,
            textAlign: "center",
            fontSize: "10px",
            padding: "4px 0",
          }}
        >
          {" "}
          SUBJECT TO JURISDICTION OF{" "}
        </div>
      </div>
    </div>
  );
};

/* ===========================
   MAIN COMPONENT
=========================== */
const InvoiceView = forwardRef(({ id }, ref) => {
  const [data, setData] = useState();
  const location = useLocation();
  const invoiceId = id || location?.state?.id;
  const pdfRef = useRef();

  useEffect(() => {
    getInvoiceById(invoiceId).then((res) => {
      setData(res?.invoice);
    });
  }, [invoiceId]);

  const handleDownloadPDF = () => {
    html2pdf()
      .from(pdfRef.current)
      .set({
        margin: 0,
        filename: `${data.invoiceId}_Invoice.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "a3", orientation: "landscape" },
        pagebreak: { mode: ["css", "legacy"] },
      })
      .save();
  };

  useImperativeHandle(ref, () => ({ handleDownloadPDF }));

  if (!data) return <Loader />;

  return (
    <div ref={pdfRef}>
      <InvoiceCopy data={data} copyTitle="ORIGINAL FOR RECIPIENT" />
      <div style={{ pageBreakAfter: "always" }} />

      <InvoiceCopy data={data} copyTitle="DUPLICATE FOR TRANSPORTER" />
      <div style={{ pageBreakAfter: "always" }} />

      <InvoiceCopy data={data} copyTitle="TRIPLICATE FOR CONSIGNEE" />
    </div>
  );
});

export default InvoiceView;
