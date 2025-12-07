# Clima e Mare

Clima e Mare è un’applicazione React che permette di ottenere dati meteorologici terrestri e marini per qualsiasi località, con gestione della ricerca, geolocalizzazione, cache e fetch paralleli. L’app è stata sviluppata come progetto personale portfolio per mostrare le mie competenze da Front-End Developer.

---

## 📌 Funzionalità principali

- La **SearchBar** gestisce esclusivamente la UI, mentre il custom hook `useLocationSearch` gestisce tutta la logica della query di ricerca. Questa separazione garantisce pulizia del codice, maggiore manutenibilità e, soprattutto, che la UI rimanga indipendente dalla logica anche in caso di aggiornamenti o problemi del custom hook.
- La **gestione della cache** verifica se i dati sono ancora validi, evitando fetch inutili e migliorando le performance dell’app.
- I dati **terrestri e marini** vengono richiesti in parallelo, con stato di caricamento ed eventuali errori gestiti separatamente per ciascun fetch.
- La ricerca utilizza l’**API Geocoding** per ottenere risultati compatibili con la query. Il fetch non viene eseguito ad ogni lettera digitata: grazie al debounce di 500ms nel custom hook `useLocationSearch`, la richiesta parte solo dopo che l’utente ha smesso di digitare. Se l’utente digita nuovamente prima dei 500ms, il precedente timeout viene cancellato. Inoltre, la fetch non parte per query vuote, con meno di 3 lettere o quando l’utente ha già selezionato manualmente una località.
- La **cache sfrutta il localStorage** per evitare richieste ripetute alle API. Ogni combinazione di latitudine/longitudine viene salvata con un timestamp e considerata valida per 60 minuti. Prima di effettuare una nuova fetch, l’app controlla se esiste un dato in cache ancora valido: in quel caso utilizza il dato salvato, riducendo il numero di chiamate e migliorando le performance. Se i dati risultano scaduti o assenti, viene eseguita una nuova fetch e la cache viene aggiornata.

---

## 🛠 Tecnologie utilizzate

- **React 19** — libreria principale per costruire l’interfaccia e gestire lo stato dei componenti.
- **Vite** — tool di sviluppo rapido con HMR e build ottimizzata.
- **Tailwind CSS 4** — sistema di utility classes per uno stile coerente e responsivo.
- **React Icons / Lucide React** — icone leggere e personalizzabili utilizzate nella UI.
- **ESLint** — configurato per garantire coerenza e qualità del codice durante lo sviluppo.
- **node-fetch** — usato per gestire chiamate API in modo uniforme.
- **Open-Meteo APIs** (Geocoding, Terrestrial Weather, Marine Weather) — servizi esterni per ottenere coordinate e dati meteorologici completi.
- **LocalStorage** — utilizzato come meccanismo di caching per ridurre le fetch ripetute.

---

## 📁 Struttura del progetto

- `App.jsx` / `main.jsx` — punto di ingresso dell’app React  
- `components/` — componenti UI principali, suddivisi per funzionalità:  
  - `UI/` → componenti riutilizzabili (IconButton, WeatherMetric, ecc.)  
  - `Weather/` → componenti specifici per le card e il dashboard meteo  
  - `SearchBar.jsx`, `Header.jsx`, `Footer.jsx` → layout e input principali  
- `hooks/` — custom hooks per logica dell’app:  
  - `useLocationSearch.js` → gestione query e geolocalizzazione  
  - `useWeather.js` → fetch paralleli, cache e stato dei dati meteo  
- `Utils/` — helper e funzioni ausiliarie per fetch, conversioni, calcoli  
- `assets/` — immagini e risorse statiche  

---

## 🚀 Setup rapido

```
Clona il repository:
git clone https://github.com/tuo-username/meteo-app.git

Entra nella cartella del progetto:
cd meteo-app

Installa le dipendenze:
npm install

Avvia l’app in modalità sviluppo:
npm run dev

Costruisci il progetto per produzione:
npm run build

Anteprima locale della build:
npm run preview
```
---

## ⚡ Note finali

Il progetto è pensato come portfolio personale, quindi alcune ottimizzazioni e miglioramenti UI/UX possono essere aggiunti in futuro.

Tutti i dati sono forniti dalle API di Open-Meteo.

## ✍️ Author
* **Mirko Passeri**
    * [GitHub](https://github.com/mirkomkr)
    * [LinkedIn](https://www.linkedin.com/in/mirko-passeri/)
