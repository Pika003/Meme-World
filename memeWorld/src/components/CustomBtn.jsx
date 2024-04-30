import React from "react";

const CustomBtn = ({ title, handleSubmit, addstyle }) => {
  return (
    <button
      onClick={handleSubmit}
      className={`py-2 px-10 rounded-md ${addstyle}`}
    >
      {title}
    </button>
  );
};

export default CustomBtn;
