import { useState } from "react";

export default function Historias({ historiasReales }) {
  return (
    <section className="mb-20">
      <h2 className="text-5xl text-center font-romance text-morena-garnet mb-10">
        Historias Reales
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {historiasReales.map((h) => (
          <div
            key={h.id}
            className="min-w-[260px] h-[360px] rounded-3xl overflow-hidden relative shadow-xl flex-shrink-0"
          >
            <img
              src={h.imagen}
              alt={h.nombre}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 p-4 text-white">
              <h3 className="text-xl font-romance">{h.nombre}</h3>
              <p className="text-sm opacity-90">{h.texto}</p>
            </div>
          </div>
        ))}

        <div className="min-w-[260px] h-[360px] rounded-3xl border-2 border-dashed border-morena-bronze flex flex-col justify-center items-center text-center px-6 hover:bg-morena-bronze/10 transition cursor-pointer flex-shrink-0">
          <div className="text-5xl mb-4 text-morena-bronze">➜</div>
          <h3 className="text-2xl font-romance text-morena-garnet mb-2">
            Tu historia aquí
          </h3>
          <p className="text-sm text-gray-600">
            Comparte tu experiencia y sé parte de Morena
          </p>
        </div>
      </div>
    </section>
  );
}
