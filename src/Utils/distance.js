export function getDistanceFromCoast(lat, lon) {
  const coastline = [
    { lat: 41.889, lon: 12.493 }, // Roma
    { lat: 45.438, lon: 12.327 }, // Venezia
    { lat: 40.842, lon: 14.252 }, // Napoli
    { lat: 38.115, lon: 13.361 }, // Palermo
    { lat: 44.405, lon: 8.946 },  // Genova
    // puoi aggiungere altri punti
  ];

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  let minDistance = Infinity;
  for (const point of coastline) {
    const dist = haversine(lat, lon, point.lat, point.lon);
    if (dist < minDistance) minDistance = dist;
  }
  return minDistance;
}
