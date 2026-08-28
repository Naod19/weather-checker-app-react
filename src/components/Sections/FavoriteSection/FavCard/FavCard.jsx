import { Trash2Icon } from "lucide-react";
import "./FavCard.css";

export default function FavCard({
  data,
  onFavoriteClick,
  onDelete,
  onCardClick,
}) {
  return (
    <div
      className="fav-card"
      onClick={() => {
        onFavoriteClick((prev) => ({
          ...prev,
          name: data.name,
          state: data.state,
          country: data.country,
          lat: data.lat,
          lon: data.lon,
        }));
        onCardClick(false);
      }}
    >
      <div className="left-section">
        <h3 className="fav-temp">{data.temp}°</h3>
        <div className="name-section">
          <h4 className="fav-city">{data.name}</h4>
          <div className="state-country-section">
            <span className="fav-state">{data.state},</span>
            <span className="fav-country">{data.country}</span>
          </div>
        </div>
      </div>
      <div className="right-section">
        <div className="fav-delete-container">
          <Trash2Icon
            className="fav-delete-btn"
            onClick={(e) => {
              onDelete();
              e.stopPropagation();
            }}
            size={24}
          />
        </div>
      </div>
    </div>
  );
}
