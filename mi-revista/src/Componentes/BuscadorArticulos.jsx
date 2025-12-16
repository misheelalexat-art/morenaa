import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function BuscadorArticulos({ onBuscar }) {
  const [busqueda, setBusqueda] = useState("");

  // 🔁 Cargar última búsqueda
  useEffect(() => {
    const ultima = localStorage.getItem("busqueda_articulos") || "";
    setBusqueda(ultima);
    onBuscar?.(ultima);
  }, []);

  // 💾 Guardar búsqueda
  useEffect(() => {
    localStorage.setItem("busqueda_articulos", busqueda);
    onBuscar?.(busqueda);
  }, [busqueda]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-4xl mx-auto p-6"
    >
      <h2 className="text-2xl font-extrabold mb-4 text-center">
        🔍 Buscar artículos
      </h2>

      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Buscar por título, categoría o contenido..."
          className="w-full p-4 pl-12 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#41644A]"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        {/* Icono */}
        <span className="absolute left-4 text-gray-400 text-lg">🔎</span>

        {/* Limpiar */}
        {busqueda && (
          <button
            onClick={() => setBusqueda("")}
            className="absolute right-3 bg-red-500 text-white w-9 h-9 rounded-full hover:bg-red-600 transition"
            title="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </div>

      {/* Estado */}
      {busqueda && (
        <p className="text-sm text-gray-500 mt-2 text-center">
          Buscando: <span className="font-semibold">“{busqueda}”</span>
        </p>
      )}
    </motion.div>
  );
}

export default BuscadorArticulos;
