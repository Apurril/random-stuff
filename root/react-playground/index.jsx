/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, {
  useState, useEffect, useCallback, useReducer,
} from "react";
import "./index.css";

const defaultState = {
  money: 0,
  farmer: 0,
};

const App = () => {
  const [tick, setTick] = useState(0);
  const [toggle, setToggle] = useState(true);

  const [state, dispatch] = useReducer((currentState, action) => {
    const { money, farmer } = currentState;

    switch (action.type) {
      case "IncrementMoney":
        return {
          ...currentState,
          money: money + farmer + action.amount,
        };

      case "DecrementMoney":
        return {
          ...currentState,
          money: money - action.amount,
        };

      case "HireWorker":
        return {
          ...currentState,
          [action.worker]: currentState[action.worker] + 1,
          money: money - action.cost,
        };

      default:
        return currentState;
    }
  }, defaultState);

  const { money, farmer } = state;

  const handleHire = () => {
    if (money >= 2) {
      dispatch({ type: "HireWorker", worker: "farmer", cost: 2 });
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const handleTick = () => {
      setTick((prevTick) => prevTick + 1);
    };
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
    dispatch({ type: "IncrementMoney", amount: 1 });
    console.log(`Tick ${tick}`);
  }, [tick]);

  return (
    <div>
      <div className="counterDisplay">{`${money}`}</div>
      <CustomButton text="Increment" onClick={() => dispatch({ type: "IncrementMoney", amount: 1 })} />
      <CustomButton text="Decrement" onClick={() => dispatch({ type: "DecrementMoney", amount: 1 })} />
      <CustomButton text={`Hire Farmer (${farmer})`} onClick={handleHire} />
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
