import React, { useEffect, useState } from "react";
import axios from "axios";

import sunnyImages from "./assets/images/sunny.png";
import windIcon from "./assets/images/wind.png";
import humidityIcon from "./assets/images/humidity.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Home-css.css";
function Home() {
  const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
    tempMin: 10,
    tempMax: 13,
  });

  useEffect(() => {
    const apiUrl =
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=9be6ef8235949b17a36522f359a10979&units=metric";
    axios
      .get(apiUrl)
      .then((res) => {
        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          tempMax: res.data.main.temp_max,
          tempMin: res.data.main.temp_min,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="container">
      <h1>weather app</h1>
      <div className="weather">
        <div className="search">
          <input type="text" placeholder="Enter the city name" />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="weather-info">
          <div className="city-temp">
            <img className="city-temp-icon" src={sunnyImages} alt="sunny" />
            <h1>{data.celcius}°C</h1>
            <h2>{data.name}</h2>
          </div>
          <div className="details">
            <div className="col">
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p>{data.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="wind" />
              <p>{data.wind}</p>
            </div>
            <div className="col">
              <p>
                Min:{data.tempMin}°C || Max: {data.tempMax}°C;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
