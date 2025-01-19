import React, { useState, useRef } from "react";
import "./App.css";

const Button = ({ onClick, text, className }) => {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
};

function App() {
  const inputRef = useRef(null);
  const [result, setResult] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [operation, setOperation] = useState(null);
  const [previousValue, setPreviousValue] = useState(null);

  const handleOperation = (selectedOperation) => {
    if (inputValue) {
      setPreviousValue(Number(inputValue));
    }
    setOperation(selectedOperation);
    setInputValue((prevValue) => prevValue + " " + selectedOperation + " ");
  };

  const handleSubmit = () => {
    if (previousValue === null || inputValue === "") return;

    const currentValue = Number(inputValue.split(" ").pop());
    if (isNaN(currentValue)) return;

    let newResult = result;
    switch (operation) {
      case "+":
        newResult = previousValue + currentValue;
        break;
      case "-":
        newResult = previousValue - currentValue;
        break;
      case "x":
        newResult = previousValue * currentValue;
        break;
      case "÷":
        if (currentValue === 0) {
          alert("Cannot divide by zero");
          return;
        }
        newResult = previousValue / currentValue;
        break;
      default:
        break;
    }

    setResult(newResult);
    setInputValue("");
    setPreviousValue(null);
    setOperation(null);
  };

  const handleResetInput = () => {
    setInputValue("");
  };

  const handleResetResult = () => {
    setResult(0);
  };

  const handleInputChange = (num) => {
    setInputValue((prevValue) => prevValue + num);
  };

  return (
    <div className="App">
      <h1 className="Title">Simple Calculator</h1>
      <div className="Calculator">
        <Display result={result} />
        <InputField inputRef={inputRef} inputValue={inputValue} />

        {/* Number Buttons */}
        <div className="NumberContainer">
          {[...Array(10).keys()].map((num) => (
            <Button
              key={num}
              className="NumberPad"
              onClick={() => handleInputChange(num.toString())}
              text={num.toString()}
            />
          ))}
        </div>

        {/* Operation Buttons */}
        <div className="ButtonContainer">
          {["+", "-", "x", "÷"].map((op) => (
            <Button
              key={op}
              className="operation-buttons"
              onClick={() => handleOperation(op)}
              text={op}
            />
          ))}
        </div>
        <div>
          <div className="eql">
            {/* Equal Button */}
            <Button className="equal-button" onClick={handleSubmit} text="=" />
          </div>
          {/* Reset Buttons */}
          <div className="resets">
            <Button
              className="reset-buttons"
              onClick={handleResetInput}
              text="Reset Input"
            />
            <Button
              className="reset-buttons"
              onClick={handleResetResult}
              text="Reset Result"
            />
          </div>
        </div>
      </div>
      <footer>
        <h5>&copy; Thollarkings 2024</h5>
      </footer>
    </div>
  );
}

function Display({ result }) {
  return <div className="Display">{result}</div>;
}

function InputField({ inputRef, inputValue }) {
  return <input ref={inputRef} value={inputValue} className="InputField" readOnly />;
}

export default App;
