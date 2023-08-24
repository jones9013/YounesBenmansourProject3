import React, { useEffect, useState } from "react";
import axios from "axios";

import sunny from "./assets/images/sunny.png";
import clouds from "./assets/images/clouds.png";
import thunder from "./assets/images/thunder.png";
import clear from "./assets/images/clear-sky.png";
import rain from "./assets/images/rainfall.png";
import windy from "./assets/images/windy.png";
import snow from "./assets/images/snowy.png";
import windIcon from "./assets/images/wind.png";
import humidityIcon from "./assets/images/humidity.png";
import rainBg from "./assets/images/rain-bg.jpeg";
import clearBg from "./assets/images/clear-bg.jpg";
import snowBg from "./assets/images/snow-bg.jpg";
import sunnyBg from "./assets/images/sunny-bg.jpg";
import thunderBg from "./assets/images/thunder-bg.jpg";
import windyBg from "./assets/images/windy-bg.jpg";
import cloudBg from "./assets/images/cloud-bg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Home-css.css";
function Home() {
  const [data, setData] = useState({});
  const [cityName, setCityName] = useState("Toronto");
  const [error, setError] = useState("");

  useEffect(() => {
    handlClick();
  }, []);

  const handlClick = () => {
    if (cityName !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9be6ef8235949b17a36522f359a10979&units=metric`;
      axios
        .get(apiUrl)
        .then((res) => {
          let imagePath = "";
          let bgImagePath = "";
          if (res.data.weather[0].main == "Sunny") {
            imagePath = sunny;
            bgImagePath = sunnyBg;
          } else if (res.data.weather[0].main == "Clear") {
            imagePath = clear;
            bgImagePath = clearBg;
          } else if (res.data.weather[0].main == "Clouds") {
            imagePath = clouds;
            bgImagePath = cloudBg;
          } else if (res.data.weather[0].main == "Rain") {
            imagePath = rain;
            bgImagePath = rainBg;
          } else if (res.data.weather[0].main == "Snow") {
            imagePath = snow;
            bgImagePath = snowBg;
          } else if (res.data.weather[0].main == "Windy") {
            imagePath = windy;
            bgImagePath = windyBg;
          } else if (res.data.weather[0].main == "Thunderstorm") {
            imagePath = thunder;
            bgImagePath = thunderBg;
          }
          console.log(res.data);
          setData({
            ...data,
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            tempMax: res.data.main.temp_max,
            tempMin: res.data.main.temp_min,
            images: imagePath,
            bgImages: bgImagePath,
          });
          setError("");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("city not found");
          } else {
            setError("");
          }

          console.log(err);
        });
    }
  };
  return (
    <div className="container" style={{ background: `url(${data.bgImages})` }}>
      <h1>weather app</h1>
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter the city name"
            onChange={(e) => setCityName(e.target.value)}
          />
          <button onClick={handlClick}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <div className="error">
            <p>{error}</p>
          </div>
        </div>
        <div className="weather-info">
          <div className="city-temp">
            <img className="city-temp-icon" src={data.images} alt="" />
            <h1>{Math.round(data.celcius)}°C</h1>
            <h2>{data.name}</h2>
          </div>
          <div className="details">
            <div className="col">
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="wind" />
              <p>{Math.round(data.speed)}Km/h</p>
              <p>Wind</p>
            </div>
            <div className="col">
              <p>Min: {Math.round(data.tempMin)}°C</p>
              <p>Max: {Math.round(data.tempMax)}°C;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
