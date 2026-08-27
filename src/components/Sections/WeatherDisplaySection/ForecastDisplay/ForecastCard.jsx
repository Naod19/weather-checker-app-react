export default function ForecastCard({ data }) {
  const WeatherIcon = data.icon;
  return (
    <div className="forecast-card">
      <div className="forecast-icon">{WeatherIcon && <WeatherIcon />}</div>
      <div className="forecast-day">
        <span>{data.date}</span>
      </div>
      <div className="high-low">
        <span>{data.high}°</span>
        <span>{data.low}°</span>
      </div>
    </div>
  );
}
