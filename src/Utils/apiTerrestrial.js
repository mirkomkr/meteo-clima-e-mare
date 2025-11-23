export default function fetchTerrestrial(lat, lon) {
  if (!lat || !lon) throw new Error("Coordinate non valide per apiTerrestrial");

  const currentParams = [
    "temperature_2m",
    "apparent_temperature",
    "relative_humidity_2m",
    "surface_pressure",
    "pressure_msl",
    "visibility",
    "cloud_cover",
    "uv_index",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
    "weather_code",
    "precipitation"
  ].join(',');

  // AGGIUNTA DEI DATI ORARI: Punto di Rugiada e Punto dello Zero
  const hourlyParams = [
    "dew_point_2m",
    "freezing_level_height"
  ].join(',');

  const dailyParams = [
    "sunrise",
    "sunset",
    "temperature_2m_max",
    "temperature_2m_min",
    "precipitation_sum",
    "precipitation_probability_max",
    "snowfall_sum"
  ].join(',');


  return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=auto&current=${currentParams}&hourly=${hourlyParams}&daily=${dailyParams}`;
}