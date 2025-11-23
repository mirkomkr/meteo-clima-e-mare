import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AppFooter() {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-md rounded-lg border-t border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-6 flex flex-col items-center text-center">

        {/* Sottotitolo descrittivo */}
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Progetto personale sviluppato per il mio portfolio Front-End.
        </p>

        {/* Icone social */}
        <div className="flex gap-4 mt-3">
          <a
            href="https://github.com/mirkomkr/meteo-clima-e-mare"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita il mio GitHub"
            className="text-gray-700 hover:text-black transition-colors duration-200"
          >
            <FaGithub size={20} />
          </a>

          <a
            href="https://www.linkedin.com/in/mirko-passeri/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visita il mio profilo LinkedIn"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
