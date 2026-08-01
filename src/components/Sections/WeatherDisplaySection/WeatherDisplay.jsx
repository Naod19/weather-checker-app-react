import Button from "../../UI/Button/Button";
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../UI/ErrorMessage/ErrorMessage";
import "./WeatherDisplay.css";
import "./../../../global.css";

export default function WeatherDisplay({
  weather,
  temperature,
  feelLike,
  onAddFavorite,
  loading,
  error,
}) {
  return (
    <div className="weather-container">
      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && weather && (
        <div>
          <h2>City: {weather.name}</h2>
          <h3>Temp: {temperature}ºC</h3>
          <h3>Feels Like: {feelLike}</h3>
          <h3>Weather: {weather.weather[0].description}</h3>
          <Button onClick={onAddFavorite} className="add-fav-btn">
            Add To Favorites
          </Button>
        </div>
      )}
      {!weather && !loading && !error && <p>Please enter a city</p>}
    </div>
  );
}
