import React, { useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherLoading from "./components/UI/WeatherLoading";
import WeatherError from "./components/UI/WeatherError";
import WeatherDashboard from "./components/WeatherDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/react";
import useWeather from "./hooks/useWeather";
import useLocationSearch from "./hooks/useLocationSearch";

export default function App() {
  const {
    query,
    setQuery,
    onChangeQuery,
    results,
    selectedLocation,
    loading: locationLoading,
    error: locationError,
    chooseCity,
    geolocate,
    reset, 
  } = useLocationSearch();

  const { state, updateAllData } = useWeather(
    selectedLocation
      ? { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude }
      : null,
    false
  );

  const searchInputRef = useRef(null);

  /* 🔄 Aggiorna meteo quando scelgo una location */
  useEffect(() => {
    if (selectedLocation) {
      updateAllData(selectedLocation.latitude, selectedLocation.longitude);
      document.title = `Meteo ${selectedLocation.name} - Clima e Mare`;
    } else {
      document.title = "Clima e Mare - Previsioni Meteo";
    }
  }, [selectedLocation]);

  const loading = locationLoading || state.terrestrial.loading || state.marine.loading;
  const error = locationError || state.terrestrial.error || state.marine.error;

  const handleRetry = () => {
    reset(); // <-- reset totale location
    setQuery("");
    searchInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f2] text-[#1e1606] transition-colors duration-300">

      {/* HEADER */}
      <Header className="w-full px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8" />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center w-full px-4 sm:px-6 md:px-8 mt-6">

        {loading && <WeatherLoading />}

        {error && !loading && (
          <WeatherError message={error} onRetry={handleRetry} />
        )}

        <div
          className={`w-full max-w-lg mt-6 ${
            loading ? "pointer-events-none opacity-50" : ""
          }`}
        >
          {/* 🔍 SEARCH BAR */}
          <SearchBar
            ref={searchInputRef}
            value={query}
            onChange={onChangeQuery}
            onSubmit={(e) => e.preventDefault()}
            onGeolocate={geolocate}
            loading={loading}
            error={locationError}
          />

          {/* 📌 Risultati città */}
          {results.length > 0 && !loading && (
            <ul className="mt-3 bg-white border rounded-lg shadow divide-y">
              {results.map((city) => (
                <li
                  key={city.id}
                  className="p-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => chooseCity(city)}
                >
                  {city.name} — {city.admin1}, {city.country}
                </li>
              ))}
            </ul>
          )}

          {/* 🌤 DASHBOARD METEO */}
          {!loading &&
            !error &&
            selectedLocation &&
            (state.terrestrial.data || state.marine.data) && (
              <WeatherDashboard state={state} updateAllData={updateAllData} />
            )}
        </div>
      </main>
      <SpeedInsights />
      {/* FOOTER */}
      <footer className="w-full py-6 sm:py-8 px-4 sm:px-6 md:px-8 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
