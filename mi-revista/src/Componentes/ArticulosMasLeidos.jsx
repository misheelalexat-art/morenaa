
import { useEffect, useState } from "react";

function ArticulosMasLeidos({ articulos }) {
  const [masVistos, setMasVistos] = useState([]);
  const [masGuardados, setMasGuardados] = useState([]);
  const [masComentados, setMasComentados] = useState([]);

  // ---- Cargar artículos vistos (simulados o que luego leerás de Firestore)
  useEffect(() => {
    const vistos = [...articulos]
      .sort((a, b) => (b.vistas || 0) - (a.vistas || 0))
      .slice(0, 5);

    setMasVistos(vistos);
  }, [articulos]);

  // ---- Artículos guardados en localStorage
  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favoritos")) || [];
    // Agarramos los 5 más guardados
    const ordenados = favs.slice(0, 5);
    setMasGuardados(ordenados);
  }, []);

  // ---- Artículos comentados (simulado hasta que implementes comentarios)
  useEffect(() => {
    const comentados = [...articulos]
      .sort((a, b) => (b.comentarios || 0) - (a.comentarios || 0))
      .slice(0, 5);

    setMasComentados(comentados);
  }, [articulos]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Artículos Más Leídos
      </h2>

      {/* MÁS VISTOS */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">🔥 Más vistos</h3>
        <div className="bg-white rounded-xl shadow p-4 border">
          {masVistos.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-4 py-2 border-b last:border-none"
            >
              <img
                src={a.imagen}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{a.titulo}</p>
                <p className="text-sm text-gray-600">{a.vistas || 0} vistas</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MÁS GUARDADOS */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-3">⭐ Más guardados</h3>
        <div className="bg-white rounded-xl shadow p-4 border">
          {masGuardados.length === 0 && (
            <p className="text-gray-500 text-sm">Aún no hay favoritos.</p>
          )}

          {masGuardados.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-4 py-2 border-b last:border-none"
            >
              <img
                src={a.image || a.imagen}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{a.title || a.titulo}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MÁS COMENTADOS (simulado) */}
      <section>
        <h3 className="text-xl font-semibold mb-3">💬 Más comentados</h3>
        <div className="bg-white rounded-xl shadow p-4 border">
          {masComentados.map((a) => (
            <div
              key={a.id}
              className="flex items-center gap-4 py-2 border-b last:border-none"
            >
              <img
                src={a.imagen}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <p className="font-semibold">{a.titulo}</p>
                <p className="text-sm text-gray-600">
                  {a.comentarios || 0} comentarios
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ArticulosMasLeidos;
