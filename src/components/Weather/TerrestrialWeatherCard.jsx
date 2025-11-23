import React from "react";
import { degreesToCardinal } from "../../Utils/direction";

/* const formatTime = (isoString) => {
  if (!isoString) return "-";
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}; */

export default function TerrestrialWeatherCard({ terrestrialData }) {
  if (!terrestrialData) return null;

  const { current, daily } = terrestrialData;
  const visibilityKm =
    current.visibility != null ? (current.visibility / 1000).toFixed(1) : "-";

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center relative after:content-[''] after:block after:w-16 after:h-[2px] after:bg-gray-400 after:mx-auto after:mt-2">
        Meteo Terrestre
      </h2>

      <div className="flex flex-col gap-3 text-sm text-gray-700">

        <div className="flex justify-between items-center">
          <span>Velocità vento</span>
          <span>{current.wind_speed_10m ?? "-"} km/h</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Direzione vento</span>
          <span>
            {current.wind_direction_10m ?? "-"}° (
            {degreesToCardinal(current.wind_direction_10m)})
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>Raffica vento</span>
          <span>{current.wind_gusts_10m ?? "-"} km/h</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Umidità</span>
          <span>{current.relative_humidity_2m ?? "-"}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Visibilità</span>
          <span>{visibilityKm} km</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Indice UV</span>
          <span>{current.uv_index ?? "-"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Nuvolosità</span>
          <span>{current.cloud_cover ?? "-"}%</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Pioggia</span>
          <span>{daily?.precipitation_sum?.[0] ?? "-"} mm</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Neve</span>
          <span>{daily?.snowfall_sum?.[0] ?? "-"} mm</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Probabilità pioggia</span>
          <span>{daily?.precipitation_probability_max?.[0] ?? "-"}%</span>
        </div>
      </div>
    </div>
  );
}
