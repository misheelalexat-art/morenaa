function Somos() {
  return (
    <section className="py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-16 
                        rounded-3xl bg-white">
      
      {/* --- Texto --- */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-serifElegant mb-8 text-[#355C3A] relative inline-block">
          Acerca de Nosotros
          <span className="block w-full h-[3px] bg-[#D1861C] mt-2 rounded-full"></span>
        </h1>

        <p className="mb-5 font-sansYouth text-gray-700 leading-relaxed">
          <strong className="text-[#41644A] font-semibold">Morena</strong> es un espacio donde la moda,
          la belleza y la cultura se entrelazan para celebrar la autenticidad,
          creatividad e inspiración de cada persona.
        </p>

        <p className="mb-5 font-sansYouth text-gray-700 leading-relaxed">
          Cada artículo, consejo y detalle está pensado para acompañarte,
          motivarte y ayudarte a descubrir tu mejor versión día tras día.
        </p>

        <p className="italic font-sansYouth text-xl mt-6 text-[#D1861C]">
          “La inspiración está en todas partes, solo hay que saber mirarla.”
        </p>
      </div>

      {/* --- Imagen --- */}
      <div className="flex-1 flex justify-center md:justify-end">
        <img
          src="https://i.pinimg.com/736x/71/92/78/719278993931174929c9fe122e61aa40.jpg"
          alt="Revista estilo icónico"
          className="rounded-full max-w-[340px] md:max-w-[420px] h-auto 
                     object-cover ring-4 ring-[#F8C662] hover:ring-[#D1861C]
                     transition-all duration-500 hover:scale-105"
        />
      </div>
    </section>
  );
}

export default Somos;
