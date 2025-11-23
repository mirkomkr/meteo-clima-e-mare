/**
 * API Geocoding Open-Meteo (versione multi-risultato)
 * Ritorna una lista di città compatibili con il nome cercato.
 *
 * @param {string} city
 * @returns {Promise<Array>} Lista città { name, country, admin1, latitude, longitude }
 */
export default async function fetchCoordinates(city) {
  if (!city || typeof city !== "string") {
    throw new Error("Nome città non valido");
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=10&language=it&format=json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Errore API Geocoding: ${response.status}`);
    }

    const data = await response.json();
    if (!data.results || data.results.length === 0) {
      return [];
    }

    return data.results.map((c) => ({
      id: c.id,
      name: c.name,
      country: c.country,
      admin1: c.admin1,
      latitude: c.latitude,
      longitude: c.longitude,
    }));
  } catch (err) {
    console.error("❌ Errore fetchCoordinates:", err);
    throw err;
  }
}
