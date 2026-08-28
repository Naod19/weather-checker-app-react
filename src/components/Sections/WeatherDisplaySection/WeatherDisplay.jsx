import { getWeatherIcon } from "../../../utils/getWeatherIcon";

import MainWeatherCard from "./MainWeatherCard/MainWeatherCard";
import WeatherDetailsGrid from "./WeatherDetailsGrid/WeatherDetailsGrid";
import ForecastDisplay from "./ForecastDisplay/ForecastDisplay";

import "./WeatherDisplay.css";

export default function WeatherDisplay({
  weather,
  selectedCity,
  onHandleLocation,
  addFavorites,
  loading,
}) {
  const iconSrc =
    weather &&
    getWeatherIcon(weather?.weather[0]?.id, weather?.weather[0]?.icon);

  const handleRounding = (temp) => weather && Math.round(temp - 273.15);
  // temp rounded
  const temperature = handleRounding(weather?.main?.temp);
  const feelLike = handleRounding(weather?.main?.feels_like);

  const windRounded = Math.round(weather?.wind?.speed);

  const weatherData = weather
    ? {
        id: weather?.id,
        main: weather?.weather[0]?.main,
        description: weather?.weather[0]?.description,
        icon: iconSrc,
        temp: temperature,
        feelsLike: feelLike,
        pressure: weather.main?.pressure,
        humidity: weather.main?.humidity,
        wind: windRounded,
      }
    : null;

  return (
    <section className="weather-display-container">
      <MainWeatherCard
        data={weatherData}
        onRequestLocation={onHandleLocation}
        loading={loading}
        onAddFavorites={addFavorites}
      />
      <WeatherDetailsGrid data={weatherData} />
      <ForecastDisplay selectedCity={selectedCity} />
    </section>
  );
}
