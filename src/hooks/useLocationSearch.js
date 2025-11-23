import { useState, useEffect, useRef } from "react";
import fetchCoordinates from "../Utils/apiGeocode";

export default function useLocationSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [manualSelection, setManualSelection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const debounceRef = useRef(null);

    const onChangeQuery = (value) => {
    setQuery(value);
    setManualSelection(false);  // permette nuovo fetch
    setSelectedLocation(null);  // reset vecchia città
    setError("");
  };

  /* 🔍 Ricerca automatica con debounce */
  useEffect(() => {
    if (!query.trim() || query.trim().length < 3 || manualSelection) return;

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setResults([]);
      setError("");

      try {
        const cities = await fetchCoordinates(query);

        if (!Array.isArray(cities) || cities.length === 0) {
          setError("Nessun risultato trovato.");
          return;
        }

        if (cities.length === 1) {
          setSelectedLocation(cities[0]);
          setManualSelection(true);
        } else {
          setResults(cities);
        }
      } catch (err) {
        console.error("Errore ricerca località:", err);
        setError("Errore durante la ricerca della città.");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(debounceRef.current);
  }, [query, manualSelection]);

  /* 🏙 Selezione città */
  const chooseCity = (city) => {
    setSelectedLocation(city);
    setResults([]);
    setManualSelection(true);
    setError("");
  };

  /* 📍 Geolocalizzazione */
  const geolocate = () => {
    setLoading(true);
    setError("");
    setManualSelection(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setSelectedLocation({
          id: "current-pos",
          name: "Posizione attuale",
          country: "",
          admin1: "",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLoading(false);
      },
      () => {
        setError("Impossibile ottenere la posizione.");
        setLoading(false);
      }
    );
  };

  /* 🔄 Reset completo (usato da WeatherError) */
  const reset = () => {
    setQuery("");
    setResults([]);
    setSelectedLocation(null);
    setManualSelection(false);
    setError("");
  };

  return {
    query,
    setQuery,
    onChangeQuery,
    results,
    selectedLocation,
    loading,
    error,
    chooseCity,
    geolocate,
    reset,
  };
}
