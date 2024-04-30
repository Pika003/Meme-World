import React from "react";

function CustomInput({ title, Value, setValue, Type = "text" }) {
  return (
    <input
      value={Value}
      onChange={(e) => setValue(e.target.value)}
      type={Type}
      placeholder={title}
      className="w-[80%] outline-none border-0 bg-[#B0AB99] text-gray-900 p-2 rounded-sm placeholder-slate-700"
    />
  );
}

export default CustomInput;
