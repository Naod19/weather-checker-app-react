import { Trash2Icon } from "lucide-react";
import "./FavCard.css";

export default function FavCard({ data, onDelete }) {
  return (
    <div className="fav-card">
      <div className="left-section">
        <h3 className="fav-temp">{data.temp}°</h3>
        <h4 className="fav-city">{data.city}</h4>
      </div>
      <div className="right-section">
        <div className="fav-delete-container">
          <Trash2Icon className="fav-delete-btn" onClick={onDelete} size={24} />
        </div>
        <p className="fav-description">{data.weatherDesc}</p>
        <div className="fav-high-low">
          <span className="fav-high">High: {data.high}°</span>
          <span className="fav-low">Low: {data.low}°</span>
        </div>
      </div>
    </div>
  );
}
