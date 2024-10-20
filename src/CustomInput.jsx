import React from "react";

function CustomInput({ handleChange, placeholder, min, max,value }) {
  return (
    <input
      placeholder={placeholder}
      type="number"
      min={min}
      max={max}
      className={`bg-none me-2 transition-shadow focus:shadow-xl w-32  outline-none border-[3px] border-solid  border-green-400 p-3 rounded-lg font-semibold text-gray-800 m-2 `}
      onChange={handleChange}
      value={value}
    />
  );
}

export default CustomInput;
