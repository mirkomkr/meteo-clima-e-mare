import { kmhToKnots, round } from './conversions.js';
import { weatherCodeToDescription } from './weatherMap.js';
function normalizeWeatherData(rawData, terrestrialFallback = null) {
  const timeZone = rawData.timezone || 'UTC';
  const current = rawData.current_weather || {};
  const daily = rawData.daily || {};

  // ✅ Dati vento fallback dal terrestre
  const fallbackWind = terrestrialFallback?.current_weather || terrestrialFallback?.current || {};

  return {
    generale: {
      temperatura: round(current.temperature_2m),
      temperaturaPercepita: round(current.apparent_temperature),
      condizioneAttuale: current.weather_code ?? null,
      descrizioneCondizione: weatherCodeToDescription(current.weather_code),
      temperaturaMin: round(daily.temperature_2m_min?.[0]),
      temperaturaMax: round(daily.temperature_2m_max?.[0]),
    },

    terrestre: {
      temperatura: round(current.temperature),
      temperaturaPercepita: round(current.apparent_temperature),
      umidita: current.relative_humidity ?? null,
      pressione: current.surface_pressure ?? null,
      visibilita: current.visibility ?? null,
      coperturaNuvolosa: current.cloudcover ?? null,
      indiceUV: current.uv_index ?? null,
      zeroTermico: current.freezing_level_height ?? null,
      velocitaVento: current.windspeed ?? null, // già in km/h
      direzioneVento: current.winddirection ?? null,
      rafficaVento: current.windgust ?? null,
      precipitazioniProbabilita: daily.precipitation_probability_max?.[0] ?? null,
      precipitazioniTotali: daily.precipitation_sum?.[0] ?? null,
      neveAccumulata: daily.snowfall_sum?.[0] ?? null,
      alba: daily.sunrise?.[0]
        ? new Date(daily.sunrise[0]).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone,
          })
        : null,
      tramonto: daily.sunset?.[0]
        ? new Date(daily.sunset[0]).toLocaleTimeString('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone,
          })
        : null,
      durataGiorno:
        daily.sunrise?.[0] && daily.sunset?.[0]
          ? `${Math.round(
              (new Date(daily.sunset[0]) - new Date(daily.sunrise[0])) / 3600000
            )} h`
          : null,
    },

marino: {
      velocitaVento:
        current.windspeed != null
          ? kmhToKnots(current.windspeed)
          : kmhToKnots(fallbackWind.windspeed_10m ?? 0),
      direzioneVento:
        current.winddirection ?? fallbackWind.winddirection_10m ?? null,
      rafficaVento:
        current.windgust != null
          ? kmhToKnots(current.windgust)
          : kmhToKnots(fallbackWind.windgusts_10m ?? 0),

      altezzaOnde: current.wave_height ?? null,
      periodoOnde: current.wave_period ?? null,
      direzioneOnde: current.wave_direction ?? null,
      altezzaOndeSwell: current.swell_wave_height ?? null,
      periodoOndeSwell: current.swell_wave_period ?? null,
      direzioneOndeSwell: current.swell_wave_direction ?? null,
      temperaturaAcqua: round(current.water_temperature),
      marea: current.tide_height ?? null,
      correnteSuperficiale: current.current_speed ?? null,
      direzioneCorrente: current.current_direction ?? null,
      salinita: current.salinity ?? null,
      pressione: current.surface_pressure ?? null,
      indiceUV: current.uv_index ?? null,
      coperturaNuvolosa: current.cloudcover ?? null,
      visibilita: current.visibility ?? null,
      marinoOrario: rawData.hourly || null,
    },

    timezone: timeZone,
  };
}

export default normalizeWeatherData;
