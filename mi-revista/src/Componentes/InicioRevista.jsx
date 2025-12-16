import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticulosMasLeidos from "./ArticulosMasLeidos";

// Datos de ejemplo
const articulosDestacados = [
  { id: 1, titulo: "Moda Latina 2025", imagenes: ["moda.jpg", "moda2.jpg", "moda3.jpg"] },
  { id: 2, titulo: "Autoestima y Confianza", imagenes: ["/amar.jpg", "/amar2.jpg", "/amar3.jpg"] },
  { id: 3, titulo: "Tendencias de Belleza", imagenes: ["/bellza.jpg", "/belleza2.jpg", "/belleza3.jpg"] },
  { id: 4, titulo: "Estilo de Vida", imagenes: ["/vida.jpg", "/vida2.jpg", "/vida3.jpg"] },
  { id: 5, titulo: "Belleza Natural", imagenes: ["/cuidar.jpg", "/cuidar2.jpg", "/cuidar3.jpg"] },
];

const historiasIniciales = [
  { id: 1, nombre: "Ana", texto: "Me siento más segura de mi estilo.", imagen: "/ana.jpg" },
  { id: 2, nombre: "Camila", texto: "Aprendí a amar mi piel morena.", imagen: "/camila.jpg" },
  { id: 3, nombre: "Sofía", texto: "La moda es para todas.", imagen: "/sofia.jpg" },
];

const revistas = [
  { id: 1, titulo: "Editorial Noviembre", mes: "noviembre", portada: "/editorial.jpg" },
  { id: 2, titulo: "Editorial Diciembre", mes: "diciembre", portada: "/edito.jpg" },
];

// Componente de carrusel de artículo
function ArticuloCarrusel({ articulo }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % articulo.imagenes.length);
    }, 2500);
    return () => clearInterval(intervalo);
  }, [articulo.imagenes.length]);

  return (
    <div className="relative min-w-[300px] h-[400px] rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
      <img src={articulo.imagenes[index]} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white">{articulo.titulo}</h3>
        <Link to={`/destacado/${articulo.id}`} className="mt-4 bg-morena-bronze text-white px-6 py-2 rounded-full">
          Leer más
        </Link>
      </div>
    </div>
  );
}

// Componente principal
export default function InicioRevista() {
  const [historias, setHistorias] = useState(historiasIniciales);
  const [showModal, setShowModal] = useState(false);
  const [nuevaHistoria, setNuevaHistoria] = useState({ nombre: "", texto: "", imagen: "" });

  const handleAddHistoria = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleEnviar = () => {
    if (!nuevaHistoria.nombre || !nuevaHistoria.texto) return;

    setHistorias([
      ...historias,
      {
        id: Date.now(),
        nombre: nuevaHistoria.nombre,
        texto: nuevaHistoria.texto,
        imagen: nuevaHistoria.imagen || "/placeholder.jpg",
      },
    ]);

    setNuevaHistoria({ nombre: "", texto: "", imagen: "" });
    setShowModal(false);
  };

  return (
    <div className="p-6">

      {/* ARTÍCULOS DESTACADOS */}
      <section className="mb-20">
        <h2 className="text-5xl text-center font-romance text-morena-garnet mb-10">Artículos Destacados</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
          {articulosDestacados.map((a) => (
            <ArticuloCarrusel key={a.id} articulo={a} />
          ))}
        </div>
      </section>

      <ArticulosMasLeidos articulos={articulosDestacados} />

      {/* HISTORIAS REALES */}
      <section className="mb-20">
        <h2 className="text-5xl text-center font-romance text-morena-garnet mb-10">Historias Reales</h2>
        <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">
          {historias.map((h) => (
            <div key={h.id} className="min-w-[260px] h-[360px] rounded-3xl overflow-hidden relative shadow-xl flex-shrink-0">
              <img src={h.imagen} alt={h.nombre} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-xl font-romance">{h.nombre}</h3>
                <p className="text-sm opacity-90">{h.texto}</p>
              </div>
            </div>
          ))}

          {/* TARJETA “TU HISTORIA AQUÍ” */}
          <div
            onClick={handleAddHistoria}
            className="min-w-[260px] h-[360px] rounded-3xl border-2 border-dashed border-morena-bronze flex flex-col justify-center items-center text-center px-6 hover:bg-morena-bronze/10 transition cursor-pointer flex-shrink-0"
          >
            <div className="text-5xl mb-4 text-morena-bronze">➜</div>
            <h3 className="text-2xl font-romance text-morena-garnet mb-2">Tu historia aquí</h3>
            <p className="text-sm text-gray-600">Comparte tu experiencia y sé parte de Morena</p>
          </div>
        </div>
      </section>

      {/* MODAL PARA AGREGAR HISTORIA */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-4">Escribe tu historia</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevaHistoria.nombre}
              onChange={(e) => setNuevaHistoria({ ...nuevaHistoria, nombre: e.target.value })}
              className="w-full border rounded-lg p-2 mb-2"
            />
            <textarea
              placeholder="Tu experiencia..."
              value={nuevaHistoria.texto}
              onChange={(e) => setNuevaHistoria({ ...nuevaHistoria, texto: e.target.value })}
              className="w-full border rounded-lg p-2 mb-2"
              rows={4}
            />
            <input
              type="text"
              placeholder="URL de la imagen (opcional)"
              value={nuevaHistoria.imagen}
              onChange={(e) => setNuevaHistoria({ ...nuevaHistoria, imagen: e.target.value })}
              className="w-full border rounded-lg p-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleCloseModal} className="px-4 py-2 rounded-lg border">Cancelar</button>
              <button onClick={handleEnviar} className="px-4 py-2 rounded-lg bg-morena-garnet text-white">Enviar</button>
            </div>
          </div>
        </div>
      )}

      {/* AVANCES DE LA REVISTA */}
      <section className="mb-20">
        <h2 className="text-5xl text-center font-romance text-morena-garnet mb-10">Avances de la Revista</h2>
        <div className="flex gap-8 overflow-x-auto pb-4 scroll-smooth">
          {revistas.map((rev) => (
            <div key={rev.id} className="relative min-w-[280px] h-[420px] rounded-3xl overflow-hidden shadow-xl flex-shrink-0">
              <img src={rev.portada} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                <h3 className="text-3xl font-romance mb-4">{rev.titulo}</h3>
                <Link to={`/editorial/${rev.mes}`} className="bg-morena-bronze px-6 py-2 rounded-full w-fit">
                  Ver editorial
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
