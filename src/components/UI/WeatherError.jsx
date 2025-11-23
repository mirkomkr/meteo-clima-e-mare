import React from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { MdCloudOff } from "react-icons/md";
import IconButton from "./IconButton";

export default function WeatherError({ message, onRetry }) {
  const displayMessage = message || "Si è verificato un errore imprevisto.";
  const isConnectionError = displayMessage
    .toLowerCase()
    .includes("connessione");

  return (
    <section
      role="alert"
      aria-live="assertive"
      className="fixed inset-0 flex items-center justify-center bg-[#fcf9f2] z-50 p-6"
    >
      <div className="flex flex-col items-center text-center bg-white border border-[#61c7dd] shadow-lg rounded-2xl p-8 max-w-sm w-full">
        <div className="mb-4 text-[#d7a641]">
          {isConnectionError ? (
            <MdCloudOff size={64} aria-label="Errore di connessione" />
          ) : (
            <FiAlertTriangle size={64} aria-label="Errore meteo" />
          )}
        </div>

        <h2 className="text-xl font-semibold text-[#1e1606] mb-2">
          Ops! Qualcosa è andato storto
        </h2>
        <p className="text-[#1e1606] mb-6 px-4">{displayMessage}</p>

        <IconButton
          onClick={onRetry}
          type="button"
          testo="Riprova"
          testoAriaLabel="Riprova ricerca meteo"
          variant="accent"
        />
      </div>
    </section>
  );
}
