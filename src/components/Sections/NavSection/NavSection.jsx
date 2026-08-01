import { useState } from "react";

// Components
import LoadingSpinner from "../../UI/LoadingSpinner/LoadingSpinner";
import SearchBar from "../../UI/SearchBar/SearchBar";
import Button from "../../UI/Button/Button";

// Icons
import SearchIcon from "../../../assets/ui-icons/Search-icon.svg?react";
import { MapPin } from "lucide-react";

//CSS
import "./NavSection.css";

const list = [
  "Chile",
  "Japan",
  "Madagascar",
  "Norway",
  "New Zealand",
  "Uruguay",
  "Kazakhstan",
  "Fiji",
  "Iceland",
  "Uganda",
];

export default function NavSection({ setShowFavorites }) {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setSearch(e.target.value);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const searchToggle = () => {
    setSearchOpen((prev) => !prev);
  };

  const favoriteToggle = () => {
    setShowFavorites((prev) => !prev);
  };

  const filteredList = list.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="nav-section">
      <nav className="nav-container">
        <Button onClick={searchToggle}>
          <SearchIcon className="search-icon" />
        </Button>
        <div className="city-name">
          <p>City, Country</p>
          <MapPin className="location-icon" />
        </div>
        <button className="hamburger-menu" onClick={favoriteToggle}>
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
              {isLoading && <LoadingSpinner />}
            </div>
            <div
              className={`searched-results ${search !== "" ? "results-open" : ""}`}
            >
              {search !== "" && (
                <ul className="results-container">
                  {filteredList.length > 0 ? (
                    filteredList.map((item, index) => (
                      <li
                        className="result-items"
                        key={index}
                        onClick={searchToggle}
                      >
                        {item}
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
