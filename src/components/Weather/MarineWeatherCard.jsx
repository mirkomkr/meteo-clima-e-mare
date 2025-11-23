import React from "react";
import { kmhToKnots } from "../../Utils/conversions";
import { degreesToCardinal } from "../../Utils/direction";

export default function MarineWeatherCard({ marineData, terrestrialData }) {
  if (!marineData) return null;

  const current = marineData.current;

  // 🌊 Dati mare
  const waveHeight = current.wave_height ?? "-";
  const waveDir = current.wave_direction ?? "-";
  const wavePeriod = current.wave_period ?? "-";
  const swellHeight = current.swell_wave_height ?? "-";
  const swellDir = current.swell_wave_direction ?? "-";
  const swellPeriod = current.swell_wave_period ?? "-";
  const swellPeak = current.swell_wave_peak_period ?? "-";
  const seaTemp = current.sea_surface_temperature ?? "-";
  const seaLevel = current.sea_level_height_msl ?? "-";
  const windWavePeak = current.wind_wave_peak_period ?? "-";

  // 💨 Vento terrestre
  const windSpeedTerrestrial = terrestrialData?.current?.wind_speed_10m ?? null;
  const windDirTerrestrial = terrestrialData?.current?.wind_direction_10m ?? null;
  const windGustTerrestrial = terrestrialData?.current?.wind_gusts_10m ?? null;

  // Calcolo e formattazione per mostrare km/h e kn
  const windDisplay =
    windSpeedTerrestrial != null
      ? `${windSpeedTerrestrial} km/h (${kmhToKnots(windSpeedTerrestrial)} kn)`
      : "-";
  const gustDisplay =
    windGustTerrestrial != null
      ? `${windGustTerrestrial} km/h (${kmhToKnots(windGustTerrestrial)} kn)`
      : "-";

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center relative after:content-[''] after:block after:w-16 after:h-[2px] after:bg-gray-400 after:mx-auto after:mt-2">
        Meteo Marino
      </h2>

      <div className="flex flex-col gap-3 text-sm text-gray-700">

        {/* --- DATI VENTO (DA TERRA) --- */}
        <div className="flex justify-between items-center">
          <span>Velocità vento</span>
          <span>{windDisplay}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Direzione vento</span>
          <span>
            {windDirTerrestrial ?? "-"}° ({degreesToCardinal(windDirTerrestrial)})
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Raffica vento</span>
          <span>{gustDisplay}</span>
        </div>
        
        {/* --- DATI ONDE DI VENTO --- */}
        <div className="flex justify-between items-center">
          <span>Altezza Onde di Vento</span>
          <span>{waveHeight} m</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Direzione Onde di Vento</span>
          <span>{waveDir}° ({degreesToCardinal(waveDir)})</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Periodo Onde di Vento</span>
          <span>{wavePeriod} s</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Picco Periodo Onde di Vento</span>
          <span>{windWavePeak} s</span>
        </div>


        {/* --- DATI ONDA LUNGA (SWELL) --- */}
        <div className="flex justify-between items-center">
          <span>Altezza Onda Lunga</span>
          <span>{swellHeight} m</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Direzione Onda Lunga</span>
          <span>{swellDir}° ({degreesToCardinal(swellDir)})</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Periodo Onda Lunga</span>
          <span>{swellPeriod} s</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Picco Periodo Onda Lunga</span>
          <span>{swellPeak} s</span>
        </div>

        {/* --- DATI ACQUA E LIVELLI --- */}
        <div className="flex justify-between items-center">
          <span>Temperatura mare</span>
          <span>{seaTemp} °C</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Livello mare (MSL)</span>
          <span>{seaLevel} m</span>
        </div>
        
      </div>

      <p className="mt-4 text-xs text-gray-600 italic text-center">
        NB: i dati del vento si riferiscono al vento a terra in prossimità della costa, non al mare aperto.
      </p>
    </div>
  );
}