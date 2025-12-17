import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function CrearArticulo() {
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tags, setTags] = useState("");
  const [mensaje, setMensaje] = useState("");

  // Contenido
  const [editableContenido, setEditableContenido] = useState("");

  const categorias = [
    "Moda Morena",
    "Belleza y Skin Care",
    "Autoestima",
    "Cultura Latina",
    "Tendencias",
    "Estilo de Vida",
  ];

  // PUBLICAR ARTÍCULO (FIRESTORE SIN STORAGE)
  const publicarArticulo = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Debes iniciar sesión");

    if (!titulo || !editableContenido || !categoria) {
      return setMensaje("❌ Completa título, contenido y categoría");
    }

    await addDoc(collection(db, "articulos"), {
      titulo,
      contenido: editableContenido,
      descripcion: editableContenido.slice(0, 120) + "...",
      categoria,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      autorId: user.uid,
      fecha: serverTimestamp(),
      vistas: 0,
      likes: 0,
      estado: "publicado",
    });

    setMensaje("✔ Artículo publicado");

    // Limpiar formulario
    setTitulo("");
    setEditableContenido("");
    setCategoria("");
    setTags("");
  };

  // Guardar borrador en localStorage
  useEffect(() => {
    localStorage.setItem(
      "borradorArticulo",
      JSON.stringify({ titulo, editableContenido, categoria, tags })
    );
  }, [titulo, editableContenido, categoria, tags]);

  // Cargar borrador
  useEffect(() => {
    const draft = localStorage.getItem("borradorArticulo");
    if (draft) {
      const d = JSON.parse(draft);
      setTitulo(d.titulo || "");
      setEditableContenido(d.editableContenido || "");
      setCategoria(d.categoria || "");
      setTags(d.tags || "");
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-center">
        ✍️ Publicar artículo
      </h1>

      {mensaje && (
        <p
          className={`text-center mb-4 font-semibold ${
            mensaje.includes("✔") ? "text-green-600" : "text-red-600"
          }`}
        >
          {mensaje}
        </p>
      )}

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        maxLength={80}
      />
      <p className="text-xs text-gray-500 mb-4">
        {titulo.length}/80 caracteres
      </p>

      <select
        className="w-full border p-2 rounded mb-4"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Selecciona categoría</option>
        {categorias.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <textarea
        className="w-full border p-2 rounded mb-4 h-48"
        placeholder="Contenido del artículo"
        value={editableContenido}
        onChange={(e) => setEditableContenido(e.target.value)}
      />

      <p className="text-sm text-gray-500 mb-4">
        Palabras:{" "}
        {editableContenido.trim()
          ? editableContenido.trim().split(/\s+/).length
          : 0}
      </p>

      <input
        className="w-full border p-2 rounded mb-6"
        placeholder="Tags (moda, autoestima...)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button
        onClick={publicarArticulo}
        className="w-full py-2 rounded font-semibold bg-black text-white hover:bg-gray-800"
      >
        Publicar artículo
      </button>
    </div>
  );
}

export default CrearArticulo;
