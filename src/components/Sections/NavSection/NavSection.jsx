import { useState } from "react";

import { useCitySearch } from "../../../hooks/useCitySearch";

// Components
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import SearchBar from "../../UI/SearchBar/SearchBar";
import Button from "../../UI/Button/Button";

// Icons
import SearchIcon from "../../../assets/ui-icons/Search-icon.svg?react";
import { MapPin } from "lucide-react";

//CSS
import "./NavSection.css";

export default function NavSection({
  selectedCity,
  onCitySelect,
  showFavorites,
  setShowFavorites,
}) {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { coordinates, loading } = useCitySearch(search);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  const searchToggle = () => {
    setSearchOpen((prev) => !prev);
  };
  const handleSelect = (city) => {
    onCitySelect(city);
    searchToggle();
  };

  const favoriteToggle = () => {
    setShowFavorites((prev) => !prev);
  };

  const cityLabel = (city) => (
    <>
      {city.name}, {city.state && `${city.state}, `}
      <span className="country-span">{city.country}</span>
    </>
  );
  return (
    <div className="nav-section">
      <nav className="nav-container">
        <Button onClick={searchToggle}>
          <SearchIcon className="search-icon" />
        </Button>
        <div className="city-name">
          <p>{selectedCity ? cityLabel(selectedCity) : "city, county"}</p>
          <MapPin className="location-icon" />
        </div>
        <button
          className={`hamburger-menu ${showFavorites ? "isActive" : ""}`}
          onClick={favoriteToggle}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </nav>
      {searchOpen && (
        <div className="searchbar-section" onClick={searchToggle}>
          <div className="searchbar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="searchbar">
              <SearchBar
                value={search}
                onInput={(e) => handleChange(e)}
                placeholder="Search City"
                className="searchbar-input"
              />
              {loading && <LoadingSpinner />}
            </div>
            <div
              className={`searched-results ${search !== "" ? "results-open" : ""}`}
            >
              {search !== "" && (
                <ul className="results-container">
                  {coordinates.length > 0 ? (
                    coordinates.map((city) => (
                      <li
                        className="result-items"
                        key={`${city.lat} - ${city.lon}`}
                        onClick={() => handleSelect(city)}
                      >
                        {cityLabel(city)}
                      </li>
                    ))
                  ) : (
                    <p>
                      City not found. Please check the spelling and try again.
                    </p>
                  )}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
