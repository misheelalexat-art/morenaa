import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 🔥 MISMA DATA (o puedes importarla)
const articulosDestacados = [
  { id: 1, titulo: "Moda Latina 2025", imagenes: ["moda.jpg", "moda2.jpg", "moda3.jpg"] },
  { id: 2, titulo: "Autoestima y Confianza", imagenes: ["/amar.jpg", "/amar2.jpg", "/amar3.jpg"] },
  { id: 3, titulo: "Tendencias de Belleza", imagenes: ["/bellza.jpg", "/belleza2.jpg", "/belleza3.jpg"] },
  { id: 4, titulo: "Estilo de Vida", imagenes: ["/vida.jpg", "/vida2.jpg", "/vida3.jpg"] },
  { id: 5, titulo: "Belleza Natural", imagenes: ["/cuidar.jpg", "/cuidar2.jpg", "/cuidar3.jpg"] },
];

export default function ArticuloDestacado() {
  const { id } = useParams();
  const navigate = useNavigate();

  const articulo = articulosDestacados.find(a => a.id === Number(id));

  if (!articulo) {
    return <p className="text-center p-10">Artículo no encontrado</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      {/* 🔙 VOLVER */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-morena-garnet font-semibold hover:underline"
      >
        ← Volver
      </button>

      <h1 className="text-4xl font-romance text-morena-garnet mb-6">
        {articulo.titulo}
      </h1>

      <img
        src={articulo.imagenes[0]}
        className="w-full h-80 object-cover rounded-2xl mb-6 shadow-lg"
      />

      <p className="text-gray-700 text-lg leading-relaxed">
        Aquí va el contenido del artículo destacado.  
        Puedes escribir texto largo, historia, mensaje de autoestima,
        moda o cultura según el enfoque de <b>Morena</b>.
      </p>
    </motion.div>
  );
}
