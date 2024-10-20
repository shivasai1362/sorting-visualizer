import React from "react";

function CustomButton({ text, handleClick, disabled, customStyle }) {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`border-[3px] ${
        disabled &&
        "border-red-400 bg-red-400 hover:bg-red-400 active:bg-red-400 shadow-lg active:border-red-400 "
      } bg-none border-solid m-2 p-3 border-green-400  rounded-lg font-semibold text-gray-800 hover:bg-green-400 hover:shadow-lg transition-colors  active:bg-green-500 active:shadow-lg active:text-gray-900 active:border-green-500
      ${customStyle}
      `}
    >
      {text}
    </button>
  );
}

export default CustomButton;
