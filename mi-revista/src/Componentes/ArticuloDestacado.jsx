import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// 🔥 DATA COMPLETA CON CONTENIDO
const articulosDestacados = [
  {
    id: 1,
    titulo: "Moda Latina 2025",
    imagenes: ["/moda.jpg", "/moda2.jpg", "/moda3.jpg"],
    contenido: `La moda latina en 2025 se centra en la identidad, colores vibrantes y la mezcla de tradición con modernidad. Descubre cómo los diseñadores emergentes reinterpretan los clásicos, combinando elegancia y confort, y cómo tú puedes adaptar estas tendencias a tu estilo diario.`
  },
  {
    id: 2,
    titulo: "Autoestima y Confianza",
    imagenes: ["/amar.jpg", "/amar2.jpg", "/amar3.jpg"],
    contenido: `La autoestima es la clave para sentirnos seguras y auténticas. Aprende a valorarte cada día, celebrar tus logros y enfrentarte a los retos con confianza. Pequeños hábitos de amor propio pueden transformar tu vida y tu relación con los demás.`
  },
  {
    id: 3,
    titulo: "Tendencias de Belleza",
    imagenes: ["/bellza.jpg", "/belleza2.jpg", "/belleza3.jpg"],
    contenido: `Este año, la belleza se centra en lo natural y lo sostenible. Desde maquillaje minimalista hasta rutinas de cuidado de la piel con ingredientes naturales, descubre cómo resaltar tu belleza auténtica sin complicaciones.`
  },
  {
    id: 4,
    titulo: "Estilo de Vida",
    imagenes: ["/vida.jpg", "/vida2.jpg", "/vida3.jpg"],
    contenido: `Un estilo de vida equilibrado combina bienestar físico, mental y social. Aprende consejos para organizar tu día, mantener hábitos saludables y encontrar momentos de paz y creatividad en medio de la rutina.`
  },
  {
    id: 5,
    titulo: "Belleza Natural",
    imagenes: ["/cuidar.jpg", "/cuidar2.jpg", "/cuidar3.jpg"],
    contenido: `La belleza natural es aquella que se refleja desde adentro. Descubre rutinas sencillas de cuidado personal, alimentación saludable y ejercicios que te ayudan a sentirte radiante y plena cada día.`
  },
];

export default function ArticuloDestacado() {
  const { id } = useParams();
  const navigate = useNavigate();

  const articulo = articulosDestacados.find(a => a.id === Number(id));

  // Estado para controlar la imagen actual
  const [imagenIndex, setImagenIndex] = useState(0);

  // Cambiar imagen cada 2 segundos
  useEffect(() => {
    if (!articulo) return;

    const interval = setInterval(() => {
      setImagenIndex(prev => (prev + 1) % articulo.imagenes.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [articulo]);

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

      {/* IMAGEN CON SLIDER AUTOMÁTICO */}
      <img
        src={articulo.imagenes[imagenIndex]}
        className="w-full h-80 object-cover rounded-2xl mb-6 shadow-lg transition-all duration-500"
      />

      <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
        {articulo.contenido}
      </p>
    </motion.div>
  );
}
