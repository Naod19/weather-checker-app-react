import WeatherDetailsCard from "./WeatherDetailsCard";
import "./WeatherDetailsGrid.css";

export default function WeatherDetailsGrid() {
  return (
    <div className="details-grid">
      <WeatherDetailsCard
        title="Real Feel"
        value={22}
        symbol="°"
        symbolType="degree"
      />
      <WeatherDetailsCard
        title="Humidity"
        value={80}
        symbol="%"
        symbolType="percentage"
      />
      <WeatherDetailsCard
        title="Pressure"
        value={1122}
        symbol="mmHG"
        symbolType="pressure"
        secondaryCardValue="pressure-card"
      />
      <WeatherDetailsCard
        title="Wind"
        value={9}
        symbol="m/s"
        symbolType="speed"
        secondaryCardValue="wind-card"
      />
    </div>
  );
}
