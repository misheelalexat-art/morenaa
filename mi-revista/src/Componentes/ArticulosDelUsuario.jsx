import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ArticulosDelUsuario() {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 1️⃣ Detectar usuario logueado
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return unsub;
  }, []);

  // 2️⃣ Traer artículos del usuario
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "articulos"),
      where("autor", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticulos(lista);
      setCargando(false);
    });

    return unsub;
  }, [user]);

  // 🗑 Eliminar artículo
  const eliminarArticulo = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este artículo? Esta acción no se puede deshacer."
    );

    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "articulos", id));
      alert("Artículo eliminado correctamente 🗑️");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el artículo");
    }
  };

  if (cargando) return <p>Cargando artículos...</p>;

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h2 className="text-2xl font-extrabold mb-6">
        📝 Mis artículos publicados
      </h2>

      {articulos.length === 0 ? (
        <p className="text-gray-600">
          Aún no has publicado ningún artículo.
        </p>
      ) : (
        articulos.map((a) => (
          <div
            key={a.id}
            className="bg-white p-5 border rounded-2xl mb-6 shadow-sm"
          >
            {a.portada && (
              <img
                src={a.portada}
                alt="portada"
                className="w-full h-48 object-cover rounded-xl mb-3"
              />
            )}

            <h3 className="font-bold text-xl mb-1">{a.titulo}</h3>

            <p className="text-sm text-gray-700 line-clamp-3">
              {a.descripcion}
            </p>

            <p className="text-xs mt-2 text-gray-500">
              Categoría: {a.categoria}
            </p>

            {/* 🎯 ACCIONES */}
            <div className="flex gap-5 mt-4 text-sm font-semibold">
              <button
                className="text-green-700 hover:underline"
                onClick={() => navigate(`/articulo/${a.id}`)}
              >
                👁 Ver
              </button>

              <button
                className="text-blue-600 hover:underline"
                onClick={() => navigate(`/editar-articulo/${a.id}`)}
              >
                ✏️ Editar
              </button>

              <button
                className="text-red-600 hover:underline"
                onClick={() => eliminarArticulo(a.id)}
              >
                🗑 Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ArticulosDelUsuario;
