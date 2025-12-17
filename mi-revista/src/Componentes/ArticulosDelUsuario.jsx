import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function ArticulosDelUsuario() {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();
  const user = auth.currentUser;

  // 🔥 Traer TODOS los artículos
  useEffect(() => {
    const q = query(collection(db, "articulos"));

    const unsub = onSnapshot(q, (snap) => {
      const lista = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setArticulos(lista);
      setCargando(false);
    });

    return unsub;
  }, []);

  // 🗑 Eliminar artículo
  const eliminarArticulo = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este artículo?"
    );

    if (!confirmar) return;

    try {
      await deleteDoc(doc(db, "articulos", id));
      alert("Artículo eliminado 🗑️");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar");
    }
  };

  if (cargando) return <p className="text-center">Cargando artículos...</p>;

  return (
    <div className="mt-10 max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-extrabold mb-6">
        📚 Todos los artículos publicados
      </h2>

      {articulos.length === 0 ? (
        <p className="text-gray-600">No hay artículos aún.</p>
      ) : (
        articulos.map((a) => (
          <div
            key={a.id}
            className="bg-white p-6 border rounded-2xl mb-6 shadow-sm"
          >
            <h3 className="font-bold text-xl mb-2">{a.titulo}</h3>

            <p className="text-sm text-gray-700 line-clamp-3">
              {a.descripcion}
            </p>

            <p className="text-xs mt-2 text-gray-500">
              Categoría: {a.categoria}
            </p>

            <div className="flex gap-6 mt-4 text-sm font-semibold">
              <button
                className="text-green-700 hover:underline"
                onClick={() => navigate(`/articulo/${a.id}`)}
              >
                👁 Ver
              </button>

              {user?.uid === a.autorId && (
                <>
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
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ArticulosDelUsuario;
