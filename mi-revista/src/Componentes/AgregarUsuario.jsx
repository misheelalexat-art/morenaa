import { useState } from "react";
import { User } from "lucide-react";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function AgregarUsuario() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [usuarioCreado, setUsuarioCreado] = useState(null);

  const agregarUsuario = async () => {
    if (!nombre || !edad) return alert("Completa todos los campos");

    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nombre,
        edad: Number(edad),
        fechaRegistro: new Date(),
      });

      const nuevoUsuario = {
        id: docRef.id,
        nombre,
        edad,
      };

      setUsuarioCreado(nuevoUsuario);
      setNombre("");
      setEdad("");
    } catch (error) {
      console.log("Error al agregar usuario:", error);
      alert("Hubo un error al registrar el usuario");
    }
  };

  return (
    <div className="bg-morenaHunter p-6 rounded-2xl shadow-lg max-w-sm mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-morenaSaffron text-center mb-4">
        Agregar Usuario
      </h2>

      <label className="block text-morenaGold font-medium mb-1">Nombre:</label>
      <input
        type="text"
        placeholder="Escribe tu nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 mb-4 border border-morenaGold rounded-md focus:outline-none focus:ring-2 focus:ring-morenaSaffron bg-white"
      />

      <label className="block text-morenaGold font-medium mb-1">Edad:</label>
      <input
        type="number"
        placeholder="Escribe tu edad"
        value={edad}
        onChange={(e) => setEdad(e.target.value)}
        className="w-full p-2 mb-6 border border-morenaGold rounded-md focus:outline-none focus:ring-2 focus:ring-morenaSaffron bg-white"
      />

      <button
        onClick={agregarUsuario}
        className="w-full bg-morenaBrown hover:bg-morenaOchre text-white font-semibold py-2 rounded-md transition-colors"
      >
        Agregar Usuario
      </button>

      {usuarioCreado && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8 bg-white p-4 rounded-xl shadow-md border-2 border-morenaGold text-center flex flex-col items-center gap-2"
        >
          <div className="bg-morenaSaffron w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl">
            <User size={32} />
          </div>
          <p className="text-morenaSaffron font-bold text-lg">{usuarioCreado.nombre}</p>
          <p className="text-morenaGold">Edad: {usuarioCreado.edad}</p>
        </motion.div>
      )}
    </div>
  );
}

export default AgregarUsuario;
