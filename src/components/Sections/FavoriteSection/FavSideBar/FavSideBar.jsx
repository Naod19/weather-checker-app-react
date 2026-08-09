import SearchBar from "../../../UI/SearchBar/SearchBar";
import FavCard from "../FavCard/FavCard";
import "./FavSideBar.css";

const favorites = [
  {
    temp: 25,
    city: "Kampala",
    weatherDesc: "Mostly Clear",
    high: 28,
    low: 21,
  },
  {
    temp: 21,
    city: "Frankfurt",
    weatherDesc: "Cloudy",
    high: 24,
    low: 12,
  },
  {
    temp: 23,
    city: "Asmara",
    weatherDesc: "Clear",
    high: 26,
    low: 19,
  },
];

export default function FavSideBar({ showFavorites, onRemove }) {
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
