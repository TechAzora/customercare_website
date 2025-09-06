import React from "react";
import { h1, h2, h3 } from "../../components/Img/ImportedImage";
import { ShieldCheck, BadgeCheck, Languages } from "lucide-react";

const blogData = [
  {
    id: 1,
    title: "How to check your diabetes?",
    description:
      "To check for diabetes, a doctor orders blood tests like the A1C test, Fasting Blood Sugar (FBS), Oral Glucose Tolerance Test (OGTT), or a random blood sugar test, depending on your symptoms and risk factors.",
    image: h1,
    author: "Dr. Rahul",
    date: "02 Days Ago",
  },
  {
    id: 2,
    title: "How to check your diabetes?",
    description:
      "To check for diabetes, a doctor orders blood tests like the A1C test, Fasting Blood Sugar (FBS), Oral Glucose Tolerance Test (OGTT), or a random blood sugar test, depending on your symptoms and risk factors.",
    image: h2,
    author: "Dr. Rahul",
    date: "02 Days Ago",
  },
  {
    id: 3,
    title: "How to check your diabetes?",
    description:
      "To check for diabetes, a doctor orders blood tests like the A1C test, Fasting Blood Sugar (FBS), Oral Glucose Tolerance Test (OGTT), or a random blood sugar test, depending on your symptoms and risk factors.",
    image: h3,
    author: "Dr. Rahul",
    date: "02 Days Ago",
  },
];

const features = [
  { icon: ShieldCheck, label: "Secure Payments" },
  { icon: BadgeCheck, label: "Certified Providers" },
  { icon: Languages, label: "English & Hindi" },
];

const TipsGuides = () => {
  return (
    <section className="py-10 max-w-6xl mx-auto px-4">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
        Tips & Guides for Families
      </h2>

      {/* Grid Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Big Left Card */}
        <div className="col-span-1 row-span-2 shadow-lg overflow-hidden rounded-2xl">
          <img
            src={blogData[0].image}
            alt={blogData[0].title}
            className="w-full h-56 object-cover"
          />
          <div className="p-5">
            <h3 className="text-lg font-semibold mb-2">{blogData[0].title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
              {blogData[0].description}
            </p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>by {blogData[0].author}</span>
              <span>{blogData[0].date}</span>
            </div>
          </div>
        </div>

        {/* Right Small Cards */}
        <div className="flex flex-col gap-6">
          {blogData.slice(1).map((blog) => (
            <div
              key={blog.id}
              className="flex shadow-md overflow-hidden rounded-2xl"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-32 h-full object-cover"
              />
              <div className="p-4 flex flex-col justify-between">
                <h3 className="text-base font-semibold mb-1">{blog.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {blog.description}
                </p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>by {blog.author}</span>
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-wrap justify-center gap-6 mt-12">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center border border-[#205c64] rounded-2xl px-10 py-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <item.icon className="w-8 h-8 text-[#205c64] mb-3" />
            <p className="text-[#205c64] font-semibold">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TipsGuides;
