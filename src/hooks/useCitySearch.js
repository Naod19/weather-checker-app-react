import { useState, useEffect } from "react";

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export function useCitySearch(city) {
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;
    const controller = new AbortController();

    const fetchCoordinates = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`,
          { signal: controller.signal },
        );
        if (!response.ok)
          throw new Error(
            "City not found. Please try again with a different city name.",
          );
        const data = await response.json();
        const result = data.map((coord) => ({
          name: coord.name,
          country: coord.country,
          state: coord.state,
          lat: coord.lat,
          lon: coord.lon,
        }));
        setCoordinates(result);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchCoordinates(), 4000);

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [city]);

  return { coordinates, loading, error };
}
