import React from "react";
import { degreesToCardinal } from "../../Utils/direction";

export default function TerrestrialWeatherCard({ terrestrialData }) {
  if (!terrestrialData) return null;

  const { current } = terrestrialData;

  // Calcola la visibilità in km
  let visibilityKm = "-";
  if (current.visibility != null) {
    const visibilityMeters = current.visibility;
    
    // Se la visibilità è 10000 metri (il massimo spesso riportato), mostra "> 10 km"
    if (visibilityMeters >= 10000) {
      visibilityKm = "maggiore di 10 km";
    } else {
      // Altrimenti, formatta il valore in km
      visibilityKm = `${(visibilityMeters / 1000).toFixed(1)} km`;
    }
  }

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center relative after:content-[''] after:block after:w-16 after:h-[2px] after:bg-gray-400 after:mx-auto after:mt-2">
        Meteo Terrestre
      </h2>

      <div className="flex flex-col gap-3 text-sm text-gray-700">

        {/* Temperatura */}
        <div className="flex w-full max-[544px]:flex-nowrap justify-between items-center">
          <span className="w-1/2 max-[544px]:w-2/3 text-sm sm:text-base">
            Temperatura
          </span>
          <span className="w-1/2 max-[544px]:w-1/3 text-sm sm:text-base text-right">
            {current.temperature_2m ?? "-"}°C
          </span>
        </div>

        {/* Temperatura percepita */}
        <div className="flex w-full max-[544px]:flex-nowrap justify-between items-center">
          <span className="w-1/2 max-[544px]:w-2/3 text-sm sm:text-base">
            Temperatura percepita
          </span>
          <span className="w-1/2 max-[544px]:w-1/3 text-sm sm:text-base text-right">
            {current.apparent_temperature ?? "-"}°C
          </span>
        </div>

        {/* Precipitazione attuale (Ultima ora) */}
        <div className="flex justify-between items-center">
          <span>Precipitazione (attuale)</span>
          <span>{(current.precipitation ?? 0)} mm/h</span>
        </div>

        {/* Umidità */}
        <div className="flex justify-between items-center">
          <span>Umidità Relativa</span>
          <span>{current.relative_humidity_2m ?? "-"}%</span>
        </div>

        {/* --- DATI PRESSIONE --- */}

        {/* Pressione Superficiale (Cruciale per Altitudine) */}
        <div className="flex justify-between items-center">
          <span>Pressione Superficiale</span>
          {/* Valore all'altitudine del luogo */}
          <span>{current.surface_pressure ?? "-"} hPa</span> 
        </div>
        
        {/* Pressione Atmosferica (MSL) (Cruciale per Previsioni) */}
        <div className="flex justify-between items-center">
          <span>Pressione Atmosferica (MSL)</span>
          {/* Valore ridotto al livello del mare */}
          <span>{current.pressure_msl ?? "-"} hPa</span> 
        </div>

        {/* --- DATI VENTO --- */}

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

        {/* --- ALTRI DATI --- */}

        <div className="flex justify-between items-center">
          <span>Visibilità</span>
          <span>{visibilityKm}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Indice UV</span>
          <span>{current.uv_index ?? "-"}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Nuvolosità</span>
          <span>{current.cloud_cover ?? "-"}%</span>
        </div>
      </div>
    </div>
  );
}