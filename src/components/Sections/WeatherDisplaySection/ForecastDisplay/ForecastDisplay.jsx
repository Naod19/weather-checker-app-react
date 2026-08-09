import ForecastCard from "./ForecastCard";
import "./ForecastDisplay.css";

//Icons
import RainyIcon from "../../../../assets/weather-icons/Heavy-rain/Heavy-rain-c.svg?react";
import WindIcon from "../../../../assets/weather-icons/Wind/Wind-c.svg?react";
import SunnyIcon from "../../../../assets/weather-icons/Sunny/Sunny-c.svg?react";
import ThunderstormIcon from "../../../../assets/weather-icons/Rain-and-thunderstorm/Rain-and-thunderstorm-c.svg?react";

export default function ForecastDisplay() {
  return (
    <div className="forecast-container">
      <span className="forecast-header">5 Days Forecast</span>
      <div className="forecast-card-container">
        <ForecastCard icon={<RainyIcon />} day="Mon" high="34°" low="12°" />
        <ForecastCard icon={<WindIcon />} day="Tue" high="32°" low="10°" />
        <ForecastCard icon={<SunnyIcon />} day="Wed" high="40°" low="27°" />
        <ForecastCard icon={<SunnyIcon />} day="Thu" high="25°" low="15°" />
        <ForecastCard
          icon={<ThunderstormIcon />}
          day="Fri"
          high="32°"
          low="12°"
        />
      </div>
    </div>
  );
}
