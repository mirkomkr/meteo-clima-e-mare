import React from "react";

export default function AppHeader() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md rounded-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col items-center text-center">

        {/* Titolo principale SEO + A11y */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
          Clima e Mare
        </h1>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mt-2">
          Previsioni meteo in tempo reale
        </h2>
      </div>
    </header>
  );
}
