export default function fetchTerrestrial(lat, lon) {
  if (!lat || !lon) throw new Error("Coordinate non valide per apiTerrestrial");

  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&current=temperature_2m,apparent_temperature,relative_humidity_2m,surface_pressure,visibility,cloud_cover,uv_index,wind_speed_10m,wind_direction_10m,wind_gusts_10m,weather_code&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,snowfall_sum`;
}
