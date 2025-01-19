import React from "react";
import "./App.css"; // Ensure you import the CSS file

const InputField = ({ inputValue }) => {
  return (
    <div >
      <input className="InputField" type="text" value={inputValue} readOnly /> {/* Display the inputValue */}
    </div>
  );
};

export default InputField;
