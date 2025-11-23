// Utils/fetchWrapper.js
export default async function fetchWrapper(url, opts = {}, tag = "") {
  console.log(`🌐 Inizio fetch ${tag}:`, url);

  try {
    const response = await fetch(url, opts);
    console.log(`✅ Risposta fetch ${tag}:`, response.status);

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Errore fetch ${tag}: ${response.status} - ${text.slice(0, 100)}...`);
    }

    const data = await response.json();
    console.log(`📦 Dati JSON ricevuti per ${tag}:`, data);

    return data;
  } catch (err) {
    console.error(`❌ Errore fetch ${tag}:`, err);
    throw err;
  } finally {
    console.log(`🔚 Fine fetch ${tag}`);
  }
}
