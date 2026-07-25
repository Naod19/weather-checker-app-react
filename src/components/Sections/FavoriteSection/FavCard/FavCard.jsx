import Button from "../../../UI/Button/Button";
import "./FavCard.css";

export default function FavCard({ data, onClick }) {
  return (
    <div className="fav-card">
      <h4>City: {data.name}</h4>
      <h4>Temp: {data.temp}ºC</h4>
      <h4>Feels Like: {data.feelsLike}</h4>
      <h4>Weather: {data.desc}</h4>
      <Button onClick={onClick} className="remove-fav-btn">
        remove
      </Button>
    </div>
  );
}
