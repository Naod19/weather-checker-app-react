export default function ForecastCard({ icon, day, high, low }) {
  return (
    <div className="forecast-card">
      <div className="forecast-icon">{icon}</div>
      <div className="forecast-day">
        <span>{day}</span>
      </div>
      <div className="high-low">
        <span>{high}</span>
        <span>{low}</span>
      </div>
    </div>
  );
}
