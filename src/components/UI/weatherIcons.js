import {
  // icone giorno
  WiDaySunny,
  WiDaySunnyOvercast,
  WiDayCloudy,
  WiDayRain,
  WiDayRainMix,
  WiDayRainWind,
  WiDayStormShowers,
  WiDaySleet,
  WiDaySleetStorm,
  WiDaySnow,
  WiDaySnowWind,
  WiDayThunderstorm,
  WiDayShowers,
  // icone notte (alt)
  WiNightClear,
  WiNightAltPartlyCloudy,
  WiNightAltCloudy,
  WiNightAltRain,
  WiNightAltRainMix,
  WiNightAltRainWind,
  WiNightAltStormShowers,
  WiNightAltSleet,
  WiNightAltSleetStorm,
  WiNightAltSnow,
  WiNightAltSnowWind,
  WiNightAltThunderstorm,
  WiNightAltShowers,
  // generiche
  WiFog,
  WiCloudy,
  WiSnow,
} from "react-icons/wi";

/**
 * Mappa completa weather_code -> { day: IconComponent, night: IconComponent }
 * Basata sui weather_code ufficiali Open-Meteo.
 */
export const weatherIcons = {
  0: { day: WiDaySunny, night: WiNightClear },
  1: { day: WiDaySunnyOvercast, night: WiNightAltPartlyCloudy },
  2: { day: WiDayCloudy, night: WiNightAltCloudy },
  3: { day: WiCloudy, night: WiNightAltCloudy },

  45: { day: WiFog, night: WiFog },
  48: { day: WiFog, night: WiFog },

  51: { day: WiDayRainMix, night: WiNightAltRainMix },
  53: { day: WiDayRainMix, night: WiNightAltRainMix },
  55: { day: WiDayRainMix, night: WiNightAltRainMix },

  56: { day: WiDaySleet, night: WiNightAltSleet },
  57: { day: WiDaySleet, night: WiNightAltSleet },

  61: { day: WiDayRain, night: WiNightAltRain },
  63: { day: WiDayRainWind, night: WiNightAltRainWind },
  65: { day: WiDayRainWind, night: WiNightAltRainWind },

  66: { day: WiDaySleet, night: WiNightAltSleet },
  67: { day: WiDaySleet, night: WiNightAltSleet },

  71: { day: WiDaySnow, night: WiNightAltSnow },
  73: { day: WiDaySnowWind, night: WiNightAltSnowWind },
  75: { day: WiDaySnowWind, night: WiNightAltSnowWind },
  77: { day: WiSnow, night: WiSnow },

  80: { day: WiDayShowers, night: WiNightAltShowers },
  81: { day: WiDayStormShowers, night: WiNightAltStormShowers },
  82: { day: WiDayStormShowers, night: WiNightAltStormShowers },

  85: { day: WiDaySnow, night: WiNightAltSnow },
  86: { day: WiDaySnowWind, night: WiNightAltSnowWind },

  95: { day: WiDayThunderstorm, night: WiNightAltThunderstorm },
  96: { day: WiDaySleetStorm, night: WiNightAltSleetStorm },
  99: { day: WiDaySleetStorm, night: WiNightAltSleetStorm },
};

/**
 * Restituisce il componente icona React corrispondente al weather code.
 *
 * @param {number} code - weather_code di Open-Meteo
 * @param {boolean} isDay - true se è giorno (Open-Meteo: is_day === 1), false notte
 * @returns {ReactElement} componente icona pronto da renderizzare
 */
export function getWeatherIcon(code, isDay = true) {
  const entry = weatherIcons[code];
  const IconComponent = entry ? (isDay ? entry.day : entry.night) : WiCloudy;
  return IconComponent;
}

/** Descrizioni testuali **/
export const weatherCodeDescriptions = {
  0: "Cielo sereno",
  1: "Prevalentemente sereno",
  2: "Parzialmente nuvoloso",
  3: "Coperto",
  45: "Nebbia",
  48: "Nebbia con brina",
  51: "Pioggerella leggera",
  53: "Pioggerella moderata",
  55: "Pioggerella intensa",
  56: "Pioggerella gelata leggera",
  57: "Pioggerella gelata intensa",
  61: "Pioggia leggera",
  63: "Pioggia moderata",
  65: "Pioggia intensa",
  66: "Pioggia gelata leggera",
  67: "Pioggia gelata intensa",
  71: "Neve leggera",
  73: "Neve moderata",
  75: "Neve intensa",
  77: "Grani di neve",
  80: "Rovesci leggeri",
  81: "Rovesci moderati",
  82: "Rovesci violenti",
  85: "Rovesci di neve leggeri",
  86: "Rovesci di neve intensi",
  95: "Temporale leggero o moderato",
  96: "Temporale con grandine leggera",
  99: "Temporale con grandine intensa",
};

export function weatherCodeToDescription(code) {
  return weatherCodeDescriptions[code] || "Condizione sconosciuta";
}
