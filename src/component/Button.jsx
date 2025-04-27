import React from "react";

const Button = ({ onClick, children, color = "blue" ,type }) => {
  const baseStyle = "text-white px-4 py-2 rounded-lg transition";
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    red: "bg-red-500 hover:bg-red-600",
    gray: "bg-gray-500 hover:bg-gray-600",
  };

  return (
    <>
    <button type={type} onClick={onClick} className={`${baseStyle} ${colors[color]}`}>
      {children}
    </button>

    </>
  );
};

export default Button;
