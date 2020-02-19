/* eslint-disable react/no-array-index-key */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import "./log.css";

const Log = () => (<LogList items={["One", "Two", "Three"]} />);

// const LogList = ({ items }) => {

const timeStamp = (d) => {
  const secs = d.getSeconds().toString().padStart(2, "0");
  const mins = d.getMinutes().toString().padStart(2, "0");
  const hours = d.getHours().toString().padStart(2, "0");

  return `[${hours}:${mins}:${secs}]:`;
};

const LogList = () => {
  const [items, setItems] = useState(
    [
      `${timeStamp(new Date())} Lorem Ipsum is simply dummy text of the printing and typesetting industry. when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      `${timeStamp(new Date())} and more recently with desktop publishing software 
     
      like Aldus PageMaker including versions of Lorem Ipsum.`,
    ],
  );

  const onClick = () => {
    setItems([...items, `${timeStamp(new Date())} Fuck`]);
  };

  return (
    <div>
      <button className="btn" type="button" onClick={onClick}>CLICK ME!</button>
      <div className="log-container">
        <ul className="log-list">
          {items.map((item, index) => <ListItem key={`listItem${index}`} item={item} />)}
        </ul>
      </div>
    </div>
  );
};

const ListItem = ({ item }) => (
  <div className="log-list-item">{item}</div>
);

export default Log;
