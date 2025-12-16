import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

// Componentes hijos
import ArticulosDelUsuario from "./ArticulosDelUsuario";

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
  const [articulos, setArticulos] = useState([]);
  const [cargandoArticulos, setCargandoArticulos] = useState(true);
  const [conversaciones, setConversaciones] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState("");

  // Lista más grande de siguiendo y seguidores
  const [siguiendo, setSiguiendo] = useState([
    { id: 1, nombre: "María", username: "maria12", foto: "/maria.jpg" },
    { id: 2, nombre: "Carlos", username: "carlos_90", foto: "/carlos.jpg" },
    { id: 3, nombre: "Lucía", username: "lucia22", foto: "/lucia.jpg" },
    { id: 4, nombre: "Pedro", username: "pedro33", foto: "/pedro.jpg" },
    { id: 5, nombre: "Ana", username: "ana99", foto: "/ana.jpg" },
  ]);

  const [seguidores, setSeguidores] = useState([
    { id: 1, nombre: "Luis", username: "luis23", foto: "/luis.jpg" },
    { id: 2, nombre: "Marta", username: "marta11", foto: "/marta.jpg" },
    { id: 3, nombre: "Javier", username: "javier77", foto: "/javier.jpg" },
    { id: 4, nombre: "Carla", username: "carla55", foto: "/carla.jpg" },
    { id: 5, nombre: "Diego", username: "diego88", foto: "/diego.jpg" },
  ]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "articulos"), (snap) => {
      const lista = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setArticulos(lista.filter(a => a.usuarioId === usuario.username));
      setCargandoArticulos(false);
    });
    return unsub;
  }, [usuario.username]);

  const guardarCambios = (data) => {
    setUsuario(data);
    setMostrarEditar(false);
  };

  const handleAgregarComentario = () => {
    if (!nuevoComentario) return;

    const comentario = {
      id: Date.now(),
      contenido: nuevoComentario,
      usuario: usuario.nombre,
      fecha: new Date().toLocaleDateString(),
    };

    setConversaciones([comentario, ...conversaciones]);
    setNuevoComentario("");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-xl mt-10 p-6">

      {/* ENCABEZADO */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-4">
          <img src={usuario.foto} className="w-20 h-20 rounded-full object-cover" />
          <div>
            <h2 className="text-2xl font-bold">{usuario.nombre}</h2>
            <p className="text-gray-500">@{usuario.username}</p>
            <p className="text-gray-400 text-sm">Se unió {usuario.fechaRegistro}</p>
            <p className="text-gray-600 text-sm mt-1">{usuario.bio}</p>
            <p className="text-gray-500 text-sm mt-1">
              <span className="font-bold">{siguiendo.length}</span> siguiendo · <span className="font-bold">{seguidores.length}</span> seguidores
            </p>
          </div>
        </div>
        <button
          onClick={() => setMostrarEditar(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Editar perfil
        </button>
      </div>

      {/* TABS */}
      <div className="border-b flex mb-4">
        <button
          onClick={() => setTab("info")}
          className={`flex-1 py-3 text-center ${tab === "info" ? "border-b-4 border-green-600 font-bold" : "text-gray-600"}`}
        >
          Info
        </button>
        <button
          onClick={() => setTab("conversaciones")}
          className={`flex-1 py-3 text-center ${tab === "conversaciones" ? "border-b-4 border-green-600 font-bold" : "text-gray-600"}`}
        >
          Conversaciones
        </button>
        <button
          onClick={() => setTab("siguiendo")}
          className={`flex-1 py-3 text-center ${tab === "siguiendo" ? "border-b-4 border-green-600 font-bold" : "text-gray-600"}`}
        >
          Siguiendo
        </button>
      </div>

      {/* TAB INFO */}
      {tab === "info" && (
        <div>
          <div className="mb-4 flex justify-end">
            <Link
              to="/perfil/articulos"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              ✏️ Crear artículo
            </Link>
          </div>
          {cargandoArticulos ? (
            <p className="text-gray-500">Cargando artículos...</p>
          ) : articulos.length === 0 ? (
            <p className="text-gray-500">Aún no hay artículos publicados.</p>
          ) : (
            <ul className="space-y-4">
              {articulos.map((art) => (
                <li key={art.id} className="p-4 border rounded-lg hover:shadow">
                  {art.portada && <img src={art.portada} className="w-full h-40 object-cover rounded mb-2" alt="portada" />}
                  <h4 className="font-bold">{art.titulo}</h4>
                  <p className="text-gray-600 text-sm">{art.descripcion}</p>
                  <p className="text-xs text-gray-500 mt-2">Categoría: {art.categoria}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* TAB CONVERSACIONES */}
      {tab === "conversaciones" && (
        <div>
          <h3 className="text-xl font-bold mb-4">Conversaciones</h3>

          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Escribe un comentario o crea un artículo..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              className="flex-1 border rounded-lg p-2"
            />
            <button
              onClick={handleAgregarComentario}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Publicar
            </button>
          </div>

          {conversaciones.length === 0 ? (
            <p className="text-gray-500">No hay comentarios ni artículos compartidos.</p>
          ) : (
            <ul className="space-y-4">
              {conversaciones.map((c) => (
                <li key={c.id} className="p-4 border rounded-lg bg-gray-50">
                  <p className="font-bold">{c.usuario}</p>
                  <p>{c.contenido}</p>
                  <p className="text-xs text-gray-500 mt-1">{c.fecha}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
{/* TAB SIGUIENDO */}
{tab === "siguiendo" && (
  <div>
    {/* Siguiendo */}
    <h3 className="text-xl font-bold mb-4">
      Siguiendo ({siguiendo.length})
    </h3>
    {siguiendo.length === 0 ? (
      <p className="text-gray-500">No sigue a nadie todavía.</p>
    ) : (
      <ul className="space-y-4 max-h-96 overflow-y-auto">
        {siguiendo.map((u) => (
          <li
            key={u.id}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <img
              src={u.foto}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold">{u.nombre}</p>
              <p className="text-gray-500 text-sm">@{u.username}</p>
            </div>
          </li>
        ))}
      </ul>
    )}

    {/* Seguidores */}
    <h3 className="text-xl font-bold mt-6 mb-4">
      Seguidores ({seguidores.length})
    </h3>
    {seguidores.length === 0 ? (
      <p className="text-gray-500">Aún no tienes seguidores.</p>
    ) : (
      <ul className="space-y-4 max-h-96 overflow-y-auto">
        {seguidores.map((u) => (
          <li
            key={u.id}
            className="flex items-center gap-3 p-3 border rounded-lg"
          >
            <img
              src={u.foto}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-bold">{u.nombre}</p>
              <p className="text-gray-500 text-sm">@{u.username}</p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
)}


      {/* MODAL EDITAR PERFIL */}
      {mostrarEditar && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Editar Perfil</h2>
            <FormularioEditar usuario={usuario} onClose={() => setMostrarEditar(false)} onGuardar={guardarCambios} />
          </div>
        </div>
      )}
    </div>
  );
}

function FormularioEditar({ usuario, onClose, onGuardar }) {
  const [formData, setFormData] = useState(usuario);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <label className="block mb-3">
        <span className="text-sm font-bold">Foto (URL)</span>
        <input type="text" name="foto" value={formData.foto} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
      </label>
      <label className="block mb-3">
        <span className="text-sm font-bold">Nombre</span>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
      </label>
      <label className="block mb-3">
        <span className="text-sm font-bold">Username</span>
        <input type="text" name="username" value={formData.username} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
      </label>
      <label className="block mb-3">
        <span className="text-sm font-bold">Bio</span>
        <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full border p-2 rounded mt-1" />
      </label>
      <div className="flex justify-end gap-4 mt-4">
        <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">Cancelar</button>
        <button onClick={() => onGuardar(formData)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Guardar</button>
      </div>
    </>
  );
}

export default UserProfileTabs;
