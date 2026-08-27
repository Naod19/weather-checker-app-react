import ForecastCard from "./ForecastCard";
import "./ForecastDisplay.css";
import { useForecast } from "../../../../hooks/useForecast";

export default function ForecastDisplay({ selectedCity }) {
  const dailySummary = useForecast(selectedCity);

  //Icons

  return (
    <div className="forecast-container">
      <span className="forecast-header">6-Days Forecast</span>
      <div className="forecast-card-container">
        {dailySummary.map((data) => (
          <>
            <ForecastCard data={data} key={data.date} />
          </>
        ))}
      </div>
    </div>
  );
}
