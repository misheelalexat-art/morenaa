import { Instagram, Facebook, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#3A4D39] text-[#F8C662] pt-10 pb-6 mt-16">
      
      {/* CONTENIDO */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">

        {/* Columna 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Mi Revista Morena</h3>
          <p className="text-sm text-[#f8c662cc] leading-relaxed">
            Inspiración, cultura latina, moda morena y amor propio.
            Tu espacio para brillar ✨.
          </p>
        </div>

        {/* Columna 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Enlaces</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/articulos" className="hover:underline">Artículos</a></li>
            <li><a href="/favoritos" className="hover:underline">Favoritos</a></li>
            <li><a href="/contacto" className="hover:underline">Contacto</a></li>
            <li><a href="/sobre" className="hover:underline">Sobre Nosotros</a></li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Síguenos</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:opacity-80 transition">
              <Instagram size={28} />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <Facebook size={28} />
            </a>
            <a href="#" className="hover:opacity-80 transition">
              <Youtube size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <p className="text-center text-sm text-[#f8c662aa] mt-10">
        © {new Date().getFullYear()} Mi Revista Morena • Diseñada por Alexa ✨
      </p>
    </footer>
  );
}

export default Footer;
