import React, { useState } from "react";
// import { contactus } from "../../components/Img/ImportedImage";
// import CommanBanner from "../../components/Banners/CommanBanner";

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAnswer = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What types of accommodations are available at Stay Vilmaris?",
            answer: `Stay Vilmaris offers two distinct experiences in North Goa:
• Spacious Private Villas nestled in the tranquil village of Saligao.
• A full-service hotel in the heart of Calangute.`
        },
        {
            question: "Where are your properties located?",
            answer: `• Villas: Serene village of Saligao – ideal for peaceful getaways.
• Hotel: Centrally located in Calangute – close to beach and attractions.`
        },
        {
            question: "How do I choose between staying in a villa or the hotel?",
            answer: `• Choose villas for spacious, private settings (great for families or groups).
• Choose hotel for classic comfort with concierge, in-house dining, pool, and meeting facilities.`
        },
        {
            question: "What amenities can I expect at Stay Vilmaris?",
            answer: `All Guests:
• Wi-Fi, AC, Daily Housekeeping, Warm Hospitality
Villas:
• Living areas, Kitchen, Private Access, Garden
Hotel:
• Modern Rooms, Concierge, Business Facilities`
        },
        {
            question: "Is there a restaurant on-site?",
            answer: `• Villas: Chef-on-call with à la carte menu or dine at “Two States” restaurant at the hotel.
• Hotel: “Two States” serves Northern and Goan cuisine with curated menus.`
        },
        {
            question: "Can I make bookings for both villas and the hotel on this website?",
            answer: "Absolutely! You can book both directly through Careconnect.com."
        },
        {
            question: "Are your properties suitable for families and groups?",
            answer: `Yes, all are family-friendly.
• Villas: Ideal for large families or groups.
• Hotel Rooms: Great for solo travelers, couples, and families.`
        },
        {
            question: "Do you provide airport transfers or travel assistance?",
            answer: "Yes, on request. Please inform us in advance for arrangements."
        },
        {
            question: "How far is Stay Vilmaris from the airport, station, and beach?",
            answer: `• Dabolim Airport: 50–55 mins
• Mopa Airport: 30–35 mins
• Thivim Station: 35–40 mins
• Mapusa Bus Stand: 15–20 mins
• Calangute & Candolim Beaches:
   - Villas: 10–15 mins
   - Hotel: 5 mins`
        },
        {
            question: "Are pets allowed at Stay Vilmaris?",
            answer: "Pet policies vary by property. Contact us to confirm."
        },
        {
            question: "Can I host a private event or meeting?",
            answer: `• Villas: Great for private events with garden access.
• Hotel: Modern conference rooms available for business use.`
        },
          {
            question: "Do you provide housekeeping services at the hotel and villa?",
            answer: "Yes, we provide daily housekeeping services at both our hotel and villa to ensure a clean, fresh, and comfortable stay at Vilmaris."
        },
        {
            question: "What are the standard check-in and check-out timings at the hotel and villa?",
            answer: "Our standard check-in time is 2:00 PM, and check-out time is 11:00 AM. Early check-in or late check-out may be accommodated upon request, subject to availability."
        },
        {
            question: "Does Vilmaris offer a swimming pool at both the hotel and the villa?",
            answer: "Yes, Vilmaris offers swimming pool facilities at both the hotel and the villa. The villa comes with a private swimming pool for your exclusive use, while the hotel features a common semi-covered pool with a sunken bar, providing the perfect spot to relax and unwind."
        },
        {
            question: "Does Vilmaris provide workspaces for guests at both the hotel and villa?",
            answer: "Yes, Vilmaris provides work-friendly spaces at both the hotel and villa, complete with comfortable seating and high-speed Wi-Fi to ensure a productive stay."
        }
    ];

    return (
        <>
            {/* <CommanBanner  children={contactus} /> */}

            <div className="container mx-auto px-4 my-10">
                <div className="mt-16">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions (FAQs)</h2>
                    <div className="divide-y divide-gray-300 border-t border-b">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="py-4 cursor-pointer hover:bg-gray-50 transition"
                                onClick={() => toggleAnswer(index)}
                            >
                                <div className="flex justify-between items-center">
                                    <p className="text-base text-black font-medium">{faq.question}</p>
                                    <i
                                        className={`bi ${activeIndex === index ? "bi-dash-circle" : "bi-plus-circle"
                                            } text-lg text-primary`}
                                    ></i>
                                </div>
                                {activeIndex === index && (
                                    <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>

    );
};

export default Faq;
