import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

function UserProfileTabs() {
  const [usuario, setUsuario] = useState({
    nombre: "Ale_xaxa",
    username: "alexad4vd",
    foto: "/foto.jpg",
    fechaRegistro: "enero 2022",
    bio: "Amante de la poesía 💚",
  });

  const [tab, setTab] = useState("info");
  const [mostrarEditar, setMostrarEditar] = useState(false);

  // 🔥 ARTÍCULOS GENERALES
  const [articulos, setArticulos] = useState([]);
  const [cargandoArticulos, setCargandoArticulos] = useState(true);

  const [conversaciones, setConversaciones] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  const [siguiendo] = useState([
    { id: 1, nombre: "María", username: "maria12", foto: "/maria.jpg" },
    { id: 2, nombre: "Carlos", username: "carlos_90", foto: "/carlos.jpg" },
    { id: 3, nombre: "Lucía", username: "lucia22", foto: "/lucia.jpg" },
  ]);

  const [seguidores] = useState([
    { id: 1, nombre: "Luis", username: "luis23", foto: "/luis.jpg" },
    { id: 2, nombre: "Marta", username: "marta11", foto: "/marta.jpg" },
  ]);

  // 🔥 TRAER TODOS LOS ARTÍCULOS (SIN FILTRO)
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "articulos"), (snap) => {
      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Artículos cargados:", lista.length);
      setArticulos(lista);
      setCargandoArticulos(false);
    });

    return () => unsub();
  }, []);

  const guardarCambios = (data) => {
    setUsuario(data);
    setMostrarEditar(false);
  };

  const handleAgregarComentario = () => {
    if (!nuevoComentario.trim()) return;

    setConversaciones([
      {
        id: Date.now(),
        contenido: nuevoComentario,
        usuario: usuario.nombre,
        fecha: new Date().toLocaleDateString(),
      },
      ...conversaciones,
    ]);

    setNuevoComentario("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl mt-10 p-6">

      {/* ENCABEZADO */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-4">
          <img
            src={usuario.foto}
            className="w-20 h-20 rounded-full object-cover"
            alt="perfil"
          />
          <div>
            <h2 className="text-2xl font-bold">{usuario.nombre}</h2>
            <p className="text-gray-500">@{usuario.username}</p>
            <p className="text-gray-400 text-sm">Se unió {usuario.fechaRegistro}</p>
            <p className="text-gray-600 text-sm mt-1">{usuario.bio}</p>
            <p className="text-gray-500 text-sm mt-1">
              <b>{siguiendo.length}</b> siguiendo ·{" "}
              <b>{seguidores.length}</b> seguidores
            </p>
          </div>
        </div>

        <button
          onClick={() => setMostrarEditar(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Editar perfil
        </button>
      </div>

      {/* TABS */}
      <div className="border-b flex mb-4">
        {["info", "conversaciones", "siguiendo"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 ${
              tab === t
                ? "border-b-4 border-green-600 font-bold"
                : "text-gray-600"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* TAB INFO */}
      {tab === "info" && (
        <>
          <div className="mb-4 flex justify-end">
            <Link
              to="/perfil/articulos"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
            >
              ✏️ Crear artículo
            </Link>
          </div>

          {cargandoArticulos ? (
            <p className="text-gray-500">Cargando artículos...</p>
          ) : articulos.length === 0 ? (
            <p className="text-gray-500">No hay artículos publicados.</p>
          ) : (
            <ul className="space-y-4">
              {articulos.map((art) => (
                <li key={art.id} className="p-4 border rounded-lg hover:shadow">
                  <h4 className="font-bold text-lg">{art.titulo}</h4>
                  <p className="text-gray-600 text-sm">{art.descripcion}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Categoría: {art.categoria}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {/* TAB CONVERSACIONES */}
      {tab === "conversaciones" && (
        <>
          <div className="flex gap-2 mb-4">
            <input
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              className="flex-1 border rounded p-2"
              placeholder="Escribe algo..."
            />
            <button
              onClick={handleAgregarComentario}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Publicar
            </button>
          </div>

          {conversaciones.map((c) => (
            <div key={c.id} className="p-3 border rounded mb-2">
              <b>{c.usuario}</b>
              <p>{c.contenido}</p>
              <span className="text-xs text-gray-500">{c.fecha}</span>
            </div>
          ))}
        </>
      )}

      {/* TAB SIGUIENDO */}
      {tab === "siguiendo" && (
        <>
          {[...siguiendo, ...seguidores].map((u) => (
            <div key={u.id} className="flex gap-3 p-2 border rounded mb-2">
              <img
                src={u.foto}
                className="w-10 h-10 rounded-full"
                alt=""
              />
              <div>
                <p className="font-bold">{u.nombre}</p>
                <p className="text-xs text-gray-500">@{u.username}</p>
              </div>
            </div>
          ))}
        </>
      )}

      {/* MODAL EDITAR */}
      {mostrarEditar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <FormularioEditar
              usuario={usuario}
              onGuardar={guardarCambios}
              onClose={() => setMostrarEditar(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function FormularioEditar({ usuario, onGuardar, onClose }) {
  const [form, setForm] = useState(usuario);

  return (
    <>
      {["foto", "nombre", "username"].map((f) => (
        <input
          key={f}
          className="w-full border p-2 rounded mb-3"
          value={form[f]}
          onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          placeholder={f}
        />
      ))}

      <textarea
        className="w-full border p-2 rounded mb-3"
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
      />

      <div className="flex justify-end gap-4">
        <button onClick={onClose}>Cancelar</button>
        <button
          onClick={() => onGuardar(form)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Guardar
        </button>
      </div>
    </>
  );
}

export default UserProfileTabs;
