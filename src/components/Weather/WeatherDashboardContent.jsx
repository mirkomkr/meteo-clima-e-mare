import React from "react";
import GeneralWeatherCard from "./GeneralWeatherCard";
import TerrestrialWeatherCard from "./TerrestrialWeatherCard";
import MarineWeatherCard from "./MarineWeatherCard";

export default function WeatherDashboardContent({ general, terrestrial, marine }) {
  if (!general && !terrestrial && !marine)
    return (
      <div className="text-center text-gray-500 mt-10">
        Nessun dato meteo disponibile.
      </div>
    );

  // ✅ Controllo se ci sono dati marini reali
const hasMarineData =
  marine &&
  marine.current &&
  // controlla se almeno uno dei valori principali è diverso da null/undefined
  (
    marine.current.wave_height != null ||
    marine.current.wave_direction != null ||
    marine.current.wave_period != null ||
    marine.current.swell_wave_height != null ||
    marine.current.swell_wave_direction != null ||
    marine.current.swell_wave_period != null ||
    marine.current.sea_surface_temperature != null
  );

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 justify-center items-start p-6">
      {general && <GeneralWeatherCard weatherData={general} />}
      {terrestrial && <TerrestrialWeatherCard terrestrialData={terrestrial} />}
      {hasMarineData && (
        <MarineWeatherCard marineData={marine} terrestrialData={terrestrial} />
      )}
    </div>
  );
}
