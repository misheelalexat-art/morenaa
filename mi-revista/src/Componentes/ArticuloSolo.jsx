// src/Componentes/ArticuloSolo.jsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticulosData from "./ArticulosData";

function ArticuloSolo() {
  const { id } = useParams();

  // 🔁 Recuperar artículos de localStorage o usar datos iniciales
  const articulos = JSON.parse(localStorage.getItem("articulos")) || ArticulosData;
  const articulo = articulos.find((a) => a.id === Number(id));

  // 👁 Contador de vistas
  useEffect(() => {
    if (!articulo) return;

    const actualizados = articulos.map((a) =>
      a.id === articulo.id
        ? { ...a, vistas: (a.vistas || 0) + 1 }
        : a
    );

    localStorage.setItem("articulos", JSON.stringify(actualizados));
  }, [id]);

  if (!articulo)
    return (
      <p className="text-center mt-10 text-gray-500">
        Artículo no encontrado
      </p>
    );

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Imagen */}
      <img
        src={articulo.imagen}
        alt={articulo.titulo}
        className="w-full h-80 object-cover rounded-2xl shadow-lg mb-8"
      />

      {/* Categoría */}
      {articulo.categoria && (
        <span className="inline-block mb-4 bg-yellow-400 text-black font-bold px-4 py-1 rounded-full">
          {articulo.categoria}
        </span>
      )}

      {/* Título */}
      <h1 className="text-4xl font-extrabold mb-3 leading-tight">
        {articulo.titulo}
      </h1>

      {/* Meta */}
      <p className="text-sm text-gray-500 mb-8">
        ✍ {articulo.autor || "Equipo Morena"} · {articulo.fecha} · 👁{" "}
        {articulo.vistas || 0} vistas
      </p>

      {/* Contenido completo */}
      <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line">
        {articulo.contenido}
      </div>

      {/* CTA */}
      <div className="mt-14 text-center">
        <Link
          to="/articulos"
          className="inline-block bg-[#41644A] text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition"
        >
          ← Volver a artículos
        </Link>
      </div>
    </motion.article>
  );
}

export default ArticuloSolo;
