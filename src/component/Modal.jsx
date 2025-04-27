// src/components/Modal.js
import React from "react";

const Modal = ({ show, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0  bg-opacity-40 backdrop-blur-sm transition-opacity" />

      {/* Modal Content */}
      <div className="relative z-10 bg-white rounded-xl shadow-lg p-6 w-[300px] text-center transform transition duration-300 scale-100 opacity-100 animate-modalShow">
        {children}
      </div>
    </div>
  );
};

export default Modal;

