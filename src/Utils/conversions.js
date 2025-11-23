// Funzioni di conversione uniformi

function round(value, decimals) {
  if (value == null || isNaN(value)) return null;
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

  // Velocità vento marina in nodi → 1 decimale
function kmhToKnots(kmh) {
  if (kmh == null || isNaN(kmh)) return null;
  return +(kmh * 0.539957).toFixed(1); // un decimale
}

export { kmhToKnots, round };
