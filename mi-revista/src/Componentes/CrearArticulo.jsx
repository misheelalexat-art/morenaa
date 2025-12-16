import { useState, useEffect } from "react";
import { db, auth, storage } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function CrearArticulo() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tags, setTags] = useState("");
  const [mensaje, setMensaje] = useState("");

  // IMAGEN
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [subiendo, setSubiendo] = useState(false);

  const categorias = [
    "Moda Morena",
    "Belleza y Skin Care",
    "Autoestima",
    "Cultura Latina",
    "Tendencias",
    "Estilo de Vida",
  ];

  // Editor de texto rico (básico)
  const [editableContenido, setEditableContenido] = useState("");

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const subirImagen = () => {
    return new Promise((resolve) => {
      if (!file) return resolve(null);

      const uid = auth.currentUser.uid;
      const imgRef = ref(
        storage,
        `portadas/${uid}_${Date.now()}_${file.name}`
      );

      const uploadTask = uploadBytesResumable(imgRef, file);
      setSubiendo(true);

      uploadTask.on(
        "state_changed",
        (snap) => {
          setProgreso(
            Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
          );
        },
        (err) => {
          console.error(err);
          setSubiendo(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setSubiendo(false);
          resolve(url);
        }
      );
    });
  };

  const publicarArticulo = async () => {
    if (!titulo || !contenido || !categoria || !file) {
      setMensaje("❗ Completa los campos obligatorios");
      return;
    }

    const user = auth.currentUser;
    if (!user) return alert("Debes iniciar sesión");

    const portadaURL = await subirImagen();

    await addDoc(collection(db, "articulos"), {
      titulo,
      contenido: editableContenido,
      descripcion: editableContenido.slice(0, 120) + "...",
      categoria,
      tags: tags ? tags.split(",").map((t) => t.trim()) : [],
      portada: portadaURL,
      autorId: user.uid,
      fecha: serverTimestamp(),
      vistas: 0,
      likes: 0,
      estado: "publicado", // Estado del artículo
    });

    setMensaje("✔ Artículo publicado");
    setTitulo("");
    setContenido("");
    setCategoria("");
    setTags("");
    setFile(null);
    setPreview(null);
    setProgreso(0);
    setEditableContenido(""); // Limpia el contenido
  };

  // Guardar borrador en localStorage
  useEffect(() => {
    localStorage.setItem(
      "borradorArticulo",
      JSON.stringify({ titulo, contenido, categoria, tags })
    );
  }, [titulo, contenido, categoria, tags]);

  // Cargar borrador al inicio
  useEffect(() => {
    const draft = localStorage.getItem("borradorArticulo");
    if (draft) {
      const d = JSON.parse(draft);
      setTitulo(d.titulo || "");
      setContenido(d.contenido || "");
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
      <p className="text-xs text-gray-500">{titulo.length}/80 caracteres</p>

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

      {/* Editor de texto rico */}
      <textarea
        className="w-full border p-2 rounded mb-4 h-40"
        placeholder="Contenido del artículo"
        value={editableContenido}
        onChange={(e) => setEditableContenido(e.target.value)}
      />

      <p className="text-sm text-gray-500 mb-2">
        Palabras: {editableContenido.trim().split(/\s+/).length}
      </p>

      <input
        className="w-full border p-2 rounded mb-4"
        placeholder="Tags (moda, autoestima...)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* Subir portada */}
      <label className="block border-2 border-dashed p-6 text-center rounded cursor-pointer hover:bg-gray-50">
        {file ? "Cambiar portada" : "Subir portada"}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      {subiendo && (
        <p className="text-sm mb-4">Subiendo imagen: {progreso}%</p>
      )}

      {/* Botón de publicación */}
      <button
        onClick={publicarArticulo}
        disabled={subiendo}
        className={`w-full py-2 rounded font-semibold ${
          subiendo
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {subiendo ? "Publicando..." : "Publicar artículo"}
      </button>
    </div>
  );
}

export default CrearArticulo;
