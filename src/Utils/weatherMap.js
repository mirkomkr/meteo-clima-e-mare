// Funzione per tradurre il weathercode di Open-Meteo in testo leggibile

export const weatherCodeDescriptions = {
  0: 'Cielo sereno',
  1: 'Prevalentemente sereno',
  2: 'Parzialmente nuvoloso',
  3: 'Coperto',
  45: 'Nebbia',
  48: 'Nebbia con brina',
  51: 'Pioggerella leggera',
  53: 'Pioggerella moderata',
  55: 'Pioggerella intensa',
  56: 'Pioggerella gelata leggera',
  57: 'Pioggerella gelata intensa',
  61: 'Pioggia leggera',
  63: 'Pioggia moderata',
  65: 'Pioggia intensa',
  66: 'Pioggia gelata leggera',
  67: 'Pioggia gelata intensa',
  71: 'Neve leggera',
  73: 'Neve moderata',
  75: 'Neve intensa',
  77: 'Grani di neve',
  80: 'Rovesci leggeri',
  81: 'Rovesci moderati',
  82: 'Rovesci violenti',
  85: 'Rovesci di neve leggeri',
  86: 'Rovesci di neve intensi',
  95: 'Temporale leggero o moderato',
  96: 'Temporale con grandine leggera',
  99: 'Temporale con grandine intensa',
};

export function weatherCodeToDescription(code) {
  return weatherCodeDescriptions[code] || 'Condizione sconosciuta';
}
