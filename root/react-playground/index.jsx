/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable consistent-return */

import React, { useState, useEffect, useReducer } from "react";
import "./index.css";

const defaultState = {
  money: 0,
  workers: {
    farmer: 0,
    miner: 0,
  },
};

const defaultWorkers = {
  farmer: {
    cost: 2,
    mps: 2,
  },
  miner: {
    cost: 200,
    mps: 20,
  },
};

const calculateMps = (workers) => Object.keys(workers).reduce(
  (acc, worker) => acc + (workers[worker] * defaultWorkers[worker].mps), 0,
);


const stateReducer = (currentState, action) => {
  const { money, workers } = currentState;
  const { payload } = action;
  switch (action.type) {
    case "IncrementMoney":
      return {
        ...currentState,
        money: payload + money + calculateMps(workers),
      };

    case "DecrementMoney":
      return {
        ...currentState,
        money: money - payload,
      };

    case "HireWorker":
      if (money >= defaultWorkers[payload].cost) {
        return {
          ...currentState,
          workers: {
            ...workers,
            [payload]: workers[payload] + 1,
          },
          money: money - defaultWorkers[payload].cost,
        };
      }
      console.log(`Not enough funds: ${money} vs ${defaultWorkers[payload].cost}`);
      return currentState;
    default:
      return currentState;
  }
};

const App = () => {
  const [tick, setTick] = useState(0);
  const [toggle, setToggle] = useState(true);

  const [state, dispatch] = useReducer(stateReducer, defaultState);

  const { money, workers: { farmer, miner } } = state;

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (toggle) {
      const timer = setTimeout(() => {
        setTick((prevTick) => prevTick + 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [tick, toggle]);

  useEffect(() => {
    if (toggle) {
      dispatch({ type: "IncrementMoney", payload: 1 });
    }
  }, [tick, toggle]);

  return (
    <div>
      <div className="counterDisplay">{`${money}`}</div>
      <CustomButton
        text="Increment"
        onClick={() => dispatch({ type: "IncrementMoney", payload: 1 })}
      />
      <CustomButton
        text="Decrement"
        onClick={() => dispatch({ type: "DecrementMoney", payload: 1 })}
      />
      <CustomButton
        text={`Hire Farmer (${farmer})`}
        onClick={() => dispatch({ type: "HireWorker", payload: "farmer" })}
      />
      <CustomButton
        text={`Hire Miner (${miner})`}
        onClick={() => dispatch({ type: "HireWorker", payload: "miner" })}
      />
      <CustomButton
        text={`Toggle (${toggle})`}
        onClick={handleToggle}
      />
    </div>
  );
};

const CustomButton = ({ text, onClick }) => (
  <button className="btn" type="button" onClick={onClick}>{text}</button>
);

export default App;
