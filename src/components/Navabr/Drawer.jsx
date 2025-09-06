import React, { useState } from "react";
import Icon from "../Button/Icon"; // Ensure this is correctly imported
import { Column, Heading, Sidebar } from "../ComponentsIndex";

function OffCanvas() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Icon
        className="text-2xl mr-2 lg:hidden cursor-pointer text-white"
        children="list"
        onClick={() => setIsOpen(true)}
      ></Icon>
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Off-canvas menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-md shadow-lg transform transition-transform z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Column className="flex justify-between mx-3 mt-5 mb-3">
          <Heading
            children={"Careconnect"}
            className={"text-xl font-bold text-white"}
          />
          <i
            className="bi bi-x-lg text-xl text-white"
            onClick={() => setIsOpen(false)}
          ></i>
        </Column>

        <div className="mx-3">
          <Sidebar closeMenu={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
}

export default OffCanvas;
