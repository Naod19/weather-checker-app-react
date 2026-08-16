const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

export async function getLocationName(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`,
  );

  if (!response.ok) {
    throw new Error("Unable to determine location name");
  }

  const data = await response.json();

  return data[0];
}
