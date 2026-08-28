import { useState } from "react";
import SearchBar from "../../../UI/SearchBar/SearchBar";
import FavCard from "../FavCard/FavCard";
import "./FavSideBar.css";

export default function FavSideBar({
  favorites,
  showFavorites,
  onFavoriteClick,
  onRemove,
  handleFavoriteToggle,
}) {
  const [searchFavorites, setSearchFavorites] = useState("");

  const searchedFavorites = favorites.filter((card) => {
    return card.name.toLowerCase().includes(searchFavorites);
  });

  const hasFavorites = favorites.length > 0;
  const hasSearchResults = searchedFavorites.length > 0;

  return (
    <div className={`fav-sidebar ${showFavorites ? "open" : ""}`}>
      <SearchBar
        className="fav-searchbar"
        placeholder="Search Favorites"
        value={searchFavorites}
        onInput={(e) => setSearchFavorites(e.target.value)}
      />
      <div className="fav-card-container">
        {!hasFavorites ? (
          <p>No favorites yet</p>
        ) : !hasSearchResults ? (
          <p>City not found. Check the spelling and try again.</p>
        ) : (
          searchedFavorites.map((fav) => (
            <FavCard
              key={fav.id}
              data={fav}
              onFavoriteClick={onFavoriteClick}
              onDelete={() => onRemove(fav.id)}
              onCardClick={handleFavoriteToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}
