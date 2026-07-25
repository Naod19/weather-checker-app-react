import Button from "../UI/Button/Button";

export default function WeatherDisplay({
  weather,
  temperature,
  feelLike,
  onAddFavorite,
}) {
  if (!weather) return null;
  return (
    <div>
      <h2>City: {weather.name}</h2>
      <h3>Temp: {temperature}ºC</h3>
      <h3>Feels Like: {feelLike}</h3>
      <h3>Weather: {weather.weather[0].description}</h3>
      <Button onClick={onAddFavorite} className="add-fav-btn">
        Add To Favorites
      </Button>
    </div>
  );
}
