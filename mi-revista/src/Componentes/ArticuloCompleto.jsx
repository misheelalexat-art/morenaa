import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ArticulosData from "./ArticulosData";
import Recomendaciones from "./Recomendaciones";
import CompartirRedes from "./CompartirRedes";
import Comentarios from "./Comentarios";

function ArticuloCompleto() {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [likes, setLikes] = useState(0);

  const usuarioPremium = localStorage.getItem("usuarioPremium") === "true";

  useEffect(() => {
    const almacenados =
      JSON.parse(localStorage.getItem("articulos")) || ArticulosData;

    const encontrado = almacenados.find((a) => a.id === Number(id));
    if (!encontrado) return;

    setArticulo(encontrado);

    const actualizados = almacenados.map((a) =>
      a.id === encontrado.id
        ? { ...a, vistas: (a.vistas || 0) + 1 }
        : a
    );
    localStorage.setItem("articulos", JSON.stringify(actualizados));

    const likeData =
      JSON.parse(localStorage.getItem(`likes_${encontrado.id}`)) || {
        total: 0,
      };
    setLikes(likeData.total);

    window.scrollTo(0, 0);
  }, [id]);

  const manejarLike = () => {
    const nuevo = likes + 1;
    setLikes(nuevo);
    localStorage.setItem(
      `likes_${articulo.id}`,
      JSON.stringify({ total: nuevo })
    );
  };

  if (!articulo) return <p>Artículo no encontrado</p>;

  const esPremiumBloqueado = articulo.premium && !usuarioPremium;

  if (esPremiumBloqueado) {
    return (
      <div className="max-w-xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          🔒 Contenido Premium
        </h2>
        <p className="mb-6 text-gray-600">
          Suscríbete para acceder a este artículo exclusivo.
        </p>

        <button
          onClick={() => localStorage.setItem("usuarioPremium", "true")}
          className="bg-black text-white px-6 py-3 rounded-full font-semibold"
        >
          Activar Premium (demo)
        </button>

        <Link
          to="/articulos"
          className="block mt-6 text-blue-600 hover:underline"
        >
          ← Volver
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
    >
      {/* IMAGEN RESPONSIVE */}
      <img
        src={articulo.imagen}
        alt={articulo.titulo}
        className="w-full h-[220px] sm:h-[320px] lg:h-[420px] object-cover rounded-xl mb-6"
      />

      {/* TITULO */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
          {articulo.titulo}
        </h1>
        {articulo.premium && (
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
            Premium 🔒
          </span>
        )}
      </div>

      {/* DESCRIPCIÓN */}
      <p className="text-sm sm:text-base text-gray-700 italic mb-4">
        {articulo.descripcion}
      </p>

      {/* LIKE */}
      <button
        onClick={manejarLike}
        className="mb-4 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm"
      >
        ❤️ {likes}
      </button>

      {/* CONTENIDO */}
      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none mt-6">
        {articulo.contenido.split("\n").map((linea, i) => (
          <p key={i}>{linea}</p>
        ))}
      </div>

      {/* EXTRA */}
      <div className="mt-10 space-y-8">
        <CompartirRedes titulo={articulo.titulo} />
        <Comentarios articuloId={articulo.id} />
        <Recomendaciones categoria={articulo.categoria} />
      </div>

      <Link to="/articulos" className="inline-block mt-8 text-blue-600">
        ← Volver
      </Link>
    </motion.div>
  );
}

export default ArticuloCompleto;
