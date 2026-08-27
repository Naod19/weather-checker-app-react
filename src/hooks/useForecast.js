import { useState, useEffect } from "react";
import { getWeatherIcon } from "../utils/getWeatherIcon";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export function useForecast(selectedCity) {
  const [forecastWeather, setForecastWeather] = useState(null);

  useEffect(() => {
    if (!selectedCity) return;
    const controller = new AbortController();

    async function fetchForecast() {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${apiKey}`,
          { signal: controller.signal },
        );
        if (!response.ok)
          throw new Error(`Weather API error: ${response.status}`);

        const data = await response.json();
        setForecastWeather(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log("failed to fetch forecast:", error);
        }
      }
    }

    fetchForecast();

    return () => controller.abort();
  }, [selectedCity]);

  const groupedByDay =
    forecastWeather?.list?.reduce((days, entry) => {
      const date = entry?.dt_txt?.split(" ")[0];
      if (!days[date]) days[date] = [];
      days[date].push(entry);
      return days;
    }, {}) ?? {};

  const dailySummary = Object.entries(groupedByDay).map(([date, entries]) => {
    const noonEntry =
      entries.find((e) => e.dt_txt.includes("12:00:00")) || entries[0];
    const temps = entries.map((e) => e.main.temp);
    // Icons
    const iconSrc =
      noonEntry &&
      getWeatherIcon(noonEntry.weather[0].id, noonEntry.weather[0].icon);

    //date converted
    function getDayLabel(dateString) {
      const date = new Date(`${dateString}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isToday = date.toDateString() === today.toDateString();
      if (isToday) return "Today";
      return date.toLocaleDateString("en-Us", { weekday: "short" });
    }

    //temp converted
    const handleRounding = (temp) => temps && Math.round(temp - 273.15);

    const highTemp = handleRounding(Math.max(...temps));
    const lowTemp = handleRounding(Math.min(...temps));

    return {
      date: getDayLabel(date),
      icon: iconSrc,
      high: highTemp,
      low: lowTemp,
    };
  });
  return dailySummary;
}
