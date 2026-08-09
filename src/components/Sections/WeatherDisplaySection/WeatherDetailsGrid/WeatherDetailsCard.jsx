export default function WeatherDetailsCard({
  title,
  value,
  symbol,
  symbolType,
  secondaryCardValue,
}) {
  return (
    <div className="details-card">
      <h4 className="card-title">{title}</h4>
      <span className={`card-value ${secondaryCardValue}`}>
        <h2>{value}</h2>
        <span className={`card-symbol ${symbolType}`}>{symbol}</span>
      </span>
    </div>
  );
}
