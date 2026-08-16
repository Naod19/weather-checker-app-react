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

  //JSX
  return (
    <div className={`app-container ${""}`}>
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
        onHandleLocation={handleLocation}
        loading={loading}
        error={error}
      />
      <FavSideBar
        favorites={favorites}
        showFavorites={showFavorites}
        onClose={() => setShowFavorites(false)}
        onRemove={"removeFav"}
      />
    </div>
  );
}

export default WeatherApp;
