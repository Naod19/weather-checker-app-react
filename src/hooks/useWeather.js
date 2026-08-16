import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export function useWeather(selectedCity) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedCity) return;
    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${selectedCity.lat}&lon=${selectedCity.lon}&appid=${apiKey}`,
          { signal: controller.signal },
        );
        if (!response.ok)
          throw new Error(
            "Weather data not found. Please try again with a different city.",
          );
        const weatherData = await response.json();
        setWeather(weatherData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setWeather(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    return () => controller.abort();
  }, [selectedCity]);

  return { weather, loading, error };
}
