// UI/WeatherLoading.jsx
import React, { useState, useEffect } from "react";
import {
  TiWeatherSunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherWindy,
  TiWeatherPartlySunny,
} from "react-icons/ti";

const icons = [
  { Component: TiWeatherSunny, label: "Sole", color: "text-[#d7a641]" },
  { Component: TiWeatherShower, label: "Pioggia", color: "text-[#61c7dd]" },
  { Component: TiWeatherSnow, label: "Neve", color: "text-[#8fe7c6]" },
  { Component: TiWeatherWindy, label: "Vento", color: "text-[#61c7dd]" },
  { Component: TiWeatherPartlySunny, label: "Parzialmente soleggiato", color: "text-[#d7a641]" },
];

export default function WeatherLoading() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      const timeout = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % icons.length);
        setFade(true);
      }, 300);
      return () => clearTimeout(timeout);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { Component, label, color } = icons[current];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 flex items-center justify-center bg-[#fcf9f2] z-50"
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className={`transition-opacity duration-300 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <Component size={64} className={color} aria-label={label} />
        </div>
        <span className="mt-2 text-[#1e1606]">Caricamento dati meteo…</span>
      </div>
    </div>
  );
}
