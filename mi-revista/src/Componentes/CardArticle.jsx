import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CardArticle({ articulo }) {
  const navigate = useNavigate();

  const usuarioPremium = false; // Simulación: cambiar a true si el usuario tiene suscripción

const manejarClick = () => {
  const esPremium = articulo.premium;
  const usuarioPremium = localStorage.getItem("usuarioPremium") === "true";

  if (esPremium && !usuarioPremium) {
    alert("🔒 Este artículo es premium. Suscríbete para acceder 💜");
    return;
  }

  // actualizar vistas
  const guardados = JSON.parse(localStorage.getItem("articulos")) || [];
  const actualizados = guardados.map((a) =>
    a.id === articulo.id ? { ...a, vistas: (a.vistas || 0) + 1 } : a
  );
  localStorage.setItem("articulos", JSON.stringify(actualizados));

  navigate(`/articulo/${articulo.id}`);
};

  return (
    <motion.article
      onClick={manejarClick}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.25 }}
      className="cursor-pointer bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden flex flex-col group relative"
    >
      {articulo.premium && (
        <div className="absolute top-4 right-4 z-10 bg-black text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          🔒 Premium
        </div>
      )}

      <div className="relative">
        <img
          src={articulo.imagen}
          alt={articulo.titulo}
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {articulo.categoria && (
          <span className="absolute top-4 left-4 bg-[#41644A] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
            {articulo.categoria}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h2 className="text-2xl font-extrabold leading-snug mb-3">{articulo.titulo}</h2>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1 mb-2">
          {articulo.descripcion}
        </p>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {articulo.contenido}
        </p>

        <div className="mt-5 flex items-center justify-between text-xs">
          <span className="text-gray-400">👁 {articulo.vistas || 0} vistas</span>
          <span className="font-bold text-[#41644A] group-hover:underline">Leer artículo →</span>
        </div>
      </div>
    </motion.article>
  );
}

export default CardArticle;
