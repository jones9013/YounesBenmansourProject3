import { useEffect, useState } from "react";
import "./App.css";
import WeatherTest from "./ApiTest";
import axios from "axios";

function App() {
  const apiKey = "9be6ef8235949b17a36522f359a10979"; // Replace with your OpenWeatherMap API key

  const [cityName, setCityName] = useState("");
  const [geocodingData, setGeocodingData] = useState(null);

  const searchButton = () => {
    const geocodingApiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
    axios
      .get(geocodingApiUrl)
      .then((response) => {
        setGeocodingData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching geocoding data:", error);
      });
  };

  useEffect(() => {
    // Fetch geocoding data when cityName changes
    if (cityName) {
      searchButton();
    }
  }, [cityName]);

  return (
    <div className="weatherApp">
      <WeatherTest />
      {/* Header */}
      <h1>Weather App</h1>
      {/* Search box */}
      <div>
        <input
          type="text"
          placeholder="Search for the city"
          onChange={(e) => setCityName(e.target.value)}
        />
        <button onClick={searchButton}>Search</button>
      </div>

      {/* Display geocoding data */}
      {geocodingData && (
        <div>
          <p>Name: {geocodingData[0]?.name}</p>
          <p>Latitude: {geocodingData[0]?.lat}</p>
          <p>Longitude: {geocodingData[0]?.lon}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
}

export default App;
