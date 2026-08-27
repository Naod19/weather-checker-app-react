import SearchBar from "../../../UI/SearchBar/SearchBar";
import FavCard from "../FavCard/FavCard";
import "./FavSideBar.css";

export default function FavSideBar({ favorites, showFavorites, onRemove }) {
  return (
    <div className={`fav-sidebar ${showFavorites ? "open" : ""}`}>
      <SearchBar className="fav-searchbar" placeholder="Search Favorites" />
      <div className="fav-card-container">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <FavCard key={fav.id} data={fav} onClick={() => onRemove(fav.id)} />
          ))
        ) : (
          <p>No Favorites yet</p>
        )}
      </div>
    </div>
  );
}
