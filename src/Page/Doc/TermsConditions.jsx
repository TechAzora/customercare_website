import React from "react";
// import CommanBanner from "../../components/Banners/CommanBanner";
// import { commanbanner } from "../../components/Img/ImportedImage";
import { Heading, Paragraph, Row, Wrapper } from "../../components/ComponentsIndex";

function TermsConditions() {
    return (
        <>
            {/* <Row>
                <CommanBanner children={commanbanner} heading={"Terms & Conditions"} />
            </Row> */}

            <Row className="flex justify-center my-8">
                <Wrapper className="w-11/12 max-w-5xl space-y-6 text-gray-700 text-base leading-relaxed">
                    <Heading className="text-3xl font-bold text-gray-900 mb-6">
                        Terms & Conditions
                    </Heading>

                    <Paragraph>
                        Welcome to <strong>Careconnect.com</strong>. By accessing or using this website, you agree to the following Terms and Conditions, which govern your interaction with our services, content, and any bookings made through the platform.
                        This website is jointly operated by <strong>Vilmaris Homes</strong> (for villa operations) and <strong>Ameripride Hospitality Private Limited</strong> (for hotel operations).
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-8">1. General Use</Heading>
                    <Paragraph>
                        The terms “we”, “us”, or “our” refer collectively to Vilmaris Homes and Ameripride Hospitality Private Limited. The term “you” refers to the user, visitor, or customer using the website. Use of this website is subject to the terms listed below, which may be updated without prior notice.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">2. Content & Ownership</Heading>
                    <Paragraph>
                        All content including images, text, design, layout, and graphics is owned or licensed by us and is protected by applicable intellectual property laws. Reproduction or misuse of any material from this site is strictly prohibited unless authorized in writing.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">3. Accuracy of Information</Heading>
                    <Paragraph>
                        All information provided on this website, including villa and hotel details, amenities, pricing, and services, is for general reference only and may be subject to change. Images are representational. Please verify with our team before making any booking decisions.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">4. Bookings & Payments</Heading>
                    <Paragraph>
                        All bookings are subject to availability and confirmation. Payments are processed securely. We are not liable for third-party gateway failures. Bookings are confirmed only upon official acknowledgment from our team.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">5. Pet Policy</Heading>
                    <Paragraph>
                        Pet-friendliness varies by property. Contact our team to confirm whether pets are allowed at the chosen villa or hotel.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">6. Events, Celebrations & Business Use</Heading>
                    <Paragraph>
                        Villas are suitable for private gatherings. Our hotel offers corporate meeting spaces. Please inform us in advance to arrange these events.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">7. Limitation of Liability</Heading>
                    <Paragraph>
                        Use of this website is at your own risk. We are not liable for any direct or indirect losses or technical outages. All decisions based on site content are your responsibility.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">8. External Links</Heading>
                    <Paragraph>
                        This site may contain third-party links. We are not responsible for their content or policies and do not endorse them.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">9. Governing Law & Jurisdiction</Heading>
                    <Paragraph>
                        All disputes are governed by Indian law. Jurisdiction lies exclusively with the courts of Goa.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">10. Disclaimer</Heading>
                    <Paragraph>
                        The website does not constitute a legal offer. All agreements will be based on final documents executed between the parties.
                    </Paragraph>

                    <Heading className="text-xl font-semibold mt-6">11. Right to Refuse or Cancel</Heading>
                    <Paragraph>
                        We reserve the right to cancel bookings or request guests to vacate the property if rules are violated, or behavior compromises safety or service standards.
                    </Paragraph>
                </Wrapper>
            </Row>
        </>
    );
}

export default TermsConditions;
