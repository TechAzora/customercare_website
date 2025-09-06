import React from "react";
export const RenderStars = (selectedRating) => {
  return (
    <Wrapper className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          className={`cursor-pointer ${
            selectedRating >= index + 1 ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          ★
        </span>
      ))}
    </Wrapper>
  );
};
