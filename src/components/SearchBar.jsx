import React, { forwardRef } from "react";
import { FaLocationCrosshairs } from "react-icons/fa6";
import IconButton from "./UI/IconButton";

const SearchBar = forwardRef(
  ({ value, error, loading, onChange, onSubmit, onGeolocate }, ref) => (
    <form
      onSubmit={onSubmit} // blocco preventDefault già gestito in App.jsx
      role="search"
      className="flex flex-col sm:flex-row items-center gap-3 w-full"
    >
      <label htmlFor="search-location" className="sr-only">
        Cerca località
      </label>

      <input
        ref={ref}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        type="search"
        name="search-location"
        id="search-location"
        placeholder="Inserisci città o località"
        className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm sm:text-base
                   focus:outline-none focus:ring-2 focus:ring-teal-600 transition-colors duration-200
                   bg-white text-[#1e1606] placeholder-gray-400"
      />

      <div className="flex flex-col sm:flex-row gap-2 sm:w-auto">
        <IconButton
          type="submit"
          testo="Cerca"
          testoAriaLabel="Cerca città o località"
          variant="primary"
          disabled={loading}
          size="sm"
        />

        <IconButton
          onClick={onGeolocate}
          icon={FaLocationCrosshairs}
          testo="Usa la mia posizione"
          testoAriaLabel="Attiva geolocalizzazione"
          variant="secondary"
          disabled={loading}
          size="sm"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center w-full">{error}</p>
      )}
    </form>
  )
);

export default SearchBar;
