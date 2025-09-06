import React from "react";
// import CommanBanner from "../../components/Banners/CommanBanner";
// import { commanbanner } from "../../components/Img/ImportedImage";
import { Heading, Paragraph, Row, Wrapper } from "../../components/ComponentsIndex";

function RefundCancellationPolicy() {
  return (
    <>
      {/* <Row>
        <CommanBanner children={commanbanner} heading={"Refund & Cancellation Policy"} />
      </Row> */}

      <Row className="flex justify-center my-8">
        <Wrapper className="w-11/12 max-w-5xl space-y-6 text-gray-700 text-base leading-relaxed">
          <Heading className="text-3xl font-bold text-gray-900 mb-6">
            Refund & Cancellation Policy
          </Heading>

          <Paragraph>
            <strong>For Vilmaris Villas and Hotels</strong>
          </Paragraph>

          <Heading className="text-xl font-semibold mt-6">Standard Cancellation Policy</Heading>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>100%</strong> refund if cancellation is made more than <strong>30 days</strong> before the check-in date.
            </li>
            <li>
              <strong>50%</strong> refund if cancellation is made between <strong>30 to 15 days</strong> prior to check-in.
            </li>
            <li>
              <strong>25%</strong> refund if cancellation is made between <strong>15 to 7 days</strong> prior to check-in.
            </li>
            <li>
              <strong>No refund</strong> for cancellations made within <strong>7 days</strong> of the check-in date.
            </li>
          </ul>

          <Heading className="text-xl font-semibold mt-6">Additional Terms</Heading>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Refunds for international currency payments are subject to prevailing exchange rates at the time of processing.
            </li>
            <li>
              Refunds apply only when <strong>100% payment</strong> has been made. Partial payments are non-refundable.
            </li>
            <li>
              <strong>GST</strong> is applicable on cancellation fees.
            </li>
            <li>
              Bank transaction charges will be deducted from the refunded amount.
            </li>
          </ul>

          <Heading className="text-xl font-semibold mt-6">Non-Refundable Periods</Heading>

          <Paragraph>
            Bookings made during long weekends, citywide sold-out dates, and blackout periods (e.g., events or festivals) are completely non-refundable.
          </Paragraph>

          <Heading className="text-xl font-semibold mt-6">Refund Timeline</Heading>

          <Paragraph>
            Applicable refunds will be processed within <strong>7–10 working days</strong> from the cancellation confirmation date.
          </Paragraph>
        </Wrapper>
      </Row>
    </>
  );
}

export default RefundCancellationPolicy;
