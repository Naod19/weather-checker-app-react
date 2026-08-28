import { useState } from "react";
//Hook
import { useWeather } from "./hooks/useWeather";
import { useFavorites } from "./hooks/useFavorites";

//Components
import Notification from "./components/UI/Notification/Notification";
import WeatherDisplay from "./components/Sections/WeatherDisplaySection/WeatherDisplay";
import FavSideBar from "./components/Sections/FavoriteSection/FavSideBar/FavSideBar";
import NavSection from "./components/Sections/NavSection/NavSection";

import "./Weather.css";
import "./global.css";
import { getLocationName } from "./hooks/useLocationName";

function WeatherApp() {
  const [location, setLocation] = useState(null);
  const { weather, loading, error } = useWeather(location);
  const [favorites, setFavorites] = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const [notification, setNotification] = useState(null);

  console.log(location);

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const location = await getLocationName(latitude, longitude);

        setLocation({
          name: location.name,
          country: location.country,
          state: location.state,
          lat: latitude,
          lon: longitude,
        });
      },
      (error) => {
        console.log("Geolocation error");
        console.log("Code:", error.code);
        console.log("Message:", error.message);
      },
    );
  };

  // Adding favorites

  const handleRounding = (temp) => weather && Math.round(temp - 273.15);

  const handleFavorites = (id) => {
    const isFavorite = favorites.some((city) => city.id === id);

    const existingCity = favorites.find((city) => city.id === id);
    if (isFavorite) {
      setNotification(`${existingCity.name} is already added to favorites`);
      return;
    }

    setFavorites((prevFav) => [
      ...prevFav,
      {
        id: weather?.id,
        name: location?.name,
        state: location?.state,
        country: location?.country,
        temp: handleRounding(weather?.main?.temp),
        lat: weather?.coord?.lat,
        lon: weather?.coord?.lon,
      },
    ]);
    setNotification(`${location.name} added to favorites`);
  };

  // delete favorites
  const handleRemoveFav = (id) => {
    const existingCity = favorites.find((city) => city.id === id);
    setFavorites((prevFav) => {
      return prevFav.filter((fav) => fav.id !== id);
    });
    setNotification(`${existingCity.name} removed from favorites`);
  };

  //JSX
  return (
    <div className={`app-container`}>
      {notification && (
        <Notification
          message={notification}
          onDismiss={() => setNotification(null)}
        />
      )}
      <NavSection
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        selectedCity={location}
        onCitySelect={setLocation}
        onHandleLocation={handleLocation}
      />

      <WeatherDisplay
        weather={weather}
        selectedCity={location}
        onHandleLocation={handleLocation}
        addFavorites={handleFavorites}
        loading={loading}
        error={error}
      />
      <FavSideBar
        favorites={favorites}
        showFavorites={showFavorites}
        handleFavoriteToggle={setShowFavorites}
        onFavoriteClick={setLocation}
        onRemove={handleRemoveFav}
      />
    </div>
  );
}

export default WeatherApp;
