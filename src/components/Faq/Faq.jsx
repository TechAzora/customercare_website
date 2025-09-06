import React, { useState } from 'react';
// import { down_arrow } from "../../components/Img/ImportedImage";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Updated FAQ array with questions and answers
  const faqs = [
    {
      question: 'What are the popular career options after 12th science?',
      answer: 'Popular career options include engineering, medicine, biotechnology, research, and many more. You can choose based on your interests and passion.'
    },
    {
      question: 'What subjects should I focus on for a career in technology?',
      answer: 'You should focus on subjects like mathematics, physics, computer science, and programming languages. These will form the base for your technology career.'
    },
    {
      question: 'Is pursuing medical studies after 12th science a good option?',
      answer: 'Yes, pursuing medical studies is a highly regarded option. It requires dedication, but it opens up many fields such as surgery, dentistry, and more.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="my-10 px-4 pb-20">
      {faqs.map((faq, index) => (
        <div key={index} className="border-b-2 border-black">
          <button
            className="w-full flex justify-between items-center py-4 focus:outline-none"
            onClick={() => toggleFAQ(index)}
          >
            <span className="text-left text-xl md:text-2xl font-bold">{`${index + 1}. ${faq.question}`}</span>
            <span className={`transition-transform duration-100 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
              <img src={down_arrow} alt="" width="50%" />
            </span>
          </button>
          {activeIndex === index && (
            <div className="py-2 text-gray-600 text-lg font-semibold">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
