import React from "react";
import sunnyImages from "./assets/images/sunny.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Home-css.css";
function Home() {
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
          <h1>22</h1>
          <h2>Toronto</h2>
          <div className="details">
            <div className="col">
              <img src={sunnyImages} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;
