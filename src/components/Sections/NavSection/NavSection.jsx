import SearchBar from "../../UI/SearchBar/SearchBar";
import Button from "../../UI/Button/Button";

export default function NavSection({
  value,
  onInput,
  onSubmit,
  loading,
  onClick,
}) {
  return (
    <form onSubmit={onSubmit} className="search-bar">
      <SearchBar
        id="main-search-bar"
        value={value}
        onInput={onInput}
        placeholder="Search City"
      />
      <Button type="submit" loading={loading}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
      <Button onClick={onClick} variant="fav-btn">
        Favorites
      </Button>
    </form>
  );
}
