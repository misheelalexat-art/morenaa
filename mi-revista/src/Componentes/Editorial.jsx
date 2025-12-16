import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Editorial() {
  const { mes } = useParams();

  const contenido = {
    noviembre: {
      titulo: "Editorial Noviembre",
      texto:
        "Noviembre nos invita a abrazar nuestra identidad, nuestra piel y nuestra historia.",
      imagen:"/editorial.jpg",
    },
    diciembre: {
      titulo: "Editorial Diciembre",
      texto:
        "Diciembre es cierre y renacer. Celebramos lo que somos.",
      imagen: "/edito.jpg",
    },
  };

  const data = contenido[mes];

  if (!data) {
    return <p className="text-center mt-20">Editorial no encontrada</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <motion.img
        src={data.imagen}
        className="w-full h-[420px] object-cover rounded-3xl mb-10"
      />

      <h1 className="text-5xl font-romance text-morena-garnet mb-6">
        {data.titulo}
      </h1>

      <p className="text-lg text-gray-700 mb-10">
        {data.texto}
      </p>

      <Link
        to="/"
        className="bg-morena-bronze text-white px-8 py-3 rounded-full"
      >
        ← Volver a la revista
      </Link>
    </div>
  );
}
