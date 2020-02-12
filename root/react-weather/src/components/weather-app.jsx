/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
import React, { useState } from "react";
import { api, dateBuilder } from "../utils/constants";
import "./weather-app.css";

const WeatherApp = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const heatClass = () => {
    if (typeof weather.main !== "undefined") {
      return ((weather.main.temp > 16) ? "warm" : "cold");
    }
    return "cold";
  };

  return (
    <div className={`weather-app ${heatClass()}`}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{`${weather.name}, ${weather.sys.country}`}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {`${Math.round(weather.main.temp)}°c`}
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ("")}
      </main>
    </div>
  );
};

export default WeatherApp;
