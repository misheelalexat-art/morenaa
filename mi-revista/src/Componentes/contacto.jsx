import { Mail, Phone, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

function Contacto() {
  return (
    <section className="py-20 px-6 md:px-20 rounded-3xl bg-gradient-to-br from-[#41644A] via-[#355C3A] to-[#2E4A34] shadow-xl text-white">
      
      {/* TÍTULO */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-serifElegant text-[#F8C662] inline-block">
          Contáctanos
          <span className="block w-full h-[3px] bg-[#D1861C] mt-3 rounded-full"></span>
        </h1>

        <p className="mt-4 text-[#FFF3E0] font-sansYouth text-lg">
          Estamos aquí para ayudarte y escucharte. ¡Hablemos! ✨
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-14">
        
        {/* FORMULARIO */}
        <form className="flex-1 bg-[#FFFFFF10] backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-[#FFFFFF22]">
          
          <div className="mb-6">
            <label className="block mb-2 font-sansYouth text-[#F8C662]">Nombre</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-xl bg-[#FFFFFF15] text-white border border-[#FFFFFF30] focus:outline-none focus:ring-2 focus:ring-[#F8C662] placeholder-[#ffffff88]"
              placeholder="Tu nombre"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-sansYouth text-[#F8C662]">Correo</label>
            <input 
              type="email" 
              className="w-full p-3 rounded-xl bg-[#FFFFFF15] text-white border border-[#FFFFFF30] focus:outline-none focus:ring-2 focus:ring-[#F8C662] placeholder-[#ffffff88]"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-sansYouth text-[#F8C662]">Mensaje</label>
            <textarea 
              rows="5"
              className="w-full p-3 rounded-xl bg-[#FFFFFF15] text-white border border-[#FFFFFF30] focus:outline-none focus:ring-2 focus:ring-[#F8C662] placeholder-[#ffffff88]"
              placeholder="Escribe tu mensaje aquí..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-[#F8C662] text-[#2E2E2E] py-3 rounded-2xl font-semibold text-lg transition-all hover:bg-[#D1861C] hover:scale-[1.03] shadow-lg"
          >
            Enviar Mensaje
          </button>
        </form>

        {/* INFO DE CONTACTO */}
        <div className="flex-1 text-left flex flex-col justify-center gap-6">
          
          <div className="flex items-center gap-4">
            <Mail className="text-[#F8C662]" size={30}/>
            <p className="font-sansYouth text-[#FFF3E0]">morena.contacto@gmail.com</p>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-[#F8C662]" size={30}/>
            <p className="font-sansYouth text-[#FFF3E0]">+51 999 999 999</p>
          </div>

          {/* WHATSAPP */}
          <div className="flex items-center gap-4">
            <MessageCircle className="text-[#25D366]" size={32}/>
            <a 
              href="https://wa.me/51999999999" 
              target="_blank"
              className="font-sansYouth text-[#FFF3E0] hover:text-[#F8C662] transition"
            >
              Escríbenos por WhatsApp
            </a>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-[#F8C662]" size={30}/>
            <p className="font-sansYouth text-[#FFF3E0]">Perú • Lima</p>
          </div>

          {/* REDES */}
          <div className="mt-6">
            <h3 className="text-[#F8C662] text-xl font-serifElegant mb-3">Síguenos</h3>

            <div className="flex gap-6">
              <a href="#" className="hover:scale-110 transition">
                <Instagram size={36} className="text-[#FFF3E0] hover:text-[#F8C662]" />
              </a>

              <a href="#" className="hover:scale-110 transition">
                <Facebook size={36} className="text-[#FFF3E0] hover:text-[#F8C662]" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contacto;

