import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLocation, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { getrgpbyId } from "../features/RGPapi";
import Loader from "../Components/Loader";
import { formatDate } from "../helper/commonHelperFunc";

const paragraphStyle = {
  paddingLeft: "2.5em",
  textIndent: "-2.5em",
  lineHeight: "1.5",
};
const ViewRGP = forwardRef(({ id }, ref) => {
  const [data, setData] = useState();
    const {rgpToken} = useParams();
  const rgpId = id ? id : rgpToken

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getrgpbyId(rgpId, null);
        setData(res?.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [rgpId]);

  const pdfRef = useRef();
  const handleDownloadPDF = () => {
    const input = pdfRef.current;
    const opt = {
      margin: 0,
      filename: `${data?.vehicleDetails?.vinNumber}_rgp` || "360_Invoice",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: "avoid-all" },
    };
    html2pdf().from(input).set(opt).save();
  };

  useImperativeHandle(ref, () => ({
    handleDownloadPDF,
  }));
  if (!data) {
    return (
      <div className="mt-16 flex justify-center md:ml-32 sm:ml-32">
        {/* <Loading customText={"Loading"} /> */}
        <Loader />
      </div>
    );
  }

  return (
    <div ref={pdfRef} className=" p-6 font-body m-3 text-[13px] mx-20">
      <h2
        className="text-[16px]  text-center font-bold underline"
        style={{ margin: 0 }}
      >
        TERMS AND CONDITIONS
      </h2>
      <div className="flex flex-col items-start justify-center text-[13px]">
        <div className="mt-9">
          <p className="font-bold underline">1. Introduction:</p>

          <p>
            These Terms and Conditions (“Terms”) govern the{" "}
            {data?.vehicleDetails?.servicePackage} Service Package (“Package”) offered
            by Raam Electric Two Wheelers LLP. (hereinafter referred to as "Raam
            Ather" or "Company"). By enrolling in the Package, customers
            (“Participants”) agree to be bound by these Terms:
          </p>
        </div>
        <br />
        <div>
          {" "}
          <p>Customer Name: {data?.customerDetails?.customerName}</p>{" "}
          <p>Vin Number: {data?.vehicleDetails?.vinNumber}</p>{" "}
          <p>Model: {data?.vehicleDetails?.model}</p>{" "}
          <p>Agreement Period: {data?.vehicleDetails?.agreementPeriod}</p>{" "}
          <p>
            {" "}
            Agreement Start date:{" "}
            {formatDate(data?.vehicleDetails?.agreementStartDate)}{" "}
          </p>{" "}
          <p>
            {" "}
            Agreement Valid Date:{" "}
            {formatDate(data?.vehicleDetails?.agreementValidDate)}{" "}
          </p>{" "}
          <p>Maximum PMS allowed: {data?.vehicleDetails?.MaximumValidPMS}</p>{" "}
          <p>Location of the Dealer: {data?.vehicleDetails?.dealerLocation}</p>{" "}
        </div>
        <div className="mt-9">
          <p className="font-semibold underline">2. Package Overview: </p>

          <p>
            The Package is designed to provide Participants with periodic
            vehicle maintenance services from date of Package purchase valid up
            to {data?.vehicleDetails?.servicePackage} or {data?.vehicleDetails?.servicePackage === "3 Years" ? "30,000" : "50,000"}  kilometers, whichever
            occurs earlier, to ensure their Ather vehicle remains in optimal
            condition. The Package is available for a one-time, non-refundable
            payment of INR 7375/-.
          </p>
          <h3 className="mt-6"> a) Brake Pad Replacement:</h3>
          <p className="mt-3">
            The Package includes free replacement of front and rear brake pads
            once a year or every 10,000 kilometers — up to a maximum of five (5)
            replacements during the validity of the Package, whichever is
            earlier.
          </p>

          <h3 className="mt-6">b) Twice a year inclusion:</h3>
          <ul className="mt-3">
            <li className="mt-1">Polish</li>
            <li className="mt-1">Washing</li>
            <li className="mt-1">Express care</li>
            <li className="mt-1">Belt Lubrication</li>
          </ul>

          <ul>
            <li>10% Discount on Wear &amp; Tear parts Purchase</li>
            <li>15% Discount on Wear &amp; Tear Labour – Twice a year</li>
          </ul>

          <h4
            style={{
              textAlign: "start",
              marginTop: "9px",
              fontWeight: 600,
            }}
          >
            Wear &amp; Tear parts list as follows:
          </h4>
        </div>
        <div
          style={{ display: "flex", justifyContent: "start", marginTop: "6px" }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              border: "2px solid #000000",
              width: "auto", // key: prevents full width
              minWidth: "300px", // optional for readability
            }}
          >
            <tbody>
              {[
                "Replace Wheel Pulley",
                "Replace Bearing Front wheel",
                "Replace Bearing Rear wheel",
                "Secondary Belt – Wear",
                "Replace Intermediate Pulley",
                "Replace Brake Pad Front",
                "Replace Brake Pad Rear",
                "Replace Fork Oil Seal",
                "Replace Motor Pulley",
                "Primary Belt – Wear",
              ].map((item, index, arr) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "3px 5px",
                      textAlign: "center",
                      borderBottom:
                        index !== arr.length - 1 ? "2px solid #000000" : "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pt-24">
          <p className="font-semibold underline">
            3. Non-refundable and non-cancellable:
          </p>

          <p className="mt-3">
            The Package is strictly non-refundable and non-cancellable. It holds
            no surrender value and cannot be exchanged for cash or any other
            consideration under any circumstances.
          </p>
        </div>
        <div>
          {/* 4. Transferability */}
          <div>
            <p className="font-semibold mt-9">4. Transferability:</p>

            <p className="mt-4">
              The Package shall be transferable to any subsequent owner of the
              vehicle, subject to the fulfillment of the following conditions:
            </p>

            <ol type="i" style={{ paddingLeft: "20px", marginTop: "6px" }}>
              <li>
                i. The original Participant or the subsequent owner must provide
                valid and complete transfer documentation, including an updated
                copy of the Registration Certificate (RC) reflecting the new
                ownership.
              </li>
              <li>
                ii. The new owner must register the transfer of the Package with
                Raam Ather within seven (7) days from the date of transfer of
                ownership as recorded in the Registration Certificate.
              </li>
              <li>
                ii. Failure to comply with the above requirements shall result
                in the immediate and irrevocable forfeiture of all benefits
                under the Package.
              </li>
            </ol>
          </div>

          {/* 5. Service Benefits */}
          <p className="font-semibold mt-6">5. Service Benefits:</p>
          <br />
          <p
            style={{
              display: "inline",
            }}
          >
            {data?.vehicleDetails?.servicePackage === "3 Years"
              ? "Participants are entitled to 6 free periodic maintenance service charges over the 3-year period, which can be availed exclusively at authorized Raam Ather outlets."
              : "Participants are entitled to 10 free periodic maintenance service charges over the 5-year period, which can be availed exclusively at authorized Raam Ather outlets."}
          </p>

          {/* Service Schedule Table */}
          <div style={{ marginTop: "16px" }}>
            <table
              style={{
                borderCollapse: "collapse",
                border: "1px solid #000",
                width: "fit-content",
              }}
            >
              <tbody>
                {/* Row 1 */}
                <tr>
                  <td
                    rowSpan={2}
                    style={{
                      border: "1px solid #000",
                      padding: "8px 16px",
                      fontWeight: 600,
                      textAlign: "center",
                      verticalAlign: "middle",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Service schedule
                  </td>

                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "6px 14px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    KMS Range
                    <br />
                    4700–5500
                  </td>

                  <td
                    rowSpan={2}
                    style={{
                      border: "1px solid #000",
                      padding: "8px 14px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    OR
                  </td>

                  <td
                    style={{
                      border: "1px solid #000",
                      padding: "6px 14px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                  >
                    Days from Last Service
                    <br />
                    165–180
                  </td>
                </tr>

                {/* Row 2 (empty cells under KMS & Days headings) */}
                <tr>
                  <td style={{ border: "1px solid #000" }} />
                  <td style={{ border: "1px solid #000" }} />
                </tr>

                {/* Row 3 — spans FULL width */}
                <tr>
                  <td
                    colSpan={4}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      textAlign: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    For every 5000 km or 6 months from the last service
                  </td>
                </tr>
              </tbody>
            </table>
            <p style={{ marginTop: "8px", fontStyle: "italic" }}>
              * Failing in Scheduled services will lead to a lapse of the
              service coupon.
            </p>
          </div>
        </div>

        <div>
          <p className="font-semibold mt-6">6. Exclusions:</p>
          <br />
          <p>The following are not covered under the Package:</p>

          <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
            <li className="mt-2">
              Cost of consumables, parts, or repairs not part of routine
              periodic maintenance.
            </li>
            <li className="mt-2">
              Any services or benefits not availed within the{" "}
              {data?.vehicleDetails?.servicePackage} validity period (they cannot be
              carried forward or redeemed for cash).
            </li>
            <li className="mt-2">
              Wear-and-tear items (e.g., tyre, side stand, lights) other than
              the specified annual brake pad replacements.
            </li>
            <li className="mt-2">
              Replacement of major vehicle components such as the battery,
              motor, or display unit, unless separately covered under the
              manufacturer’s standard warranty.
            </li>
          </ul>
        </div>

        <div className="mt-52">
          <p className="font-bold underline pt-28">7. Modification of Terms: </p>

          <p>
            The Company Raam Ather reserves the right to modify these Terms at
            its sole discretion. Any such changes will be communicated via
            official channels in advance through its official channel or email,
            etc. Continued participation in the Package following such changes
            shall constitute acceptance of the modified Terms in its entirety.
          </p>
        </div>

        <div className="mt-9">
          <p className="font-bold underline">8. Dispute Resolution:</p>

          <p>
            In the event of any dispute, difference, claim, or question arising
            out of or in connection with the Package or its terms, including its
            interpretation, validity, performance, or breach (collectively
            referred to as "Dispute"), the Participant shall, in the first
            instance, issue a detailed written notice of the Dispute to Raam
            Ather, clearly outlining the nature and particulars of the issue.
            Upon receipt of such notice, Raam Ather shall be afforded a
            reasonable opportunity to engage in good-faith discussions with the
            Participant in an attempt to resolve the Dispute amicably.
          </p>
          <br />
          <p>
            If the Dispute remains unresolved, it shall be referred to and
            finally settled by arbitration in accordance with the provisions of
            the Arbitration and Conciliation Act, 1996, and any statutory
            amendments or modifications thereof for the time being in force. The
            arbitration shall be conducted by a sole arbitrator mutually
            appointed by the Parties, failing which, the appointment shall be
            made in accordance with the said Act. The seat and venue of
            arbitration shall be Hyderabad, Telangana, and the proceedings shall
            be conducted in English. The arbitral award shall be final and
            binding on both Parties. Additionally, customers agree that any
            disputes arising from or related to this Package shall be subject to
            the exclusive jurisdiction of the courts in Hyderabad, Telangana
          </p>
        </div>
        <div>
          <p className="font-semibold mt-9">9. Termination</p>

          <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
            <li>
              Non-compliance with service schedules, unauthorized modifications
              to the vehicle, or servicing at unauthorized centers will lead to
              immediate termination of the Package and forfeiture of all
              benefits. Customers also agree that Raam Ather&apos;s
              determination of such non-compliance or unauthorized activities
              shall be final and binding.
            </li>
            <li>
              Raam Ather reserves the right to conduct periodic audits or
              inspections of vehicles under the Package to ensure compliance
              with the prescribed terms.
            </li>
            <li>
              Participants further acknowledge that any attempt to falsify
              service records, use counterfeit parts, or engage in fraudulent
              activities will result in not only the termination of the Package
              but also potentially legal action at the discretion of Raam Ather.
            </li>
          </ul>
        </div>
        <div>
          {/* 10. Force Majeure */}
          <p className="font-semibold mt-28">10. Force Majeure:</p>

          <p>
            The Company shall not be held liable for any failure or delay in the
            performance of its obligations or in the delivery of benefits under
            the Package due to circumstances beyond its reasonable control,
            including but not limited to acts of God, natural disasters, floods,
            fire, earthquakes, strikes, labor disputes, war, civil unrest, acts
            of terrorism, epidemics, pandemics, government restrictions or
            regulations, or any other events or conditions that could not have
            been reasonably foreseen or prevented.
          </p>

          {/* 11. Customer Responsibility */}
          <p className="font-semibold mt-9">11. Customer Responsibility:</p>

          <p>
            Customers agree to provide accurate and up-to-date information at
            the time of enrolment and during the tenure of the Package. Failure
            to notify Raam Ather of changes in ownership, contact information,
            or vehicle details may result in loss of benefits. Participants must
            promptly report any suspected misuse or fraud related to the Package
            to Raam Ather.
          </p>
        </div>
        <div>
          {/* 12. Communication and Notices */}
          <p className="font-semibold mt-9">12. Communication and Notices:</p>

          <p>
            All communications regarding the Package, including updates and
            changes, will be made via official channels such as emails, SMS, or
            Raam Ather&apos;s website. It is the customer&apos;s responsibility
            to ensure receipt and acknowledgment of such communications.
          </p>

          {/* 13. Data Usage */}
          <p className="font-semibold mt-9">13. Data Usage:</p>

          <p>
            By enrolling in the Package, Participants expressly consent to the
            collection, storage, and use of their personal data by Raam Ather
            for purposes including but not limited to Package administration,
            service scheduling, and marketing, in accordance with applicable
            data protection and privacy laws. By proceeding with the enrolment,
            Participants confirm that they have read, understood, and agreed to
            be bound by these Terms. For further information or assistance,
            Participants may contact their nearest Raam Ather outlet or refer to
            official communication channels.
          </p>

          <p className="mt-9">
            By enrolling in the {data?.vehicleDetails?.servicePackage} Service
            Package, Participants acknowledge that they have read, understood,
            and agreed to all the terms and conditions stated herein.
          </p>

          {/* Customer Details */}
          <div style={{ marginTop: "90px" }}>
            <p className="font-semibold">CUSTOMER</p>

            <p>NAME:</p>
            <p>SIGNATURE:</p>
            <p>DATE:</p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ViewRGP;
