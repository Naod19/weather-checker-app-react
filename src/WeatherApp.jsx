import { useState } from "react";
//Hooks
import { useWeather } from "./hooks/useWeather";
import { useFavorites } from "./hooks/useFavorites";

//Utils
import { getBackgroundClass } from "./utils/getBackgroundClass";

//Components
import Notification from "./components/UI/Notification/Notification";
import WeatherDisplay from "./components/Sections/WeatherDisplaySection/WeatherDisplay";
import FavSideBar from "./components/Sections/FavoriteSection/FavSideBar/FavSideBar";
import NavSection from "./components/Sections/NavSection/NavSection";

import "./Weather.css";
import "./global.css";

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
      {notification && (
        <Notification
          message={notification}
          onDismiss={() => setNotification(null)}
        />
      )}
      <NavSection
        value={inputValue}
        onInput={(e) => setInputValue(e.target.value)}
        onSubmit={handleSearch}
        loading={loading}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />

      <WeatherDisplay />
      <FavSideBar
        favorites={favorites}
        showFavorites={showFavorites}
        onClose={() => setShowFavorites(false)}
        onRemove={removeFav}
      />
    </div>
  );
}

export default WeatherApp;
