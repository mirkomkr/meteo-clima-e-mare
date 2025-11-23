import { useState, useEffect, useRef } from "react";
import fetchMarine from "../Utils/apiMarine";
import fetchTerrestrial from "../Utils/apiTerrestrial";
import fetchWrapper from "../Utils/fetchWrapper";

export default function useWeather(location, autoFetch = true) {
  const [state, setState] = useState({
    terrestrial: { data: null, loading: false, error: null, timestamp: 0 },
    marine: { data: null, loading: false, error: null, timestamp: 0 },
  });

  const cache_60_min = 60 * 60 * 1000;
  const lastRequestRefs = useRef({ terrestrial: null, marine: null }); // 👈 separati

  async function fetchData(type, location) {
    if (!location?.latitude || !location?.longitude) return null;

    const key = `${type}_${location.latitude}_${location.longitude}`;
    const now = Date.now();
    const cached = JSON.parse(localStorage.getItem(key) || "null");

    if (cached && now - cached.timestamp < cache_60_min) {
      setState((prev) => ({
        ...prev,
        [type]: {
          data: cached.data,
          loading: false,
          error: null,
          timestamp: cached.timestamp,
        },
      }));
      console.info(`Cache valida trovata per ${type}.`);
      return cached.data;
    }

    setState((prev) => ({
      ...prev,
      [type]: { ...prev[type], loading: true, error: null },
    }));

    const requestId = Date.now();
    lastRequestRefs.current[type] = requestId; // 👈 indipendente per tipo

    try {
      const fn = type === "marine" ? fetchMarine : fetchTerrestrial;
      const url = await fn(location.latitude, location.longitude);
      const data = await fetchWrapper(url, {}, type);

      // controlla solo il tipo corrispondente
      if (lastRequestRefs.current[type] !== requestId) return null;

      const newTimestamp = Date.now();
      setState((prev) => ({
        ...prev,
        [type]: { data, loading: false, error: null, timestamp: newTimestamp },
      }));

      localStorage.setItem(key, JSON.stringify({ data, timestamp: newTimestamp }));
      console.info(`✅ Nuovi dati salvati in cache per ${type}`);
      return data;
    } catch (error) {
      console.error(`❌ Errore durante la fetch di ${type}:`, error);
      setState((prev) => ({
        ...prev,
        [type]: { ...prev[type], loading: false, error: error.message },
      }));
      return null;
    } finally {
      setState((prev) => ({
        ...prev,
        [type]: { ...prev[type], loading: false },
      }));
      // reset per quel tipo
      if (lastRequestRefs.current[type] === requestId) {
        lastRequestRefs.current[type] = null;
      }
    }
  }

  async function updateAllData() {
    if (!location?.latitude || !location?.longitude) {
      console.warn("Posizione non valida: impossibile aggiornare i dati meteo.");
      return;
    }

    const { latitude, longitude } = location;
    console.log("🧠 useWeather montato");
    console.log("🔄 updateAllData() chiamata con:", latitude, longitude);
    console.time("⏱️ Tempo totale fetch parallele");
    console.log("🚀 Avvio fetch in parallelo per terrestrial + marine...");

    const results = await Promise.allSettled([
      fetchData("terrestrial", location),
      fetchData("marine", location),
    ]);

    console.timeEnd("⏱️ Tempo totale fetch parallele");
    console.log("📊 Risultati Promise.allSettled:", results);
  }

  useEffect(() => {
    if (autoFetch && location) updateAllData();
  }, [location]);

  return { state, updateAllData };
}
