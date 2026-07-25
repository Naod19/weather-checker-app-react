import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import "./Button.css";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={`button-global ${variant}`}
      aria-busy={loading}
    >
      {loading ? <LoadingSpinner className="button-loader" /> : children}
    </button>
  );
}
