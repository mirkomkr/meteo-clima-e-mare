// utils/directions.js
export function degreesToCardinal(deg) {
  if (deg == null || isNaN(deg)) return "-";
const directions = [
  "N", "NNE", "NE", "ENE",
  "E", "ESE", "SE", "SSE",
  "S", "SSO", "SO", "OSO",
  "O", "ONO", "NO", "NNO"
];
  const index = Math.round((deg % 360) / 22.5) % 16;
  return directions[index];
}
