export default function fetchMarine(lat, lon) {
  if (!lat || !lon) throw new Error("Coordinate non valide per apiMarine");

  return `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,wave_direction,wave_period,wind_wave_height,wind_wave_direction,wind_wave_period,swell_wave_height,swell_wave_direction,swell_wave_period,sea_surface_temperature,sea_level_height_msl,swell_wave_peak_period,wind_wave_peak_period&timezone=auto&wind_speed_unit=kn`;
}
