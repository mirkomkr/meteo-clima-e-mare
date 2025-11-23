import React from "react";
import { getWeatherIcon, weatherCodeToDescription } from "../UI/weatherIcons";

export default function GeneralWeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const current = weatherData.current || weatherData;
  const daily = weatherData.daily || {};

  const IconComponent = getWeatherIcon(
    current.weather_code,
    current.is_day === 1
  );
  const description = weatherCodeToDescription(current.weather_code);

  return (
    <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-md p-6 w-full max-w-xl mx-auto">

{/* ICONA + TEMPERATURA GRANDE */}
      <div className="flex items-center justify-center mb-2">
        {/* 1. Icona */}
        <IconComponent size={64} className="text-gray-700 drop-shadow-sm mr-4" />

        {/* 2. Colonna Temperatura */}
        <div className="flex flex-col items-start"> 
          <p className="text-6xl font-extrabold text-gray-700ading-none">
            {current.temperature_2m ?? "-"}°C
          </p>
        </div>
      </div>
      
      {/* DESCRIZIONE A LARGHEZZA INTERA E CENTRATA */}
      <div className="mb-4 text-center"> 
          <p className="text-gray-700 text-base font-medium">
            {description}
          </p>
      </div>
         
      {/* Separatore visivo tra condizione attuale e previsioni giornaliere */}
      <hr className="my-4 border-gray-300" />

      {/* Dati meteo (Previsioni Giornaliere) */}
      <div className="flex flex-col gap-3 text-gray-700"> {/* CORREZIONE: Aggiunto text-gray-700 qui */}

        {/* Alba */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Alba</span>
          <span className="text-right">
            {daily.sunrise?.[0]
              ? daily.sunrise[0].split("T")[1].slice(0, 5)
              : "-"}
          </span>
        </div>

        {/* Tramonto */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Tramonto</span>
          <span className="text-right">
            {daily.sunset?.[0]
              ? daily.sunset[0].split("T")[1].slice(0, 5)
              : "-"}
          </span>
        </div>

        {/* Temp max */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Temp. max prevista</span>
          <span className="text-right">
            {daily?.temperature_2m_max?.[0] ?? "-"}°C
          </span>
        </div>

        {/* Temp min */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Temp. min prevista</span>
          <span className="text-right">
            {daily?.temperature_2m_min?.[0] ?? "-"}°C
          </span>
        </div>
        
        {/* Pioggia */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Pioggia</span>
          <span className="text-right">{daily?.precipitation_sum?.[0] ?? "-"} mm</span>
        </div>

        {/* Neve */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Neve</span>
          <span className="text-right">{daily?.snowfall_sum?.[0] ?? "-"} mm</span>
        </div>

        {/* Probabilità pioggia */}
        <div className="flex justify-between items-center w-full text-sm sm:text-base">
          <span>Probabilità pioggia</span>
          <span className="text-right">{daily?.precipitation_probability_max?.[0] ?? "-"}%</span>
        </div>
      </div>
    </div>
  );
}