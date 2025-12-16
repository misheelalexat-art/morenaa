// src/Componentes/Recomendaciones.jsx
import { Link } from "react-router-dom";

function Recomendaciones({ articulos, categoria, idActual }) {
  if (!articulos || articulos.length === 0) return null;

  // 1. Artículos de la misma categoría (excepto el actual)
  let recomendados = articulos
    .filter((a) => a.categoria === categoria && a.id !== idActual)
    .slice(0, 3);

  // 2. Si faltan → completar con artículos de otras categorías
  if (recomendados.length < 3) {
    const faltan = 3 - recomendados.length;

    const extras = articulos
      .filter((a) => a.id !== idActual && a.categoria !== categoria)
      .sort(() => Math.random() - 0.5)
      .slice(0, faltan);

    recomendados = [...recomendados, ...extras];
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-4">✨ Quizás te interese</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recomendados.map((art) => (
          <Link
            key={art.id}
            to={`/articulo/${art.id}`}
            className="block p-4 border rounded-xl bg-white shadow hover:shadow-lg transition"
          >
            <img
              src={art.imagen}
              alt={art.titulo}
              className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-lg">{art.titulo}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              {art.descripcion}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recomendaciones;
