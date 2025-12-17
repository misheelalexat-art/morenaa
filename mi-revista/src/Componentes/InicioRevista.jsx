import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ArticulosMasLeidos from "./ArticulosMasLeidos"
import ArticuloDelDia from "./ArticuloDelDia";
import ArticulosData from "./ArticulosData";


/* ================= DATOS ================= */

const articulosDestacados = [
  { id: 1, titulo: "Moda Latina 2025", imagenes: ["/moda.jpg", "/moda2.jpg", "/moda3.jpg"] },
  { id: 2, titulo: "Autoestima y Confianza", imagenes: ["/amar.jpg", "/amar2.jpg", "/amar3.jpg"] },
  { id: 3, titulo: "Tendencias de Belleza", imagenes: ["/bellza.jpg", "/belleza2.jpg", "/belleza3.jpg"] },
  { id: 4, titulo: "Estilo de Vida Saludable", imagenes: ["/cuidar.jpg", "/cuidar2.jpg", "/cuidar3.jpg"] },
  { id: 5, titulo: "Cultura y Tradición", imagenes: ["/vida.jpg", "/vida2.jpg", "/vida3.jpg"] },
]

const historiasIniciales = [
  { id: 1, nombre: "Ana", texto: "Me siento más segura de mi estilo.", imagen: "/ana.jpg" },
  { id: 2, nombre: "Camila", texto: "Aprendí a amar mi piel morena.", imagen: "/camila.jpg" },
];

const revistas = [
  { id: 1, titulo: "Editorial Noviembre", mes: "noviembre", portada: "/editorial.jpg" },
  { id: 2, titulo: "Editorial Diciembre", mes: "diciembre", portada: "/edito.jpg" },
];

/* ================= CARRUSEL ================= */

function ArticuloCarrusel({ articulo }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(
      () => setIndex((i) => (i + 1) % articulo.imagenes.length),
      2500
    );
    return () => clearInterval(intervalo);
  }, [articulo.imagenes.length]);

  return (
    <div className="relative min-w-[220px] sm:min-w-[260px] md:min-w-[320px] lg:min-w-[360px]
                    h-[280px] sm:h-[340px] md:h-[380px] lg:h-[420px]
                    rounded-3xl overflow-hidden shadow-xl flex-shrink-0">
      <img src={articulo.imagenes[index]} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/45 flex flex-col justify-end p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          {articulo.titulo}
        </h3>
        <Link
          to={`/destacado/${articulo.id}`}
          className="mt-3 bg-morena-bronze px-5 py-2 rounded-full w-fit text-white text-sm sm:text-base"
        >
          Leer más
        </Link>
      </div>
    </div>
  );
}

/* ================= INICIO ================= */

export default function InicioRevista() {
  const [historias, setHistorias] = useState(historiasIniciales);
  const [showModal, setShowModal] = useState(false);
  const [nuevaHistoria, setNuevaHistoria] = useState({ nombre: "", texto: "", imagen: "" });

  const handleEnviar = () => {
    if (!nuevaHistoria.nombre || !nuevaHistoria.texto) return;
    setHistorias([
      ...historias,
      { id: Date.now(), ...nuevaHistoria, imagen: nuevaHistoria.imagen || "/placeholder.jpg" },
    ]);
    setNuevaHistoria({ nombre: "", texto: "", imagen: "" });
    setShowModal(false);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10">

      {/* ================= BIENVENIDA ================= */}
    <motion.section
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="
    relative overflow-hidden rounded-[2.5rem]
    h-[280px] sm:h-[360px] md:h-[450px] lg:h-[550px]
    mb-24 flex items-center justify-center
  "
>
  {/* IMAGEN */}
  <img
    src={`${import.meta.env.BASE_URL}pepe.jpg`}
    alt="Revista Morena"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* OVERLAY ELEGANTE */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

  {/* CONTENIDO */}
  <div className="relative z-10 text-center text-white px-6 max-w-4xl">
    <motion.h1
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.8 }}
      className="
        font-romance drop-shadow-2xl
        text-4xl sm:text-5xl md:text-6xl lg:text-7xl
      "
    >
      Morena
    </motion.h1>

    <p className="
      mt-4 sm:mt-6
      text-sm sm:text-base md:text-lg lg:text-xl
      opacity-95 leading-relaxed
    ">
      Celebramos la belleza real, la cultura latina  
      y el poder de ser tú misma ✨
    </p>

    <Link
      to="/articulos"
      className="
        inline-block mt-8
        bg-morena-bronze text-white
        px-8 sm:px-10 py-3 sm:py-4
        rounded-full font-semibold
        text-sm sm:text-base
        shadow-xl hover:shadow-2xl
        hover:scale-105 transition
      "
    >
      Explorar artículos
    </Link>
  </div>
</motion.section>

    {/* ================= DESTACADOS ================= */}
<section className="mb-20 px-4 sm:px-6 lg:px-16">
  <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-romance text-morena-garnet mb-10">
    Artículos Destacados
  </h2>

  <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
    {articulosDestacados.map((a) => (
      <div key={a.id} className="snap-start flex-shrink-0 w-72 sm:w-80 lg:w-96">
        <ArticuloCarrusel articulo={a} />
      </div>
    ))}
  </div>
</section>


  <ArticulosMasLeidos articulos={ArticulosData} />

 
{/* ================= ARTÍCULO DEL DÍA ================= */}
<ArticuloDelDia articulos={ArticulosData} />


      {/* ================= HISTORIAS ================= */}
      <section className="mb-20">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-romance text-morena-garnet mb-10">
          Historias Reales
        </h2>

        <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 scroll-smooth">
          {historias.map((h) => (
            <div
              key={h.id}
              className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px]
                         h-[300px] sm:h-[360px] md:h-[420px]
                         rounded-3xl overflow-hidden relative shadow-xl flex-shrink-0"
            >
              <img src={h.imagen} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-4 text-white">
                <h3 className="text-lg sm:text-xl font-romance">{h.nombre}</h3>
                <p className="text-sm opacity-90">{h.texto}</p>
              </div>
            </div>
          ))}

          <div
            onClick={() => setShowModal(true)}
            className="min-w-[220px] sm:min-w-[260px] md:min-w-[300px]
                       h-[300px] sm:h-[360px] md:h-[420px]
                       rounded-3xl border-2 border-dashed border-morena-bronze
                       flex flex-col items-center justify-center text-center
                       hover:bg-morena-bronze/10 transition cursor-pointer"
          >
            <span className="text-5xl mb-3 text-morena-bronze">+</span>
            <h3 className="text-xl font-romance text-morena-garnet">Tu historia aquí</h3>
            <p className="text-sm text-gray-600 mt-1">Sé parte de Morena</p>
          </div>
        </div>
      </section>
    </div>
  );
}
