// APITest.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherTest() {
  // State variables
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "9be6ef8235949b17a36522f359a10979";
  const tempUnit = "metric";
  const city = "Toronto";

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  return (
    <div>
      <h2>Weather Test</h2>
      {weatherData && (
        <div>
          <h3>Weather Data for {city}:</h3>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default WeatherTest;
