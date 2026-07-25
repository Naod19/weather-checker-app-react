export function getBackgroundClass(weather, temperature) {
  if (!weather) return "default-bg";
  if (temperature <= 15) return "bg-cold";
  if (temperature > 15 && temperature <= 28) return "bg-moderate";
  if (temperature > 28) return "bg-hot";
}
