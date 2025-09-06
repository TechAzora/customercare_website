import React, { useEffect, useState } from "react";
import { Button, Column, Heading, Row, Wrapper } from "../ComponentsIndex";
import Icon from "../Button/Icon";

export default function Modal({
  isOpen = false,
  closeModal,
  className = "",
  title = "",
  children,
  ...props
}) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
    } else {
      const timer = setTimeout(() => setShowModal(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <>
      {showModal && (
        <Row
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-out ${
            isOpen ? "opacity-100" : "opacity-0"
          } ${className}`}
          tabIndex={-1}
          {...props}
        >
          <Column
            className={`relative w-full max-w-lg mx-auto transform transition-all duration-300 ease-out ${
              isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
            }`}
          >
            <Wrapper className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Wrapper className="px-6 py-4 border-b border-gray-200">
                <Heading className="text-lg font-semibold text-custom-purple">
                  {title}
                </Heading>
                <i
                  className="absolute top-3 right-3 p-2 hover:text-red-600 cursor-pointer"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <Icon children={"x-lg"} />
                </i>
              </Wrapper>
              <Wrapper
                className="px-6 py-4 overflow-y-auto"
                style={{ maxHeight: "80vh" }} 
              >
                {children}
              </Wrapper>
            </Wrapper>
          </Column>
        </Row>
      )}
    </>
  );
}
