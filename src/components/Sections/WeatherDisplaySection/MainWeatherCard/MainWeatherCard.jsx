import { Bookmark } from "lucide-react";
import "./MainWeatherCard.css";
import Button from "../../../UI/Button/Button";
export default function MainWeatherCard({
  data,
  onRequestLocation,
  onAddFavorites,
  loading,
}) {
  const WeatherIcon = data?.icon;

  return (
    <div className="main-weather-card">
      {data ? (
        <>
          {" "}
          <Bookmark
            className="bookmark-icon"
            size={31}
            onClick={() => onAddFavorites(data.id)}
          />
          <h4 className="weather-description-text">
            {data ? data.description : "Description"}
          </h4>
          <h1 className="weather-description-number">
            <span>{data ? data.temp : "0"}°</span>
            {WeatherIcon && <WeatherIcon className="weather-icon" />}
          </h1>
        </>
      ) : (
        <div className="location-access-container">
          <p className="location-access-text">
            Enable Location Access Get instant weather for where you are, right
            now.
          </p>
          <Button
            variant="secondary"
            onClick={onRequestLocation}
            loading={loading}
          >
            Enable Location
          </Button>
        </div>
      )}
    </div>
  );
}
