import Button from "../../../UI/Button/Button";

export default function FavSideBar({
  showFavorites,
  favorites,
  onClose,
  onRemove,
}) {
  return (
    <div className={`fav-sidebar ${showFavorites ? "open" : ""}`}>
      <p className="x-button" onClick={onClose}>
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
            <Button onClick={() => onRemove(fav.id)} className="remove-fav-btn">
              remove
            </Button>
          </div>
        ))
      ) : (
        <p>No Favorites yet</p>
      )}
    </div>
  );
}
