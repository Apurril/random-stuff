/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState, useEffect } from "react";
import "./index.css";

const App = () => {
  const [counter, setCounter] = useState(0);
  const [farmers, setFarmers] = useState(0);
  const [toggle, setToggle] = useState(true);
  const [tick, setTick] = useState(0);

  const handleIncrement = (amount = 1) => {
    setCounter((prevCounter) => prevCounter + farmers + amount);
  };

  const handleDecrement = (amount = 1) => {
    setCounter((prevCounter) => prevCounter - amount);
  };

  const handleHire = () => {
    if (counter >= 2) {
      handleDecrement(2);
      setFarmers(farmers + 1);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleTick = () => {
    setTick((prevTick) => prevTick + 1);
  };

  useEffect(() => {
    if (toggle) {
      const timer = setTimeout(() => {
        handleTick();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [tick, toggle]);

  useEffect(() => {
    handleIncrement();
  }, [tick]);

  return (
    <div>
      <div className="counterDisplay">{`${counter}`}</div>
      <CustomButton text="Increment" onClick={() => handleIncrement()} />
      <CustomButton text="Decrement" onClick={() => handleDecrement()} />
      <CustomButton text={`Hire Farmer (${farmers})`} onClick={handleHire} />
      <CustomButton text={`Toggle (${toggle})`} onClick={handleToggle} />
    </div>
  );
};

const CustomButton = ({ text, onClick }) => (
  <button
    className="btn"
    type="button"
    onClick={onClick}
  >
    {text}
  </button>
);

export default App;
