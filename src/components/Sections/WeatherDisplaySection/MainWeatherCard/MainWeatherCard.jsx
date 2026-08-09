import { ArrowDown, ArrowUp, Bookmark } from "lucide-react";
import SunnyIcon from "../../../../assets/weather-icons/Sunny/Sunny-c.svg?react";

import "./MainWeatherCard.css";
export default function MainWeatherCard() {
  return (
    <div className="main-weather-card">
      <Bookmark className="bookmark-icon" size={31} />
      <h4 className="weather-description-text">Mostly Sunny</h4>
      <h1 className="weather-description-number">
        <span>23°</span>
        <SunnyIcon className="weather-icon" />
      </h1>
      <div className="high-low-container">
        <div className="high-temp">
          <span className="temp-icon">
            <ArrowUp className="arrow-icon" />
          </span>
          <p className="temp-text">H:</p>
          <p className="temp-number">30°</p>
        </div>
        <div className="low-temp">
          <span className="temp-icon">
            <ArrowDown className="arrow-icon" />
          </span>
          <p className="temp-text">L:</p>
          <p className="temp-number">10°</p>
        </div>
      </div>
    </div>
  );
}
