import FavCard from "../FavCard/FavCard";
import "./FavSideBar.css";

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
          <FavCard key={fav.id} data={fav} onClick={() => onRemove(fav.id)} />
        ))
      ) : (
        <p>No Favorites yet</p>
      )}
    </div>
  );
}
