import React from "react";
import CommanBanner from "../../components/Banners/CommanBanner";
// import { commanbanner } from "../../components/Img/ImportedImage";
import { Row, Wrapper } from "../../components/ComponentsIndex";

function PrivacyPolicy() {
  return (
    <>
      {/* <Row>
        <CommanBanner heading="Privacy Policy" children={commanbanner} />
      </Row> */}

      <Row className="flex justify-center my-10">
        <Wrapper className="w-11/12 md:w-9/12 text-gray-800 space-y-6 text-base leading-relaxed">
          <h1 className="text-3xl font-bold mb-4">Privacy & Cookie Policy</h1>
          <p>
            This is the Cookie Policy for <strong>Careconnect</strong>, accessible from{" "}
            <a
              href="https://www.Careconnect.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              www.Careconnect.com
            </a>
            . This website is jointly operated by <strong>Vilmaris Homes</strong> (for villas) and{" "}
            <strong>Ameripride Hospitality Private Limited</strong> (for the hotel).
          </p>

          <h2 className="text-xl font-semibold mt-6">What Are Cookies?</h2>
          <p>
            As is standard with most professional websites, this site uses cookies — small text
            files downloaded to your device — to enhance your browsing experience. This policy outlines
            what cookies we use, how we use them, and your options for managing them. For more general
            information, refer to this{" "}
            <a
              href="https://en.wikipedia.org/wiki/HTTP_cookie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Wikipedia article on HTTP Cookies
            </a>
            .
          </p>

          <h2 className="text-xl font-semibold mt-6">How We Use Cookies</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To improve website functionality</li>
            <li>To remember your preferences and settings</li>
            <li>To process form submissions smoothly</li>
            <li>To analyze how users interact with our site via analytics tools</li>
          </ul>
          <p className="mt-2">
            In most cases, disabling cookies will affect website functionality and may prevent you
            from using certain features.
          </p>

          <h2 className="text-xl font-semibold mt-6">Disabling Cookies</h2>
          <p>
            You can disable cookies by adjusting your browser settings. However:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Doing so may impact your experience on our website</li>
            <li>Some features and services may no longer function as intended</li>
            <li>It’s recommended to keep cookies enabled for optimal usability</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">Types of Cookies We Use</h2>
          <p className="font-semibold mt-2">1. Forms-related Cookies</p>
          <p>
            When you submit data through forms — such as our contact or booking pages — cookies may
            be used to remember your details for future interactions.
          </p>

          <p className="font-semibold mt-2">2. Analytics Cookies</p>
          <p>
            We use Google Analytics to understand user behavior including time spent on the site, pages
            visited, and user interactions. Learn more on{" "}
            <a
              href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Google Analytics Cookie Usage
            </a>
            .
          </p>

          <p className="font-semibold mt-2">3. E-commerce & Conversion Tracking</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Monitor booking behavior</li>
            <li>Track marketing effectiveness</li>
            <li>Optimize pricing and content strategies</li>
          </ul>

          <p className="font-semibold mt-2">4. Social Media Integration</p>
          <p>
            We use social sharing buttons and plugins for:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-black">
            <li>
              <a href="https://www.facebook.com/profile.php?id=61566766058832" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Facebook (Hotel)
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/Careconnect" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Facebook (Villa)
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/vilmarishotel/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Instagram (Hotel)
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/Careconnect/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                Instagram (Villa)
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/company/103352881/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                LinkedIn (Villa)
              </a>
            </li>
            <li>
              <span className="text-gray-500">YouTube (Coming Soon)</span>
            </li>
          </ul>

          <p>
            These platforms may set cookies via our website to enhance your profile or track engagement
            per their privacy policies.
          </p>

          <h2 className="text-xl font-semibold mt-6">More Information</h2>
          <p>
            We hope this policy provides clarity on how we use cookies. Unless you’re sure you don’t
            need them, it’s generally best to leave cookies enabled.
          </p>

          <p className="mt-2">
            <strong>Need help?</strong> Contact us:
            <br />
            📧 Villas:{" "}
            <a href="mailto:info@vilmarishomes.com" className="text-blue-600 underline">
              info@vilmarishomes.com
            </a>
            <br />
            📧 Hotel:{" "}
            <a href="mailto:support@vilmarishotel.com" className="text-blue-600 underline">
              support@vilmarishotel.com
            </a>
          </p>
        </Wrapper>
      </Row>
    </>
  );
}

export default PrivacyPolicy;
