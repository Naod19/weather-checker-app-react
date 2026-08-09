import MainWeatherCard from "./MainWeatherCard/MainWeatherCard";
import WeatherDetailsGrid from "./WeatherDetailsGrid/WeatherDetailsGrid";
import ForecastDisplay from "./ForecastDisplay/ForecastDisplay";

import "./WeatherDisplay.css";

export default function WeatherDisplay() {
  return (
    <section className="weather-display-container">
      <MainWeatherCard />
      <WeatherDetailsGrid />
      <ForecastDisplay />
    </section>
  );
}
