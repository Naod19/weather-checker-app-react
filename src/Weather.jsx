import { useState } from "react";
//Hooks
import { useWeather } from "./hooks/useWeather";
import { useFavorites } from "./hooks/useFavorites";

//Utils
import { getBackgroundClass } from "./utils/getBackgroundClass";

//Components
import Notification from "./components/UI/Notification/Notification";
import LoadingSpinner from "./components/UI/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "./components/UI/ErrorMessage/ErrorMessage";

import "./Weather.css";

function WeatherApp() {
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");
  const { weather, loading, error } = useWeather(city);
  const [favorites, setFavorites] = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const [notification, setNotification] = useState(null);

  //timer notification

  // city search function
  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setCity(inputValue);
    }
  };

  //temp rounded
  const temperature = weather && Math.round(weather.main.temp);
  const feelLike = weather && Math.round(weather.main.feels_like);
  // adding favorites function
  const handleFav = () => {
    if (!weather) return;
    const weatherInfo = {
      id: weather.id,
      name: weather.name,
      temp: temperature,
      feelsLike: feelLike,
      desc: weather.weather[0].description,
    };

    const isDuplicate = favorites.some((fav) => fav.id === weather.id);

    if (isDuplicate) {
      setNotification("City already in favorites");
      return;
    }

    setFavorites((prev) => [...prev, weatherInfo]);
    setNotification("City added ✅");
  };

  const removeFav = (id) => {
    const cityToRemove = favorites.find((city) => city.id === id);
    if (cityToRemove) {
      setNotification(`Removed ${cityToRemove.name} from favorites`);
    }
    setFavorites(favorites.filter((city) => city.id !== id));
  };

  //background changer
  const bgColor = getBackgroundClass(weather, temperature);

  //JSX
  return (
    <div className={`app-container ${bgColor}`}>
      <h1>Weather Checker</h1>
      {notification && (
        <Notification
          message={notification}
          onDismiss={() => setNotification(null)}
        />
      )}
      <form onSubmit={handleSearch} className="form-input">
        <input
          value={inputValue}
          placeholder="Search City"
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="fav-btn"
        >
          Favorites
        </button>
      </form>

      <div className="result-area">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {!loading && !error && weather && (
          <div>
            <h2>City: {weather.name}</h2>
            <h3>Temp: {temperature}ºC</h3>
            <h3>Feels Like: {feelLike}</h3>
            <h3>Weather: {weather.weather[0].description}</h3>
            <button onClick={handleFav} className="add-fav-btn">
              Add To Favorites
            </button>
          </div>
        )}
        <div className={`fav-sidebar ${showFavorites ? "open" : ""}`}>
          <p className="x-button" onClick={() => setShowFavorites(false)}>
            &times;
          </p>
          <h3>My Favorites</h3>
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <div key={fav.id} className="fav-item">
                <h4>City: {fav.name}</h4>
                <h4>Temp: {fav.temp}ºC</h4>
                <h4>Feels Like: {fav.feelsLike}</h4>
                <h4>Weather: {fav.desc}</h4>
                <button
                  onClick={() => removeFav(fav.id)}
                  className="remove-fav-btn"
                >
                  remove
                </button>
              </div>
            ))
          ) : (
            <p>No Favorites yet</p>
          )}
        </div>

        {!city && !loading && <p>Please enter a city</p>}
      </div>
    </div>
  );
}

export default WeatherApp;
