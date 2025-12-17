import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ArticulosMasLeidos({ articulos = [] }) {
  const [masVistos, setMasVistos] = useState([]);
  const [masComentados, setMasComentados] = useState([]);

  // 🔥 Más vistos
  useEffect(() => {
    const vistos = [...articulos]
      .sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
      .slice(0, 5);
    setMasVistos(vistos);
  }, [articulos]);

  // 💬 Más comentados
  useEffect(() => {
    const comentados = [...articulos]
      .sort((a, b) => (b.comentarios || 0) - (a.comentarios || 0))
      .slice(0, 5);
    setMasComentados(comentados);
  }, [articulos]);

  // 🖼️ Helper simple para imágenes del public
  const getImage = (img) => img || "/public.jpg";

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 my-20">
      {/* TÍTULO */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-romance text-center text-morena-garnet mb-12">
        Lo más popular en Morena ✨
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 🔥 MÁS VISTOS */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            🔥 Más vistos
          </h3>
          <div className="space-y-4">
            {masVistos.map((a, i) => (
              <Link
                key={a.id}
                to={`/articulo/${a.id}`}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition group"
              >
                <span className="text-3xl font-extrabold text-morena-bronze w-8">
                  {i + 1}
                </span>

                <img
                  src={getImage(a.imagen)}
                  alt={a.titulo}
                  className="w-20 h-20 object-cover rounded-xl shadow"
                />

                <div className="flex-1">
                  <p className="font-semibold group-hover:underline line-clamp-2">
                    {a.titulo}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    👁 {a.vistas || 0} vistas
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 💬 MÁS COMENTADOS */}
        <div className="bg-white rounded-3xl shadow-xl p-6">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            💬 Más comentados
          </h3>
          <div className="space-y-4">
            {masComentados.map((a, i) => (
              <Link
                key={a.id}
                to={`/articulo/${a.id}`}
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition group"
              >
                <span className="text-3xl font-extrabold text-morena-garnet w-8">
                  {i + 1}
                </span>

                <img
                  src={getImage(a.imagen)}
                  alt={a.titulo}
                  className="w-20 h-20 object-cover rounded-xl shadow"
                />

                <div className="flex-1">
                  <p className="font-semibold group-hover:underline line-clamp-2">
                    {a.titulo}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    💬 {a.comentarios || 100} comentarios
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArticulosMasLeidos;
