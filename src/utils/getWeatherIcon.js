// Clear and Cloudy
import Sunny from "../assets/weather-icons/Sunny/Sunny-c.svg?react";
import ClearNight from "../assets/weather-icons/Clear-night/Clear-night-c.svg?react";
import PartlyCloudy from "../assets/weather-icons/Partly-cloudy/Partly-cloudy-c.svg?react";
import CCAtTimes from "../assets/weather-icons/C-C-at-times/C-C-at-times-c.svg?react";
import CCAtTimesNight from "../assets/weather-icons/C-C-at-times-night/C-C-at-times-night-c.svg?react";
import Cloudy from "../assets/weather-icons/Cloudy/Cloudy-c.svg?react";
import CloudyNight from "../assets/weather-icons/Cloudy-night/Cloudy-night-c.svg?react";

// Drizzle & Rain
import Drizzle from "../assets/weather-icons/Drizzle/Drizzle-c.svg?react";
import DrizzleSun from "../assets/weather-icons/Drizzle-sun/Drizzle-sun-c.svg?react";
import DrizzleNight from "../assets/weather-icons/Drizzle-night/Drizzle-night-c.svg?react";
import Rain from "../assets/weather-icons/Rain/Rain-c.svg?react";
import RainSun from "../assets/weather-icons/Rain-sun/Rain-sun-c.svg?react";
import RainNight from "../assets/weather-icons/Rain-night/Rain-night-c.svg?react";
import HeavyRain from "../assets/weather-icons/Heavy-rain/Heavy-rain-c.svg?react";
import ScatteredShowers from "../assets/weather-icons/Scattered-showers/Scattered-showers-c.svg?react";
import ScatteredShowersNight from "../assets/weather-icons/Scattered-showers-night/Scattered-showers-night-c.svg?react";

// Thunderstorms
import ScatteredThunderstorm from "../assets/weather-icons/Scattered-thunderstorm/Scattered-thunderstorm-c.svg?react?react";
import RainAndThunderstorm from "../assets/weather-icons/Rain-and-thunderstorm/Rain-and-thunderstorm-c.svg?react?react";
import SevereThunderstorm from "../assets/weather-icons/Severe-thunderstorm/Severe-thunderstorm-c.svg?react?react";

// Snow & Ice
import Snow from "../assets/weather-icons/Snow/Snow-c.svg?react";
import BlowingSnow from "../assets/weather-icons/Blowing-snow/Blowing-snow-c.svg?react";
import Blizzard from "../assets/weather-icons/Blizzard/Blizzard-c.svg?react";
import Sleet from "../assets/weather-icons/Sleet/Sleet-c.svg?react";
import Hail from "../assets/weather-icons/Hail/Hail-c.svg?react";

// Atmosphere
import Fog from "../assets/weather-icons/Fog/Fog-c.svg?react";

const WEATHER_ICON_MAP = {
  // --- Group 2xx: Thunderstorm ---
  200: ScatteredThunderstorm,
  201: RainAndThunderstorm,
  202: SevereThunderstorm,
  210: ScatteredThunderstorm,
  211: SevereThunderstorm,
  212: SevereThunderstorm,
  221: SevereThunderstorm,
  230: ScatteredThunderstorm,
  231: RainAndThunderstorm,
  232: RainAndThunderstorm,

  // --- Group 3xx: Drizzle ---
  300: Drizzle,
  301: Drizzle,
  302: Drizzle,
  310: { day: DrizzleSun, night: DrizzleNight },
  311: { day: DrizzleSun, night: DrizzleNight },
  312: Drizzle,
  313: { day: ScatteredShowers, night: ScatteredShowersNight },
  314: Drizzle,
  321: { day: DrizzleSun, night: DrizzleNight },

  // --- Group 5xx: Rain ---
  500: Rain,
  501: Rain,
  502: HeavyRain,
  503: HeavyRain,
  504: HeavyRain,
  511: Sleet, // Freezing Rain
  520: { day: RainSun, night: RainNight },
  521: { day: ScatteredShowers, night: ScatteredShowersNight },
  522: HeavyRain,
  531: HeavyRain,

  // --- Group 6xx: Snow & Ice ---
  600: Snow,
  601: Snow,
  602: Blizzard,
  611: Sleet,
  612: Sleet,
  613: Sleet,
  615: Hail, // Rain and snow
  616: Hail,
  620: BlowingSnow,
  621: BlowingSnow,
  622: Blizzard,

  // --- Group 7xx: Atmosphere (Fog, Haze, Mist, Tornado) ---
  701: Fog,
  711: Fog,
  721: Fog,
  731: Fog,
  741: Fog,
  751: Fog,
  761: Fog,
  762: Fog,
  771: Fog,
  781: Fog,

  // --- Group 800: Clear ---
  800: { day: Sunny, night: ClearNight },

  // --- Group 80x: Clouds ---
  801: PartlyCloudy,
  802: { day: CCAtTimes, night: CCAtTimesNight },
  803: { day: Cloudy, night: CloudyNight },
  804: { day: Cloudy, night: CloudyNight },
};

/**
 *
 * @param {number} id - openweather condition id
 * @param {string} iconCode - openweather icon code
 * @returns {string} svg paths
 */

export function getWeatherIcon(id, iconCode = "") {
  const isNight = iconCode.endsWith("n");
  const iconEntry = WEATHER_ICON_MAP[id];

  if (!iconEntry) return Sunny;

  if (typeof iconEntry === "object") {
    return isNight ? iconEntry.night : iconEntry.day;
  }

  return iconEntry;
}
