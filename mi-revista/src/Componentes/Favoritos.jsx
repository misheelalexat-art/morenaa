import { useEffect, useState } from "react";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  // Cargar favoritos desde localStorage
  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(almacenados);
  }, []);

  // Eliminar un artículo
  const eliminarFavorito = (id) => {
    const nuevos = favoritos.filter((f) => f.id !== id);
    setFavoritos(nuevos);
    localStorage.setItem("favoritos", JSON.stringify(nuevos));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">⭐ Mis Favoritos</h1>

      {favoritos.length === 0 ? (
        <p className="text-center text-gray-600">
          Aún no has guardado artículos.  
          Agrega algunos con el botón ⭐
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {favoritos.map((art) => (
            <div
              key={art.id}
              className="bg-white shadow rounded-xl overflow-hidden border"
            >
              <img
                src={art.imagen}
                alt={art.titulo}
                className="w-full h-40 object-cover"
              />

              <div className="p-4">
                <p className="text-sm text-gray-500">{art.categoria}</p>

                <h3 className="text-lg font-semibold">{art.titulo}</h3>

                <p className="text-gray-700 text-sm mt-2">
                  {art.descripcion}
                </p>

                <button
                  onClick={() => eliminarFavorito(art.id)}
                  className="mt-4 text-red-600 hover:underline"
                >
                  Quitar de favoritos ✖
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
