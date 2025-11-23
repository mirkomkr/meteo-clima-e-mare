import React, { useState } from "react";
import WeatherError from "./UI/WeatherError";
import WeatherLoading from "./UI/WeatherLoading";
import WeatherDashboardContent from "./Weather/WeatherDashboardContent";

export default function WeatherDashboard({ state, updateAllData }) {
  const [locationName, setLocationName] = useState(""); // nuovo stato
  const terrestrial = state.terrestrial?.data;
  const marine = state.marine?.data;
  const loading = state.terrestrial.loading || state.marine.loading;
  const error = state.terrestrial.error || state.marine.error;

  const terrestrialCurrent = terrestrial?.current || null;
  const terrestrialDaily = terrestrial?.daily || null;
  // 🔹 funzione reverse geocoding minima
  async function getLocationName(lat, lon) {
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${lat}&longitude=${lon}`
      );
      const data = await res.json();
      return data?.name || data?.city || "Località sconosciuta";
    } catch (err) {
      console.error("Errore reverse geocoding:", err);
      return "Località sconosciuta";
    }
  }

  // 🔹 callback da passare al tasto geolocalizzazione
  async function handleGeolocate(lat, lon) {
    if (!lat || !lon) return;
    const name = await getLocationName(lat, lon);
    setLocationName(name);

    // aggiorna i dati meteo con la nuova posizione
    updateAllData({ latitude: lat, longitude: lon });
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Mostra nome città se disponibile */}
      {locationName && (
        <p className="text-center text-gray-700 mb-4">📍 Sei a: {locationName}</p>
      )}

      {error && <WeatherError message={error} onRetry={updateAllData} />}
      {loading && !error && <WeatherLoading />}

      {!loading && !error && (terrestrial || marine) && (
        <WeatherDashboardContent
          general={{ current: terrestrialCurrent, daily: terrestrialDaily }}
          terrestrial={terrestrial}
          marine={marine}
          onGeolocate={handleGeolocate} // ← passiamo la callback
        />
      )}
    </div>
  );
}
