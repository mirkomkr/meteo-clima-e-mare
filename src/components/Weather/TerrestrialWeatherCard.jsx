import React from "react";
import { degreesToCardinal } from "../../Utils/direction";

export default function TerrestrialWeatherCard({ terrestrialData }) {
  if (!terrestrialData) return null;

  // Destrutturiamo 'current' per i dati istantanei e 'hourly' per i dati a 0°C/Rugiada
  const { current, hourly } = terrestrialData; 

  // --- ESTRAZIONE DATI HOURLY PIÙ RECENTI ---
  // 1. Punto dello Zero (Altezza Isoterma di 0°C)
  const zeroCHight = hourly?.freezing_level_height?.[0]; 
  // 2. Punto di Rugiada
  const dewPoint = hourly?.dew_point_2m?.[0]; 

  
  // Funzione per formattare l'altezza in metri o mostrare stato
  const formatAltitude = (value) => {
      if (value == null || value === 0) return "A terra o non rilevato";
      return `${Math.round(value)} m`;
  };

  // Calcola la visibilità in km
  let visibilityKm = "-";
  if (current.visibility != null) {
    const visibilityMeters = current.visibility;
    if (visibilityMeters >= 10000) {
      visibilityKm = "maggiore di 10 km";
    } else {
      visibilityKm = `${(visibilityMeters / 1000).toFixed(1)} km`;
    }
  }


  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center relative after:content-[''] after:after:block after:w-16 after:h-[2px] after:bg-gray-400 after:mx-auto after:mt-2">
        Meteo Terrestre
      </h2>

      <div className="flex flex-col gap-3 text-sm text-gray-700">

        {/* --- PUNTO DELLO ZERO (Stile Speciale) --- */}
        {/* Uniformità: flex justify-between items-center w-full text-sm sm:text-base */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Punto dello Zero (Isoterma 0°C)</span>
          <span className="text-right">{formatAltitude(zeroCHight)}</span>
        </div>
        
        {/* Temperatura */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Temperatura</span>
          <span className="text-right">
            {current.temperature_2m ?? "-"}°C
          </span>
        </div>

        {/* Temperatura percepita */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Temperatura percepita</span>
          <span className="text-right">
            {current.apparent_temperature ?? "-"}°C
          </span>
        </div>

        {/* Precipitazione attuale (Ultima ora) */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Precipitazione (attuale)</span>
          <span className="text-right">{(current.precipitation ?? 0)} mm/h</span>
        </div>

        {/* --- PUNTO DI RUGIADA --- */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Punto di Rugiada</span>
          <span className="text-right">{dewPoint ?? "-"}°C</span>
        </div>

        {/* Umidità */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Umidità Relativa</span>
          <span className="text-right">{current.relative_humidity_2m ?? "-"}%</span>
        </div>

        {/* Pressione Superficiale (Cruciale per Altitudine) */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Pressione Superficiale</span>
          <span className="text-right">{current.surface_pressure ?? "-"} hPa</span> 
        </div>
        
        {/* Pressione Atmosferica (MSL) (Cruciale per Previsioni) */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Pressione Atmosferica (MSL)</span>
          <span className="text-right">{current.pressure_msl ?? "-"} hPa</span> 
        </div>

        {/* Vento */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Velocità vento</span>
          <span className="text-right">{current.wind_speed_10m ?? "-"} km/h</span>
        </div>

        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Direzione vento</span>
          <span className="text-right">
            {current.wind_direction_10m ?? "-"}° (
            {degreesToCardinal(current.wind_direction_10m)})
          </span>
        </div>

        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Raffica vento</span>
          <span className="text-right">{current.wind_gusts_10m ?? "-"} km/h</span>
        </div>

        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Visibilità</span>
          <span className="text-right">{visibilityKm}</span>
        </div>

        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Indice UV</span>
          <span className="text-right">{current.uv_index ?? "-"}</span>
        </div>

        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Nuvolosità</span>
          <span className="text-right">{current.cloud_cover ?? "-"}%</span>
        </div>
      </div>
    </div>
  );
}