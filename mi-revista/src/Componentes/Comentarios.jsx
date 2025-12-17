import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  serverTimestamp,
  where,
  orderBy,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  getDocs,
  limit,
  startAfter,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

function Comentarios({ articuloId, autorUid }) {
  const auth = getAuth();

  const [comentario, setComentario] = useState("");
  const [lista, setLista] = useState([]);
  const [nombreLocal, setNombreLocal] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [lastVisible, setLastVisible] = useState(null);
  const [cargandoMas, setCargandoMas] = useState(false);
  const [respondiendoA, setRespondiendoA] = useState(null);
  const [alerta, setAlerta] = useState(null); // ✅ Nueva alerta

  // 🔄 Borrador + nombre
  useEffect(() => {
    const borrador = localStorage.getItem(`coment_temp_${articuloId}`);
    if (borrador) setComentario(borrador);

    const nombre = localStorage.getItem("nombre_usuario_local");
    if (nombre) setNombreLocal(nombre);
  }, [articuloId]);

  useEffect(() => {
    localStorage.setItem(`coment_temp_${articuloId}`, comentario);
  }, [comentario, articuloId]);

  // 🔥 Realtime
  useEffect(() => {
    if (!articuloId) return;

    const q = query(
      collection(db, "comentarios"),
      where("articuloId", "==", articuloId),
      orderBy("fecha", "desc"),
      limit(8)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setLista(data);
      setLastVisible(snap.docs[snap.docs.length - 1]);
    });

    return () => unsub();
  }, [articuloId]);

  // ✍️ Enviar con alertas
  const enviarComentario = async () => {
    if (!comentario.trim()) {
      setAlerta({ tipo: "error", mensaje: "No puedes enviar un comentario vacío." });
      setTimeout(() => setAlerta(null), 3000);
      return;
    }

    try {
      const user = auth.currentUser;
      const nombreFinal = user?.displayName || nombreLocal || "Visitante";

      localStorage.setItem("nombre_usuario_local", nombreFinal);

      await addDoc(collection(db, "comentarios"), {
        texto: comentario,
        articuloId,
        usuario: nombreFinal,
        uid: user?.uid || null,
        foto: user?.photoURL || null,
        parentId: respondiendoA,
        fecha: serverTimestamp(),
        likes: [],
      });

      setComentario("");
      setRespondiendoA(null);
      localStorage.removeItem(`coment_temp_${articuloId}`);

      setAlerta({ tipo: "success", mensaje: "¡Comentario publicado correctamente!" });
      setTimeout(() => setAlerta(null), 3000);
    } catch (err) {
      console.error(err);
      setAlerta({ tipo: "error", mensaje: "Ocurrió un error al enviar tu comentario." });
      setTimeout(() => setAlerta(null), 3000);
    }
  };

  // ✏️ Editar
  const guardarEdicion = async (id) => {
    await updateDoc(doc(db, "comentarios", id), { texto: editText });
    setEditId(null);
    setEditText("");
  };

  // 🗑 Eliminar
  const eliminarComentario = async (id, uid) => {
    if (auth.currentUser?.uid !== uid) return;
    await deleteDoc(doc(db, "comentarios", id));
  };

  // 👍 Like
  const toggleLike = async (id, likes = []) => {
    if (!auth.currentUser) {
      setAlerta({ tipo: "error", mensaje: "Inicia sesión para dar like." });
      setTimeout(() => setAlerta(null), 3000);
      return;
    }

    const ref = doc(db, "comentarios", id);
    likes.includes(auth.currentUser.uid)
      ? await updateDoc(ref, { likes: arrayRemove(auth.currentUser.uid) })
      : await updateDoc(ref, { likes: arrayUnion(auth.currentUser.uid) });
  };

  // ⬇️ Más
  const cargarMas = async () => {
    if (!lastVisible) return;
    setCargandoMas(true);

    const q = query(
      collection(db, "comentarios"),
      where("articuloId", "==", articuloId),
      orderBy("fecha", "desc"),
      startAfter(lastVisible),
      limit(8)
    );

    const snap = await getDocs(q);
    setLista((prev) => [...prev, ...snap.docs.map((d) => ({ id: d.id, ...d.data() }))]);
    setLastVisible(snap.docs[snap.docs.length - 1] || null);
    setCargandoMas(false);
  };

  // 🧩 Render recursivo
  const renderComentarios = (parentId = null, nivel = 0) =>
    lista
      .filter((c) => c.parentId === parentId)
      .map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-white border border-[#E6D3A3] p-4 rounded-2xl shadow-sm mb-4 ${
            nivel ? "ml-6" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <img
              src={
                c.foto ||
                `https://avatars.dicebear.com/api/initials/${c.usuario}.svg`
              }
              className="w-8 h-8 rounded-full object-cover"
            />

            <span className="font-bold text-[#41644A]">{c.usuario}</span>

            {c.uid === autorUid && (
              <span className="text-xs bg-[#E6D3A3] px-2 py-0.5 rounded-full font-bold">
                Autor
              </span>
            )}
          </div>

          {editId === c.id ? (
            <>
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border rounded-xl"
              />
              <button
                onClick={() => guardarEdicion(c.id)}
                className="mt-2 bg-[#41644A] text-white px-3 py-1 rounded-lg"
              >
                Guardar
              </button>
            </>
          ) : (
            <p className="text-gray-700">{c.texto}</p>
          )}

          <div className="flex flex-wrap gap-3 text-sm mt-3 text-gray-500">
            <button onClick={() => toggleLike(c.id, c.likes)}>
              👍 {c.likes?.length || 0}
            </button>

            <button onClick={() => setRespondiendoA(c.id)}>
              💬 Responder
            </button>

            {auth.currentUser?.uid === c.uid && (
              <>
                <button onClick={() => { setEditId(c.id); setEditText(c.texto); }}>
                  ✏️
                </button>
                <button
                  onClick={() => eliminarComentario(c.id, c.uid)}
                  className="text-red-500"
                >
                  🗑
                </button>
              </>
            )}

            <span className="text-xs">
              {c.fecha?.toDate?.()?.toLocaleString() || "…"}
            </span>
          </div>

          {renderComentarios(c.id, nivel + 1)}
        </motion.div>
      ));

  return (
    <div className="mt-14">
      <h3 className="text-2xl font-extrabold mb-4">💬 Comentarios</h3>

      {/* ALERTA */}
      {alerta && (
        <div
          className={`mb-3 p-3 rounded-xl text-white font-bold ${
            alerta.tipo === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {alerta.mensaje}
        </div>
      )}

      {!auth.currentUser && (
        <input
          placeholder="Tu nombre"
          value={nombreLocal}
          onChange={(e) => setNombreLocal(e.target.value)}
          className="w-full mb-3 p-3 border rounded-xl"
        />
      )}

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder={
          respondiendoA ? "Respondiendo comentario…" : "Escribe tu comentario..."
        }
        className="w-full p-4 border rounded-2xl shadow-sm"
      />

      <button
        onClick={enviarComentario}
        className="mt-3 bg-[#41644A] hover:bg-[#2f4d3a] text-white px-6 py-2 rounded-2xl font-bold"
      >
        Publicar
      </button>

      <div className="mt-8">{renderComentarios()}</div>

      {lastVisible && (
        <button
          onClick={cargarMas}
          disabled={cargandoMas}
          className="mt-4 px-4 py-2 bg-[#E6D3A3] rounded-xl"
        >
          {cargandoMas ? "Cargando…" : "Cargar más"}
        </button>
      )}
    </div>
  );
}

export default Comentarios;
