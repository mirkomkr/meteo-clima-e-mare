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
{/*       <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center relative after:content-[''] after:block after:w-16 after:h-[2px] after:bg-gray-400 after:mx-auto after:mt-2">
        Meteo Attuale
      </h2> */}

      {/* Icona principale + descrizione */}
      <div className="flex flex-col items-center mb-4 text-center">
        <IconComponent size={64} className="text-gray-700 drop-shadow-sm" />
        <p className="text-gray-700 text-base mt-2 font-medium">{description}</p>
      </div>

      {/* Dati meteo */}
      <div className="flex flex-wrap gap-3">

        {/* Alba */}
        <div className="flex w-full max-[544px]:flex-nowrap justify-between items-center">
          <span className="w-1/2 max-[544px]:w-2/3 text-sm sm:text-base">
            Alba
          </span>
          <span className="w-1/2 max-[544px]:w-1/3 text-sm sm:text-base text-right">
            {daily.sunrise?.[0]
              ? daily.sunrise[0].split("T")[1].slice(0, 5)
              : "-"}
          </span>
        </div>

        {/* Tramonto */}
        <div className="flex w-full max-[544px]:flex-nowrap justify-between items-center">
          <span className="w-1/2 max-[544px]:w-2/3 text-sm sm:text-base">
            Tramonto
          </span>
          <span className="w-1/2 max-[544px]:w-1/3 text-sm sm:text-base text-right">
            {daily.sunset?.[0]
              ? daily.sunset[0].split("T")[1].slice(0, 5)
              : "-"}
          </span>
        </div>

        {/* Temp max */}
        <div className="flex w-full max-[544px]:flex-nowrap justify-between items-center">
          <span className="w-1/2 max-[544px]:w-2/3 text-sm sm:text-base">
            Temp. max prevista
          </span>
          <span className="w-1/2 max-[544px]:w-1/3 text-sm sm:text-base text-right">
            {daily?.temperature_2m_max?.[0] ?? "-"}°C {" "}

          </span>
        </div>

        {/* Temp min */}
        <div className="flex w-full max-[544px]:flex-nowrap justify-between items-center">
          <span className="w-1/2 max-[544px]:w-2/3 text-sm sm:text-base">
            Temp. min prevista
          </span>
          <span className="w-1/2 max-[544px]:w-1/3 text-sm sm:text-base text-right">

            {daily?.temperature_2m_min?.[0] ?? "-"}°C {" "}
          </span>
        </div>
      </div>
    </div>
  );
}
