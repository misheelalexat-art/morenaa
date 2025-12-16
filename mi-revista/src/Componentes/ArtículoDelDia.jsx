// src/Componentes/ArticuloDelDia.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function ArticuloDelDia({ articulos }) {
  const [articuloDelDia, setArticuloDelDia] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [vistas, setVistas] = useState(0);

  // 🎯 Elegir artículo del día
  useEffect(() => {
    if (!articulos?.length) return;

    const hoy = new Date().toDateString();
    const fecha = localStorage.getItem("articuloDia_fecha");
    const id = localStorage.getItem("articuloDia_id");

    if (fecha === hoy && id) {
      const art = articulos.find((a) => a.id === parseInt(id));
      if (art) return setArticuloDelDia(art);
    }

    const elegido = articulos[Math.floor(Math.random() * articulos.length)];
    localStorage.setItem("articuloDia_fecha", hoy);
    localStorage.setItem("articuloDia_id", elegido.id);
    setArticuloDelDia(elegido);
  }, [articulos]);

  // 📊 Likes, comentarios y vistas
  useEffect(() => {
    if (!articuloDelDia) return;

    const likeData =
      JSON.parse(localStorage.getItem(`likes_${articuloDelDia.id}`)) || {
        total: 0,
        liked: false,
      };

    setLikes(likeData.total);
    setLiked(likeData.liked);

    setComentarios(
      JSON.parse(
        localStorage.getItem(`comentarios_${articuloDelDia.id}`)
      ) || []
    );

    const v =
      parseInt(
        localStorage.getItem(`vistas_${articuloDelDia.id}`)
      ) || 0;

    localStorage.setItem(`vistas_${articuloDelDia.id}`, v + 1);
    setVistas(v + 1);
  }, [articuloDelDia]);

  const toggleLike = () => {
    const total = liked ? likes - 1 : likes + 1;
    setLikes(total);
    setLiked(!liked);

    localStorage.setItem(
      `likes_${articuloDelDia.id}`,
      JSON.stringify({ total, liked: !liked })
    );
  };

  const agregarComentario = () => {
    if (!nuevoComentario.trim()) return;

    const nuevos = [
      ...comentarios,
      {
        texto: nuevoComentario,
        fecha: new Date().toLocaleDateString(),
      },
    ];

    setComentarios(nuevos);
    localStorage.setItem(
      `comentarios_${articuloDelDia.id}`,
      JSON.stringify(nuevos)
    );
    setNuevoComentario("");
  };

  if (!articuloDelDia) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-5xl mx-auto mb-16"
    >
      <h2 className="text-4xl font-extrabold text-center mb-8 text-yellow-400 drop-shadow">
        ⭐ Artículo del Día ⭐
      </h2>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Imagen */}
        <div className="relative">
          <img
            src={articuloDelDia.imagen}
            alt={articuloDelDia.titulo}
            className="w-full h-72 md:h-96 object-cover"
          />

          {/* Categoría */}
          {articuloDelDia.categoria && (
            <span className="absolute top-4 left-4 bg-yellow-400 text-black font-bold px-4 py-1 rounded-full shadow">
              {articuloDelDia.categoria}
            </span>
          )}
        </div>

        {/* Contenido */}
        <div className="p-8">
          <p className="text-sm text-gray-500 mb-2">
            👀 {vistas} vistas
          </p>

          <h3 className="text-3xl font-extrabold leading-tight">
            {articuloDelDia.titulo}
          </h3>

          {/* Likes */}
          <button
            onClick={toggleLike}
            className={`mt-4 flex items-center gap-2 font-semibold transition ${
              liked ? "text-red-600" : "text-gray-400 hover:text-red-400"
            }`}
          >
            ❤️ {likes} me gusta
          </button>

          <p className="text-gray-700 mt-6 leading-relaxed text-lg">
            {articuloDelDia.descripcion}
          </p>

          <Link
            to={`/articulo/${articuloDelDia.id}`}
            className="inline-block mt-6 bg-[#41644A] text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition"
          >
            Leer artículo completo →
          </Link>

          {/* 💬 Comentarios rápidos */}
          <div className="mt-10">
            <h4 className="font-bold mb-4 text-lg">💬 Comentarios</h4>

            {comentarios.length === 0 && (
              <p className="text-sm text-gray-400">
                Sé la primera en comentar 💖
              </p>
            )}

            {comentarios.map((c, i) => (
              <div key={i} className="border-b py-2 text-sm">
                {c.texto}
                <span className="block text-xs text-gray-400">
                  {c.fecha}
                </span>
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <input
                className="flex-1 border rounded-full p-3 text-sm"
                placeholder="Escribe un comentario bonito..."
                value={nuevoComentario}
                onChange={(e) => setNuevoComentario(e.target.value)}
              />
              <button
                onClick={agregarComentario}
                className="bg-yellow-400 text-black px-5 rounded-full font-bold hover:bg-yellow-500"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default ArticuloDelDia;
