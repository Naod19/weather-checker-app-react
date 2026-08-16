import WeatherDetailsCard from "./WeatherDetailsCard";
import "./WeatherDetailsGrid.css";

export default function WeatherDetailsGrid({ data }) {
  return (
    <div className="details-grid">
      <WeatherDetailsCard
        title="Real Feel"
        value={data?.feelsLike}
        symbol="°"
        symbolType="degree"
      />
      <WeatherDetailsCard
        title="Humidity"
        value={data?.humidity}
        symbol="%"
        symbolType="percentage"
      />
      <WeatherDetailsCard
        title="Pressure"
        value={data?.pressure}
        symbol="mmHG"
        symbolType="pressure"
        secondaryCardValue="pressure-card"
      />
      <WeatherDetailsCard
        title="Wind"
        value={data?.wind}
        symbol="m/s"
        symbolType="speed"
        secondaryCardValue="wind-card"
      />
    </div>
  );
}
