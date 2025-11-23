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

  const windKnots =
    windSpeedTerrestrial != null ? `${kmhToKnots(windSpeedTerrestrial)} kn` : "-";
  const gustKnots =
    windGustTerrestrial != null ? `${kmhToKnots(windGustTerrestrial)} kn` : "-";

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center relative after:content-[''] after:block after:w-16 after:h-[2px] after:bg-gray-400 after:mx-auto after:mt-2">
        Meteo Marino
      </h2>

      <div className="flex flex-col gap-3 text-sm text-gray-700">

        {/* Vento terrestre */}
        <div className="flex justify-between items-center">
          <span>Velocità vento</span>
          <span>{windKnots}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Direzione vento</span>
          <span>
            {windDirTerrestrial ?? "-"}° ({degreesToCardinal(windDirTerrestrial)})
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Raffica vento</span>
          <span>{gustKnots}</span>
        </div>

        {/* Onde */}
        <div className="flex justify-between items-center">
          <span>Altezza onde</span>
          <span>{waveHeight} m</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Direzione onde</span>
          <span>{waveDir}° ({degreesToCardinal(waveDir)})</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Periodo onde</span>
          <span>{wavePeriod} s</span>
        </div>

        {/* Swell */}
        <div className="flex justify-between items-center">
          <span>Altezza swell</span>
          <span>{swellHeight} m</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Direzione swell</span>
          <span>{swellDir}° ({degreesToCardinal(swellDir)})</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Periodo swell</span>
          <span>{swellPeriod} s</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Picco swell</span>
          <span>{swellPeak} s</span>
        </div>

        {/* Acqua e maree */}
        <div className="flex justify-between items-center">
          <span>Temperatura mare</span>
          <span>{seaTemp} °C</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Livello mare</span>
          <span>{seaLevel} m</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Periodo onde di vento</span>
          <span>{windWavePeak} s</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-600 italic text-center">
        NB: i dati del vento si riferiscono al vento a terra in prossimità della costa, non al mare aperto.
      </p>
    </div>
  );
}
