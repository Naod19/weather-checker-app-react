import "./SearchBar.css";

export default function SearchBar({
  label,
  id,
  value,
  onInput,
  error,
  placeholder,
  className,
}) {
  return (
    <div className="searchbar-container">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={`search-input ${className}`}
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onInput}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <span id={`${id}-error`} className="input-error">
          {error}
        </span>
      )}
    </div>
  );
}
