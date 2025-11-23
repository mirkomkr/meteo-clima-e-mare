// utils/directions.js
export function degreesToCardinal(deg) {
  if (deg == null || isNaN(deg)) return "-";
  const directions = [
    "N", "NNE", "NE", "ENE",
    "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW",
    "W", "WNW", "NW", "NNW"
  ];
  const index = Math.round((deg % 360) / 22.5) % 16;
  return directions[index];
}
