import { useEffect, useState } from "react";
import "./Weather.css";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

function WeatherApp() {
  const [inputValue, setInputValue] = useState("");
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  //localstorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  //Api fetch
  useEffect(() => {
    if (!city) return;

    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error("City not found");
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    return () => controller.abort();
  }, [city]);

  //timer notification
  useEffect(() => {
    let timer;
    if (notification) {
      timer = setTimeout(() => {
        setNotification(null);
      }, 2500);
    }
    return () => clearTimeout(timer);
  }, [notification]);

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
  const backgroundClass = () => {
    if (!weather) return "default-bg";

    if (temperature <= 15) return "bg-cold";
    if (temperature > 15 && temperature <= 28) return "bg-moderate";
    if (temperature > 28) return "bg-hot";
  };
  //JSX
  return (
    <div className={`app-container ${backgroundClass()}`}>
      <h1>Weather Checker</h1>
      {notification && (
        <div className="notification-banner">{notification}</div>
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
        {loading && <div className="loading-spinner"></div>}
        {error && <p className="error-msg">{error}</p>}
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
