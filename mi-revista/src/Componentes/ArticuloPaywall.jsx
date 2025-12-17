import { Link } from "react-router-dom";

export default function ArticuloPaywall({ articulo, usuarioPremium = false }) {
  // 🤝 Aviso patrocinado
  if (articulo?.patrocinado) {
    return (
      <div className="mb-6 bg-morena-cream p-4 rounded-2xl text-sm text-gray-700">
        🤝 Este artículo es patrocinado.  
        Al leerlo apoyas a Revista Morena 💖
      </div>
    );
  }

  // 🔒 Bloque premium
  if (articulo?.premium && !usuarioPremium) {
    return (
      <div className="max-w-3xl mx-auto mt-20 p-10 text-center bg-white rounded-3xl shadow-lg">
        <h2 className="text-3xl font-romance mb-4">
          🔒 Contenido Premium
        </h2>

        <p className="text-gray-600 mb-6">
          Este artículo es exclusivo para miembros Morena.
        </p>

        <p className="font-semibold mb-6">
          Accede por solo <span className="text-morena-garnet">
            S/ {articulo.precio || 5}
          </span>
        </p>

        <button className="bg-black text-white px-8 py-3 rounded-full hover:scale-105 transition">
          Desbloquear ahora
        </button>

        <p className="mt-4 text-sm text-gray-500">
          o <Link to="/registrarse" className="underline">hazte miembro</Link>
        </p>
      </div>
    );
  }

  // ✅ Si no es premium o el usuario ya pagó
  return null;
}
