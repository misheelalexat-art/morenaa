// src/Componentes/Articulos.jsx
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import BuscadorArticulos from "./BuscadorArticulos";
import CardArticle from "./CardArticle";
import ArticuloDelDia from "./ArtículoDelDia";
import ArticulosData from "./ArticulosData";

function Articulos() {
  const categorias = [
    "Moda Morena",
    "Belleza y Skin Care",
    "Autoestima",
    "Cultura Latina",
    "Tendencias",
    "Estilo de Vida",
  ];

  const [articulos, setArticulos] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [orden, setOrden] = useState("recientes");
  const [busqueda, setBusqueda] = useState("");

  // 🔥 Inicializar artículos solo una vez
  useEffect(() => {
    const yaInicializado = localStorage.getItem("articulos_inicializados");

    if (!yaInicializado) {
      localStorage.setItem("articulos", JSON.stringify(ArticulosData));
      localStorage.setItem("articulos_inicializados", "true");
      setArticulos(ArticulosData);
    } else {
      const guardados = JSON.parse(localStorage.getItem("articulos")) || [];
      setArticulos(guardados);
    }
  }, []);

  // 📊 Filtrado + orden + búsqueda
  const articulosProcesados = useMemo(() => {
    let lista = categoriaActiva === "Todos"
      ? [...articulos]
      : articulos.filter(a => a.categoria === categoriaActiva);

    if (busqueda) {
      const busq = busqueda.toLowerCase();
      lista = lista.filter(
        a =>
          a.titulo.toLowerCase().includes(busq) ||
          a.categoria.toLowerCase().includes(busq) ||
          a.contenido?.toLowerCase().includes(busq)
      );
    }

    if (orden === "populares") lista.sort((a,b) => (b.vistas || 0) - (a.vistas || 0));
    if (orden === "likes") lista.sort((a,b) => (b.likes || 0) - (a.likes || 0));

    return lista;
  }, [articulos, categoriaActiva, orden, busqueda]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-center mb-4"
      >
        Artículos Morena
      </motion.h1>

      <p className="text-center text-gray-600 mb-10">
        Inspiración, cultura y belleza para mujeres que brillan
      </p>

      {/* Buscador */}
      <BuscadorArticulos onBuscar={setBusqueda} />

      {/* Artículo del día */}
      <ArticuloDelDia articulos={articulos} />

      {/* Filtros */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 mt-6">
        <button
          onClick={() => setCategoriaActiva("Todos")}
          className={`px-4 py-2 rounded-full border transition ${
            categoriaActiva === "Todos" ? "bg-black text-white" : "bg-white text-black"
          }`}
        >
          Todos
        </button>

        {categorias.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            className={`px-4 py-2 rounded-full border transition ${
              categoriaActiva === cat ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}

        {/* Orden */}
        <select
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
          className="ml-4 px-3 py-2 border rounded-full"
        >
          <option value="recientes">Más recientes</option>
          <option value="populares">Más vistos</option>
          <option value="likes">Más gustados</option>
        </select>
      </div>

      {/* Grid */}
      {articulosProcesados.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No se encontraron artículos.</p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {articulosProcesados.map((a) => (
            <CardArticle key={a.id} articulo={a} />
          ))}
        </motion.div>
      )}

      {/* CTA final */}
      <div className="mt-20 text-center bg-black text-white p-10 rounded-3xl">
        <h2 className="text-3xl font-bold mb-3">Únete a Morena ✨</h2>
        <p className="text-gray-300 mb-6">
          Contenido exclusivo, comunidad real y oportunidades para crecer
        </p>
        <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
          Suscribirme
        </button>
      </div>
    </div>
  );
}

export default Articulos;
