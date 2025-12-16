import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Recomendaciones from "./Recomendaciones";
import CompartirRedes from "./CompartirRedes";
import Comentarios from "./Comentarios";

function ArticuloCompleto() {
  const { id } = useParams();
  const [articulo, setArticulo] = useState(null);
  const [likes, setLikes] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

  useEffect(() => {
    const almacenados = JSON.parse(localStorage.getItem("articulos")) || [];
    const encontrado = almacenados.find((a) => a.id === Number(id));
    setArticulo(encontrado);

    if (!encontrado) return;

  const likeData =
  JSON.parse(localStorage.getItem(`likes_${encontrado.id}`)) || {
    total: 0,
    liked: false,
  };

setLikes(likeData.total);


    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setEsFavorito(favoritos.some((f) => f.id === encontrado.id));

    window.scrollTo(0, 0);
  }, [id]);

  if (!articulo)
    return <p className="text-center mt-10">Artículo no encontrado</p>;

  const manejarLike = () => {
    const nuevo = likes + 1;
    setLikes(nuevo);
    localStorage.setItem(`likes_${articulo.id}`, JSON.stringify(nuevo));
  };

  const manejarFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (esFavorito) {
      const filtrados = favoritos.filter((f) => f.id !== articulo.id);
      localStorage.setItem("favoritos", JSON.stringify(filtrados));
      setEsFavorito(false);
    } else {
      favoritos.push(articulo);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      setEsFavorito(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* Imagen principal */}
      <div className="relative mb-8">
        <img
          src={articulo.imagen}
          alt={articulo.titulo}
          className="w-full h-80 object-cover rounded-2xl shadow-lg"
        />

        {/* Categoría */}
        {articulo.categoria && (
          <span className="absolute top-4 left-4 bg-yellow-400 text-black font-bold px-4 py-1 rounded-full shadow">
            {articulo.categoria}
          </span>
        )}
      </div>

      {/* Título */}
      <h1 className="text-4xl font-extrabold leading-tight mb-2">
        {articulo.titulo}
      </h1>

      {/* Autor */}
      <p className="text-sm text-gray-500 mb-6">
        ✍ {articulo.autor || "Equipo Morena"} · {articulo.fecha}
      </p>

      {/* Acciones */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button
          onClick={manejarLike}
          className="px-5 py-2 rounded-full bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
        >
          ❤️ Me gusta ({likes})
        </button>

        <button
          onClick={manejarFavorito}
          className={`px-5 py-2 rounded-full font-semibold transition ${
            esFavorito
              ? "bg-yellow-400 text-black"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {esFavorito ? "⭐ En favoritos" : "☆ Guardar"}
        </button>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-8">
        {articulo.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-[#41644A]/10 text-[#41644A] rounded-full text-sm font-medium"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Contenido */}
      <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        {articulo.contenido}
      </article>

      {/* Compartir */}
      <div className="mt-10">
        <CompartirRedes titulo={articulo.titulo} />
      </div>

      {/* Comentarios */}
      <div className="mt-14">
        <Comentarios articuloId={id} />
      </div>

      {/* Recomendaciones */}
      <div className="mt-16">
        <Recomendaciones
          categoria={articulo.categoria}
          idActual={articulo.id}
        />
      </div>

      {/* Volver */}
      <Link
        to="/articulos"
        className="block mt-16 text-center text-[#41644A] font-semibold hover:underline"
      >
        ← Volver a artículos
      </Link>
    </motion.div>
  );
}

export default ArticuloCompleto;
